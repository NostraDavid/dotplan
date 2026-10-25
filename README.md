# dotplan by NostraDavid

A language extension foundation for .plan files. The grammar is deliberately empty until the syntax specification is supplied.

Published under the NostraDavid publisher. Version 1.0.0 establishes the extension identity and `.plan` file association.

## Install

Download `dotplan-1.0.0.vsix` from [GitHub Releases](https://github.com/NostraDavid/dotplan/releases). In VS Code, open Extensions, choose **Install from VSIX**, and select that file.

Files named `.plan` and files ending in `.plan` use the `dotplan` language. Add the future syntax rules in `syntaxes/dotplan.tmLanguage.json`. No plan markers, colors, or structure are assumed yet.

See [the beginner guide](docs/getting-started.md), [contribution guide](CONTRIBUTING.md), [changelog](CHANGELOG.md), and [release guide](docs/releasing.md).

## Development

Install Nix, enter `nix develop`, then run `just setup` and `just check`. Run `just package` to build a VSIX. The flake supports x86_64/aarch64 Linux and macOS, including Intel macOS through the pinned Nixpkgs revision.

Dependency upgrades are explicit: `just lock-upgrade` and `just update-nix`. Normal setup uses the committed locks.
