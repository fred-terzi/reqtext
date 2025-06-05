# reqtext

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/license/mit/)
[![npm](https://img.shields.io/npm/v/reqtext?color=blue)](https://www.npmjs.com/package/reqtext)

Plan your project in Markdown — and let ReqText handle the structure.ReqText turns a simple Markdown file into a live, editable project outline.Numbering, hierarchy, and status are updated automatically — right in your editor or terminal.

> Your Markdown file is the single source of truth.
> ReqText’s CLI and terminal editor keep it clean, versioned, and always up to date.

**Quick Start:**

Node.js [Download Node.js](https://nodejs.org/en/download/) 

Copy the following command to install ReqText, initialize a new project and launch the terminal tree editor!

```bash
npm install reqtext && npx reqt init "My Project" && npx reqt editor
```
> Both `reqtext` and `reqt` are valid commands. For convenience, `reqt` is the preferred shorthand.

## Contributing
Please see the [Contributing Guide](CONTRIBUTING.md) for details on how to contribute to ReqText.

> **Note from Fred**: I'm building ReqText based on how I work, but I want to know how you work too! If you have ideas for features or improvements, please try out the tool and open an issue on GitHub. I want to make ReqText the best tool it can be for managing requirements.

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

## CLI

Command line interface (CLI) for ReqText provides a set of commands to manage your requirements project, including initialization, item management, and README generation.

### init <project name>

Project name can be entered in "" or with spaces, the init command will replace spaces with underscores.

The init command will create a `.reqt` directory in your root that will hold the following files:
    - `config.reqt.json` - The config file for the project
    - `itemTemplate.reqt.json` - The template for new items. This can be edited at any time, but will not back populate existing items unless exported to markdown and imported back.
    - <project name>.reqt.json - A data back up of your project.

<project name>.reqt.md - The Source of truth for the project in your root directory.

### General Commands

| Command                | Description                          |
|------------------------|--------------------------------------|
| `version`, `--version`, `-v` | Show version number                |
| `help`, `--help`, `-h`       | Show help text                     |
| `init <project name>`        | Initialize a new ReqText project   |
| `editor`                     | Launch the interactive terminal editor |
| `clean`, `-c`                | Ensure all items have a valid reqt_id. |

> Note: The main purpose of `clean` is if an AI coding tool adds an item directly in your markdown file. `clean` will ensure all items have a valid `reqt_id`.

### Item Management Commands

| Command                        | Description                               | Usage Example |
|--------------------------------|-------------------------------------------|----------------|
| `add-item`, `-a`              | Add an item to the end of the project     | `reqt add-item "New Item"` |
| `add-after`, `-aa`            | Add an item after a specific outline ID   | `reqt add-after 1.2 "New Subitem"` |
| `delete`, `-d`                | Delete an item by outline number          | `reqt delete 1.3` |
| `make-children`, `-mc`        | Demote an item (and its children)         | `reqt make-children 1.2` |
| `make-sibling`, `-ms`         | Promote an item (and its children)        | `reqt make-sibling 1.2` |
| `edit-title`, `-et`           | Edit the title of an item by outline ID   | `reqt edit-title 1.2 "Updated Title"` |
| `set-status`, `-ss`           | Set the status of an item                 | `reqt set-status 1.2 NEW` |

## README Generation

| Command | Description |
| --- | --- |
| `generate-readme`, `-grm`     | Generate README.md from the .reqt.json source of truth |

The generation is driven by the `README` field in the .reqt.md.

To exclude an item from the README generation, set the `README` field to `exclude`.

## ReqText Terminal Tree Editor Key Bindings

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
README.md generated by **ReqText v0.1.0-beta.20** on 2025-06-05T03:09:23.895Z

[ReqText GitHub Issues for Support](https://github.com/fred-terzi/reqtext/issues)
