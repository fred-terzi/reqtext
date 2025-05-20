# ReqText

**ReqText** is a CLI & TUI requirements management tool designed to help you easily create, manage and visualize your requirements from the command line. The tool is built on my FlatHier (Short for Flat Hierarchy) library, which creates a manipulates hierarchical data structure in a flat, ordered json. Making it human readable and git ready.

## ReqText Installation

Available over npm:

```bash
npm install reqtext
```

or for global installation:
```bash
npm install -g reqtext
```

> ✅ Both `reqtext` and `reqt` are valid commands. For convenience, `reqt` is the preferred shorthand throughout this guide.

## ReqText Commands

## CLI Reference

### General Commands

| Command                | Description                          |
|------------------------|--------------------------------------|
| `version`, `--version`, `-v` | Show version number                |
| `help`, `--help`, `-h`       | Show help text                     |
| `init <project name>`        | Initialize a new ReqText project   |
| `editor`                     | Launch the interactive terminal editor |
| `clean`, `-c`                | Ensure all items have a valid reqt_id. |

> Note: The main purpose of `clean` is if an AI coding tool adds an item directly in the .reqt.json, or .reqt.md. Use the README_AI.reqt.json for the AI tool to learn how to properly use the CLI inputs for it to add or modify items.

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
| `test-exists`, `-te`          | Mark test as existing for an item         | `reqt test-exists 1.2 true` |
| `test-passed`, `-tp`          | Mark test as passed for an item           | `reqt test-passed 1.2 true` |

### Markdown Editing Commands
| Command | Description | Example |
|---|---|---|
| `in-md`, `-imd`               | Import changes from a markdown file back into the .reqt.json source of truth, updating only the long-form fields (requirement, acceptance, details) for each item. Use --keep or -k to keep the markdown file after import. |
| `out-md`, `-omd`              | Export all requirements to a markdown file, including the long-form fields (requirement, acceptance, details) for each item. |
| `diff`                        | Show differences between .reqt.json and markdown |`

### README and README_AI Generation
| Command | Description | Example |
| --- | --- |--- |
| `generate-readme`, `-grm`     | Generate README.md from the .reqt.json source of truth |
| `generate-readme_ai`, `-grmai`| Generate README_AI.reqt.json for AI from the .reqt.json source of truth | `reqt generate-readme_ai` |
| `init`                        | Initialize a new ReqText project          |
| `editor`                      | Launch the interactive terminal editor    |

**Example:**

```json  
{
    "reqt_ID": "2025-05-20T19:14:37.669Z-12b36284",
    "hier": 1,
    "outline": "5.3",
    "title": "Example Reqt",
    "requirement": "REQUIREMENT",
    "acceptance": "ACCEPTANCE",
    "details": "DETAILS",
    "readme": "README",
    "readme_ai": "exclude",
    "test_exists": "false",
    "test_passed": "false",
    "status": "undefined"
  }

````

```markdown

### init <project name>

`reqt init <project name>`

Project name can be entered in "" or with spaces, the init command will replace spaces with underscores.

The init command will create a `.reqt` directory in your root that will hold the following files:
    - `config.reqt.json` - The config file for the project
    - `itemTemplate.reqt.json` - The template for new items. This can be edited at any time, but will not back populate existing items.
    - <project name>.reqt.json - The source of truth for the project. This is where all the requirements, acceptance, details, and status are stored.

### add-item, -a

README

### add-after, -aa <outline number>

README

### delete, -d <outline number>

README

### make-children, -mc <outline number>

README

### make-sibling, -ms <outline number>

README

### set-status, -ss <outline number>

README

### test-exists, -te <outline number>

README

### test-passed -tp <outline number>

README

### out-md, -omd

README

### in-md, -imd

README

### clean, -c

README

## ReqText Tree Editor

README

## README Generation

README

### Title

README

### README Section

README

### README Exclude

README

### README_AI Meta Data

README

### README_AI Include/Exclude

README

### Example Reqt

README

---
Generated by **ReqText v0.1.0-demo.18** on 2025-05-20T20:33:15.683Z
[GitHub](https://github.com/joseph-terzi/reqtext)
