# Getting started

## Use the extension

1. Download the VSIX from [the releases page](https://github.com/NostraDavid/dotplan/releases/latest).
2. Open VS Code and select the Extensions view.
3. Open the three-dot menu, select **Install from VSIX**, and select the downloaded file.
4. Create a file named `.plan`. The status bar shows dotplan. If the file was already open, run **Developer: Reload Window** after saving your work.
5. Paste these lines into the file:

```text
=== Sunday
+ Try dotplan
++ Finish an overdue task
- Install the extension
? What should I do next?
! Start with the urgent task
# Daily remark
```

The markers style their whole lines. Your theme chooses the colors. `++` uses the bold scope, and `-` uses the comment scope for completed tasks. Check [the complete legend](../README.md#syntax) for all thirteen markers and custom color settings.

To try comments, put the cursor on an ordinary text line and run **Toggle Line Comment**. VS Code adds `#`; repeat the command to remove the comment marker.

## Make your first change

Install Nix, clone the repository, run `nix develop`, and run `just setup`. Use `just` to list commands. Edit a small file, run `just format` and `just check`, then use F5 to try the extension. `just package` creates a local VSIX; it does not upload it.
