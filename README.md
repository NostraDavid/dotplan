# dotplan by NostraDavid

Syntax highlighting for `.plan` files, using NostraDavid's line markers for tasks, notes, questions, ideas, commands, debt, cleanup, and days.

## Install

Download the latest `nostradavid-dotplan-X.Y.Z.vsix` from [GitHub Releases](https://github.com/NostraDavid/dotplan/releases/latest). In VS Code, open Extensions, choose **Install from VSIX**, and select that file.

The extension ID is `nostradavid.nostradavid-dotplan`. Files named `.plan` and files ending in `.plan` use the `dotplan` language.

If you installed the earlier `nostradavid.dotplan` extension, remove it after installing this package to avoid duplicate language providers.

## Syntax

A marker starts a line, optionally after spaces or tabs. Follow the marker with a space, a tab, or the end of the line. Its style covers the whole line. Inline symbols remain ordinary text. Day headings accept any text, with no required date format.

| Marker | Meaning                                                                 | TextMate scope                          |
| ------ | ----------------------------------------------------------------------- | --------------------------------------- |
| `+`    | TODO                                                                    | `keyword.control.todo.dotplan`          |
| `++`   | TODO that really needs to get done                                      | `markup.bold.urgent.dotplan`            |
| `-`    | Done                                                                    | `comment.line.done.dotplan`             |
| `%`    | Happenings                                                              | `string.unquoted.event.dotplan`         |
| `#`    | Daily note, comment, or remark                                          | `comment.line.remark.dotplan`           |
| `?`    | Question                                                                | `entity.name.function.question.dotplan` |
| `!`    | Answered question                                                       | `constant.language.answer.dotplan`      |
| `@`    | Idea                                                                    | `entity.name.type.idea.dotplan`         |
| `&`    | Command                                                                 | `support.function.command.dotplan`      |
| `$`    | Architecture and technical or documentation debt, used since 2023-05-03 | `keyword.other.architecture.dotplan`    |
| `^`    | Household cleanup                                                       | `constant.numeric.household.dotplan`    |
| `==`   | Regular day                                                             | `markup.heading.day.dotplan`            |
| `===`  | Weekend day                                                             | `markup.heading.weekend.dotplan`        |

`++` and `===` each have their own scope. Unknown prefixes such as `+++` and `====` stay plain. VS Code's **Toggle Line Comment** command uses `#`.

Your theme sets the colors. To change one kind of line, add its scope to `editor.tokenColorCustomizations.textMateRules` in your VS Code settings. For example:

```json
{
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": "markup.bold.urgent.dotplan",
        "settings": {
          "foreground": "#ff8800",
          "fontStyle": "bold"
        }
      }
    ]
  }
}
```

See [the beginner guide](docs/getting-started.md), [contribution guide](CONTRIBUTING.md), [changelog](CHANGELOG.md), and [release guide](docs/releasing.md).

## Development

Install Nix, enter `nix develop`, then run `just setup` and `just check`. Run `just package` to build a VSIX. The flake supports x86_64/aarch64 Linux and macOS, including Intel macOS through the pinned Nixpkgs revision.

Dependency upgrades are explicit: `just lock-upgrade` and `just update-nix`. Normal setup uses the committed locks.
