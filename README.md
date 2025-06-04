# reqtext

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/license/mit/)

[![npm](https://img.shields.io/npm/v/reqtext?color=blue)](https://www.npmjs.com/package/reqtext)


**ReqText** is a requirements management tool designed to help you easily create, manage and visualize your requirements. The tool is built on my FlatHier (Short for Flat Hierarchy) library, which creates and manipulates hierarchical data structure in a flat, ordered json. Making it human readable and git ready.

## CLI
The ReqText CLI offers straight forward commands to manage the project file. These commands as described in this README is easy to pass to an AI coding tool to add or modify items in the `.reqt.json` directly through the CLI.

## Terminal Editor
The terminal editor provides an interactive tree view to create, navigate, and structure your `.reqt` items. It's the primary interface for building your requirement hierarchy quickly and visually.

### Sample Tree View from `reqt editor`

```bash
    0: ReqText_Demo - IN DEV
    ├── 0.1: Design Level Reqts - DESIGN
    ├── 0.2: AI Instruction Level - INSTRUCT
    ├── 1: Feature 1 - IN DEV
    │   └── 1.1: Requirement 1 - IN DEV
    │       └── 1.2.1: Design Detail - DESIGN
    └── 2: Feature 2 - PLANNED
```
> Note: The selected item is highlighted and can be navigated using the arrow keys. You can add, delete, and edit items directly from this view.

## Contributing
Please see the [Contributing Guide](CONTRIBUTING.md) for details on how to contribute to ReqText.

> **Note from Fred**: I'm building ReqText based on how I work, but I want to know how you work too! If you have ideas for features or improvements, please try out the tool and open an issue on GitHub. I want to make ReqText the best tool it can be for managing requirements.

## ReqText Installation

Available over npm:
```bash
npm install reqtext
```
Usage:
```bash
npx reqt --help
```

or for global installation:
```bash
npm install -g reqtext
```
Usage:
```bash
reqt --help
```

> ✅ Both `reqtext` and `reqt` are valid commands. For convenience, `reqt` is the preferred shorthand.

## CLI Reference

### `init <project name>`

Project name can be entered in "" or with spaces, the init command will replace spaces with underscores.

The init command will create a `.reqt` directory in your root that will hold the following files:
    - `config.reqt.json` - The config file for the project
    - `itemTemplate.reqt.json` - The template for new items. This can be edited at any time, but will not back populate existing items unless exported to markdown and imported back.
    - <project name>.reqt.json - The source of truth for the project.

## General Commands

| Command                | Description                          |
|------------------------|--------------------------------------|
| `version`, `--version`, `-v` | Show version number                |
| `help`, `--help`, `-h`       | Show help text                     |
| `init <project name>`        | Initialize a new ReqText project   |
| `editor`                     | Launch the interactive terminal editor |
| `clean`, `-c`                | Ensure all items have a valid reqt_id. |

> Note: The main purpose of `clean` is if an AI coding tool adds an item directly in the .reqt.json, or .reqt.md and does not create a `reqt_id` for it, this command will ensure all items have a valid `reqt_id` and will update the `.reqt.json` file accordingly.

## Item Management Commands

| Command                        | Description                               | Usage Example |
|--------------------------------|-------------------------------------------|----------------|
| `add-item`, `-a`              | Add an item to the end of the project     | `reqt add-item "New Item"` |
| `add-after`, `-aa`            | Add an item after a specific outline ID   | `reqt add-after 1.2 "New Subitem"` |
| `delete`, `-d`                | Delete an item by outline number          | `reqt delete 1.3` |
| `make-children`, `-mc`        | Demote an item (and its children)         | `reqt make-children 1.2` |
| `make-sibling`, `-ms`         | Promote an item (and its children)        | `reqt make-sibling 1.2` |
| `edit-title`, `-et`           | Edit the title of an item by outline ID   | `reqt edit-title 1.2 "Updated Title"` |
| `set-status`, `-ss`           | Set the status of an item                 | `reqt set-status 1.2 NEW` |
| `test-passed`, `-tp`          | Mark test as passed for an item           | `reqt test-passed 1.2 true` |

## Markdown Editing Workflow

ReqText supports a markdown-based editing workflow that lets you "check out" requirements from `.reqt.json` for easy editing of long-form fields (requirement, acceptance, details) in markdown. This user-friendly format allows you to preview the future README, including rendering mermaid diagrams stored in `.reqt.json`.

You can export requirements to a markdown file, edit them in your preferred editor, and then import changes back into the `.reqt.json` source of truth. This workflow streamlines bulk editing and review of requirement text.

| Command                | Description                                                      |
|------------------------|------------------------------------------------------------------|
| `out-md`, `-omd`       | Export requirements to markdown for editing.                     |
| `in-md`, `-imd`        | Import changes from markdown back into `.reqt.json`. Use `--keep` or `-k` to retain the markdown file. |
| `diff`                 | Show differences between `.reqt.json` and the markdown file.     |

This approach ensures requirements remain synchronized and easily editable in both structured and human-friendly formats.

**Example:**

 1. **A ReqText item stored in the .reqt.json:**
```json  
{
    "reqt_ID": "2025-05-20T00:28:48.594Z-b59141b8",
    "hier": 0,
    "outline": "3",
    "title": "ReqText Tree Editor",
    "description": "The ReqText tree editor provides an interactive terminal interface to create, navigate, and structure your requirements in a tree format. It allows users to quickly build and visualize their requirement hierarchy.",
    "acceptance": "- The editor allows users to create new requirement nodes in a tree structure.\n- The editor supports navigation between nodes (e.g., moving up, down, to parent, or to child nodes).\n- The editor allows users to restructure the tree (e.g., move nodes, add children/siblings).\n- The editor displays the requirement hierarchy in a clear, tree-like format in the terminal.\n- The editor updates the visualization in real-time as the tree is modified.",
    "status": "DONE",
    "test_passed": "true",
    "readme": "## Terminal Editor\n\nThe terminal editor provides an interactive tree view to create, navigate, and structure your `.reqt` items.\n\n### Sample Output from `reqt editor`\n\n```bash\n    0: ReqText_Demo - In Dev\n    ├── 0.1: Design Level Reqts - DESIGN\n    ├── 0.2: Instructs Level - INSTRUCT\n    ├── 1: Feature 1 - In Dev\n    │   ├── 1.1: Requirement 1 - In Dev\n    │   └── 1.2: Requirement 2 - ACCEPT\n    │       └── 1.2.1: Design Detail - DESIGN\n    └── 2: Feature 2 - NEW"
}
```
> Note: This example is just a slimmed down version from what actually generated the terminal editor section!

## README Generation

| Command | Description |
| --- | --- |
| `generate-readme`, `-grm`     | Generate README.md from the .reqt.json source of truth |

The generation is driven by the `README` field in the .reqt.json. The text exclude will strip the context from the respective file generation.

## ReqText Terminal Tree Editor

| Key            | Action                          |
| -------------- | ------------------------------- |
| `↑` / `↓`      | Navigate requirements           |
| `k` / `j`      | Move item up/down               |
| `→` / `←`      | Demote/Promote (indent/outdent) |
| `a`            | Add new item after current      |
| `d`            | Delete selected item            |
| `e`            | Edit item title                 |
| `r`            | Reload data                     |
| `q` / `Ctrl+C` | Quit and clear console          |

---
README.md generated by **ReqText v0.1.0-beta.20** on 2025-06-04T02:34:09.242Z

[ReqText GitHub Issues for Support](https://github.com/fred-terzi/reqtext/issues)
