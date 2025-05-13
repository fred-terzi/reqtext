# reqtext
Reqtext is a Git-native, CLI first requirements and documentation framework meant to bring requirement management directly into your workflow.

## Terminal Editor Keybindings

- `↑`/`↓`: Navigate requirements
- `a`: Add a new item after the selected requirement (prompts for title)
- `r`: Reload data
- `q` or `Ctrl+C`: Quit and clear the console

The editor uses only process.stdout.write for output and always updates the requirements tree in-place.
