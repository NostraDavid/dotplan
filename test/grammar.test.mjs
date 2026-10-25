import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import oniguruma from 'vscode-oniguruma';
import textmate from 'vscode-textmate';

const require = createRequire(import.meta.url);
const wasm = fs.readFileSync(require.resolve('vscode-oniguruma/release/onig.wasm'));
await oniguruma.loadWASM(wasm.buffer.slice(wasm.byteOffset, wasm.byteOffset + wasm.byteLength));
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

test('the starter grammar loads in the VS Code TextMate engine', async () => {
  const grammar = await registry.loadGrammar('source.dotplan');
  const tokens = grammar.tokenizeLine('A plain plan line.').tokens;
  assert.equal(tokens.length, 1);
  assert.deepEqual(tokens[0].scopes, ['source.dotplan']);
});
