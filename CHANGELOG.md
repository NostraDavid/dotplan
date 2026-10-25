# Changelog

## [Unreleased]

## [1.0.1] - 2026-10-25

### Changed

- Convert development scripts and grammar tests to strict TypeScript, checked by the normal local and CI commands.
- Run these files with the existing Node 24 runtime, keeping the packaged grammar declarative and unchanged.

## [1.0.0] - 2026-10-25

- Use extension ID `nostradavid.nostradavid-dotplan` and package name `nostradavid-dotplan`.
- Register the `dotplan` language for `.plan` files.
- Add whole-line syntax highlighting for all thirteen supplied `.plan` markers, including urgent tasks and weekend headings.
- Accept indented markers, distinguish `++` from `+` and `===` from `==`, and leave inline symbols and unknown prefixes plain.
- Use `#` for VS Code's line-comment command.
- Document the complete legend, theme customization, and a beginner example.
- Add reproducible development tools, beginner documentation, CI, and VSIX packaging.
