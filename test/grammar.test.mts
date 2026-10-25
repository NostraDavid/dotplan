import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import oniguruma from 'vscode-oniguruma';
import textmate from 'vscode-textmate';

const require = createRequire(import.meta.url);
const wasm = fs.readFileSync(require.resolve('vscode-oniguruma/release/onig.wasm'));
await oniguruma.loadWASM(wasm);
const registry = new textmate.Registry({
  onigLib: Promise.resolve({
    createOnigScanner: (patterns) => new oniguruma.OnigScanner(patterns),
    createOnigString: (text) => new oniguruma.OnigString(text),
  }),
  loadGrammar: async (scope) =>
    scope === 'source.dotplan'
      ? JSON.parse(fs.readFileSync(new URL('../syntaxes/dotplan.tmLanguage.json', import.meta.url), 'utf8'))
      : null,
});

const loadedGrammar = await registry.loadGrammar('source.dotplan');
assert.ok(loadedGrammar, 'The registered grammar must load.');
const grammar = loadedGrammar;

test('unmarked text stays plain in the VS Code TextMate engine', () => {
  const tokens = grammar.tokenizeLine('A plain plan line.', null).tokens;
  assert.equal(tokens.length, 1);
  assert.deepEqual(tokens[0].scopes, ['source.dotplan']);
});

const legend = [
  ['+', 'TODO', 'keyword.control.todo.dotplan'],
  ['++', 'TODO, except it should really be getting done...', 'markup.bold.urgent.dotplan'],
  ['-', 'Done', 'comment.line.done.dotplan'],
  ['%', 'some kind of happenings', 'string.unquoted.event.dotplan'],
  ['#', 'for daily / comment / remark', 'comment.line.remark.dotplan'],
  ['?', 'question', 'entity.name.function.question.dotplan'],
  ['!', 'answered question', 'constant.language.answer.dotplan'],
  ['@', 'for ideas', 'entity.name.type.idea.dotplan'],
  ['&', 'cmds', 'support.function.command.dotplan'],
  [
    '$',
    'architecture stuff (since 2023-05-03) and technical/documentational debt',
    'keyword.other.architecture.dotplan',
  ],
  ['^', 'household cleanup tasks (room, kitchen, floor, etc)', 'constant.numeric.household.dotplan'],
  ['==', 'regular day', 'markup.heading.day.dotplan'],
  ['===', 'weekend day', 'markup.heading.weekend.dotplan'],
];

for (const [marker, description, scope] of legend) {
  test(`${marker} highlights its whole line as ${description}`, () => {
    for (const line of [`${marker} ${description}`, `  \t${marker}\t${description}`, marker]) {
      const { tokens } = grammar.tokenizeLine(line, null);
      assert.ok(tokens.every((token) => token.scopes.includes(scope)), JSON.stringify({ line, tokens }));
    }
  });
}

test('inline symbols and unseparated or unknown prefixes stay plain', () => {
  for (
    const line of [
      'Legenda:',
      'Remember + TODO and ++ urgent',
      'A question? An answer! # remark',
      'C++ and a $VARIABLE',
      '+literal',
      '++urgent',
      '-42',
      '===2026-10-25',
      '+++ extra plus',
      '==== extra equals',
      '= not a heading',
      '\\+ escaped marker',
      '  plain indented text',
    ]
  ) {
    const { tokens } = grammar.tokenizeLine(line, null);
    assert.deepEqual(tokens.map((token) => token.scopes), [['source.dotplan']], line);
  }
});

test('highlighting ends at the line boundary', () => {
  let state = textmate.INITIAL;
  for (const [marker, description, scope] of legend) {
    const marked = grammar.tokenizeLine(`${marker} ${description}`, state);
    assert.ok(marked.tokens.every((token) => token.scopes.includes(scope)));
    const plain = grammar.tokenizeLine('This line has no marker.', marked.ruleStack);
    assert.deepEqual(plain.tokens.map((token) => token.scopes), [['source.dotplan']]);
    state = plain.ruleStack;
  }
});
