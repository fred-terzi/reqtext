# ReqText

**ReqText** is a CLI & TUI requirements management tool designed to help you easily create, manage and visualize your requirements from the command line. The tool is built on my FlatHier (Short for Flat Hierarchy) library, which creates a manipulates hierarchical data structure in a flat, ordered json. Making it human readable and git ready.

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

> Note: The main purpose of `clean` is if an AI coding tool adds an item directly in the .reqt.json, or .reqt.md. Use the README_AI.reqt.json as context for the AI tool to learn how to properly use the CLI inputs for it to add or modify items.

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

### Markdown Editing Workflow

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
    "reqt_ID": "2025-05-20T19:14:37.669Z-12b36284",
    "hier": 1,
    "outline": "5.3",
    "title": "Example Reqt",
    "requirement": "An example must exist for the README generation. It must follow these steps:\n - Create the example in the Tree Editor\n - Write the text in the .reqt.md workflow\n - checked in to the .reqt.json\n - Generated to the README.md and exluded from the README_AI.reqt.json",
    "acceptance": "The example must be clear and helpful. The example must be approved by Fred.",
    "details": "For the README there will be a section to show an example of the .reqt.json, .reqt.md and the generated README.md and README_AI.reqt.json.",
    "readme": "This example demonstrates how a requirement is represented and managed in ReqText, including its appearance in the .reqt.json, .reqt.md, and the generated README files. Use this as a reference for structuring your own requirements and documentation workflow.\n\n\n\n> **A Note from Fred** My workflow is to write all the details in common language, like a prompt, and have AI populate the rest. Then I clean up or change the README section. I did it for this example.",
    "readme_ai": "exclude",
    "test_exists": "true",
    "test_passed": "false",
    "status": "IN DEV"
  }

````
2. **The temporary markdown file created by the out-md command will look like this:**

> This can be saved as a PDF or your choice for a snap shot of the current state of the project.

```markdown
-- ReqText ID Comment line - start --

### 5.3: Example Reqt

-- ReqText Table Comment Line--
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| IN DEV | true | false |
-- ReqText Table Comment Line--

-- ReqText Requirement Field--
**Requirement:**

 An example must exist for the README generation. It must follow these steps:
 - Create the example in the Tree Editor
 - Write the text in the .reqt.md workflow
 - checked in to the .reqt.json
 - Generated to the README.md and exluded from the README_AI.reqt.json

**Acceptance:**

 The example must be clear and helpful. The example must be approved by Fred.

-- ReqText Details Field--
**Details:**

 For the README there will be a section to show an example of the .reqt.json, .reqt.md and the generated README.md and README_AI.reqt.json.

-- ReqText README Field--
**README:**

This example demonstrates how a requirement is represented and managed in ReqText, including its appearance in the .reqt.json, .reqt.md, and the generated README files. Use this as a reference for structuring your own requirements and documentation workflow.

> **A Note from Fred** My workflow is to write all the details in common language, like a prompt, and have AI populate the rest. Then I clean up or change the README section. I did it for this example!

 
**README AI:**

exclude

-- Make Content "exclude" to exclude from README AI generation --

-- ReqText ID Comment Line --end--
```
> **Note:** The `-- ReqText ID Comment line --` is a comment line that is used for parsing. They include the `reqt_id` and other metadata. I couldn't put real lines in the example or they would have been stripped out at generation. I hope you get the idea!

3. **The README.md file can then be rendered with the mermaid diagrams and other markdown features.**
---


## README and README_AI Generation
| Command | Description |
| --- | --- |
| `generate-readme`, `-grm`     | Generate README.md from the .reqt.json source of truth |
| `generate-readme_ai`, `-grmai`| Generate README_AI.reqt.json for AI from the .reqt.json source of truth |

The generation is driven by the `README` and `README_AI` fields in the .reqt.json. The text exclude will strip the context from the respective file generation.

> **A Note from Fred** My workflow is if I want to include it in both the README and README_AI, I simply have the readme_ai field say "include" and have the AI read the README field. It will still parse the information with the correct ReqText Title and other data. I'd love to hear what you come up with!

### `init <project name>`

Project name can be entered in "" or with spaces, the init command will replace spaces with underscores.

The init command will create a `.reqt` directory in your root that will hold the following files:
    - `config.reqt.json` - The config file for the project
    - `itemTemplate.reqt.json` - The template for new items. This can be edited at any time, but will not back populate existing items.
    - <project name>.reqt.json - The source of truth for the project. This is where all the requirements, acceptance, details, and status are stored.

## ReqText Tree Editor

## Terminal Editor

The terminal editor provides an interactive tree view to create, navigate, and structure your `.reqt` items. It's the primary interface for building your requirement hierarchy quickly and visually.

### Sample Output from `reqt editor`

```bash
    0: ReqText_Demo - In Dev
    ├── 0.1: Design Level Reqts - DESIGN
    ├── 0.2: Instructs Level - INSTRUCT
    ├── 1: Feature 1 - In Dev
    │   ├── 1.1: Requirement 1 - In Dev
    │   └── 1.2: Requirement 2 - NEW
    │       └── 1.2.1: Design Detail - DESIGN
    └── 2: Feature 2 - NEW
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

---
Generated by **ReqText v0.1.0-demo.22** on 2025-05-25T11:35:39.538Z

[ReqText Github Repo](https://github.com/joseph-terzi/reqtext)
