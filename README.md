# ReqText by Terzi Tech

**ReqText** is a CLI & TUI requirements management tool designed to help you easily create, manage and visualize your requirements from the command line. The tool is built on my FlatHier (Short for Flat Hierarchy) library, which creates a manipulates hierarchical data structure in a flat, ordered json. Making it human readable and git ready. 


## Installation

> Ensure Node.js is installed before proceeding. You can download it from [nodejs.org](https://nodejs.org/).

### Local Installation

```bash
npm install @terzitech/reqtext
```

### Usage

```bash
npx reqt [command] [options]
```

#### Common Commands

```bash
npx reqt init <project name>     # Initialize a new reqt project
npx reqt editor                  # Launch the interactive tree editor
npx reqt -a "New Item"            # Add a new item to the end
```

> ✅ Both `reqtext` and `reqt` are valid commands. For convenience, `reqt` is the preferred shorthand throughout this guide.

---

## CLI Reference

### General Commands

| Command                | Description                          |
|------------------------|--------------------------------------|
| `version`, `--version`, `-v` | Show version number                |
| `help`, `--help`, `-h`       | Show help text                     |
| `init <project name>`        | Initialize a new ReqText project   |
| `editor`                     | Launch the interactive terminal editor |

### Item Management Commands

| Command                        | Description                               | Usage Example |
|--------------------------------|-------------------------------------------|----------------|
| `add_item`, `-a`              | Add an item to the end of the project     | `reqt add_item "New Item"` |
| `add_after`, `-aa`            | Add an item after a specific outline ID   | `reqt add_after 1.2 "New Subitem"` |
| `delete`, `-d`                | Delete an item by outline number          | `reqt delete 1.3` |
| `make_children`, `-mc`        | Demote an item (and its children)         | `reqt make_children 1.2` |
| `make_sibling`, `-ms`         | Promote an item (and its children)        | `reqt make_sibling 1.2` |
| `edit_title`, `-et`           | Edit the title of an item by outline ID   | `reqt edit_title 1.2 "Updated Title"` |
| `in-md`, `-imd`               | Import changes from a markdown file back into the .reqt.json source of truth, updating only the long-form fields (requirement, acceptance, details) for each item. Use --keep or -k to keep the markdown file after import. | `reqt in-md --keep` |
| `out-md`, `-omd`             | Export all requirements to a markdown file, including the long-form fields (requirement, acceptance, details) for each item. | `reqt out-md` `|

---

## Terminal Editor

The terminal editor provides an interactive tree view to create, navigate, and structure your `.reqt` items. It's the primary interface for building your requirement hierarchy quickly and visually.

### Sample Output from `reqt editor`

```bash
    0: ReqText_Demo - In Dev
    ├── 0.1: Design Level Reqts - DESIGN
    ├── 0.2: Instructs Level - INSTRUCT
    └── 1: Feature 1 - In Dev
        ├── 1.1: Requirement 1 - In Dev
        ├── 1.2: Requirement 2 - ACCEPT
        │   └── 1.2.1: Design Detail - DESIGN
        └── 1.3: Feature 2 - NEW
```

---

## Terminal Editor Keybindings

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





**Stored Data** vs **Markdown Generated**


```
<!-- reqt_id: 2025-05-15T02:20:36.769Z-f5df13f7-reqt -->
## 1.1: ReqT Demo Item
**Status:** NEW

---
Demo the stored data vs the markdown generated.
```

## Learn More

Visit [terzitech.dev](https://www.terzitech.dev/) for documentation, updates, and blog posts.


## Markdown Workflow

ReqText supports a markdown-based workflow for editing long-form requirement fields (requirement, acceptance, details) outside the terminal editor.

### Export to Markdown
- Run `reqt out-md` or `reqt -omd` to export requirements to a markdown file.
- The markdown file contains all long-form fields for each item, with `reqt_ID` as a comment for tracking.
- The file is suitable for editing in any markdown editor.

### Import from Markdown
- Run `reqt in-md` or `reqt -imd` to import changes from the markdown file back into the `.reqt.json` file.
- Only the long-form fields (requirement, acceptance, details) are updated; other fields are not affected.
- The markdown file is deleted by default after import, unless you specify `--keep` or `-k`.


See `README_AI.reqt` and `ReqText.reqt.md` for more details on the workflow and best practices.