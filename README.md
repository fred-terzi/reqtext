# ReqText

**ReqText** is a CLI & TUI requirements management tool designed to help you easily create, manage, and visualize your requirements from the command line. It's built on my FlatHier (short for Flat Hierarchy) library, which creates and manipulates a hierarchical data structure in a flat, ordered JSON. The result is a human-readable, Git-friendly structure that plays nicely with both AI and developer workflows.

## Why ReqText?

Most requirement tools are complex, cloud-based, or divorced from your code. ReqText is CLI-first and Git-native. It's built for developers who want lightweight, structured, human- and AI-readable requirements — right next to the code.

## Installation

Available over npm:

```bash
npm install reqtext
npx reqt --help
```

or for global installation:

```bash
npm install -g reqtext
reqt --help
```

> ✅ Both `reqtext` and `reqt` are valid commands. For convenience, `reqt` is the preferred shorthand.

## CLI Reference

### General Commands

| Command                      | Description                              |
| ---------------------------- | ---------------------------------------- |
| `version`, `--version`, `-v` | Show version number                      |
| `help`, `--help`, `-h`       | Show help text                           |
| `init <project name>`        | Initialize a new ReqText project         |
| `editor`                     | Launch the interactive terminal editor   |
| `clean`, `-c`                | Ensure all items have a valid `reqt_id`. |

> Use `clean` if an AI coding tool modifies `.reqt.json` or `.reqt.md` directly. The `README_AI.reqt.json` file provides context to help the AI learn proper CLI usage.

### Item Management Commands

| Command                | Description                             | Usage Example                         |
| ---------------------- | --------------------------------------- | ------------------------------------- |
| `add-item`, `-a`       | Add an item to the end of the project   | `reqt add-item "New Item"`            |
| `add-after`, `-aa`     | Add an item after a specific outline ID | `reqt add-after 1.2 "New Subitem"`    |
| `delete`, `-d`         | Delete an item by outline number        | `reqt delete 1.3`                     |
| `make-children`, `-mc` | Demote an item (and its children)       | `reqt make-children 1.2`              |
| `make-sibling`, `-ms`  | Promote an item (and its children)      | `reqt make-sibling 1.2`               |
| `edit-title`, `-et`    | Edit the title of an item by outline ID | `reqt edit-title 1.2 "Updated Title"` |
| `set-status`, `-ss`    | Set the status of an item               | `reqt set-status 1.2 NEW`             |
| `test-exists`, `-te`   | Mark test as existing for an item       | `reqt test-exists 1.2 true`           |
| `test-passed`, `-tp`   | Mark test as passed for an item         | `reqt test-passed 1.2 true`           |

## Markdown Editing Workflow

ReqText supports a markdown-based editing workflow that lets you export requirements from `.reqt.json` and edit them in your preferred markdown editor. This user-friendly format supports long-form content and can preview future README output, including Mermaid diagrams.

| Command          | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| `out-md`, `-omd` | Export requirements to markdown for editing.                                     |
| `in-md`, `-imd`  | Import changes from markdown into `.reqt.json`. Use `--keep` to retain the file. |
| `diff`           | Show differences between `.reqt.json` and markdown.                              |

### Example Flow

1. **`.reqt.json` Example**

```json
{
  "reqt_id": "2025-05-20T19:14:37.669Z-12b36284",
  "hier": 1,
  "outline": "5.3",
  "title": "Example Reqt",
  "requirement": "...",
  "acceptance": "...",
  "details": "...",
  "readme": "...",
  "readme_ai": "exclude",
  "test_exists": "true",
  "test_passed": "false",
  "status": "IN DEV"
}
```

2. **Exported Markdown**

```markdown
<!-- ReqText ID Block Start -->

### 5.3: Example Reqt

| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| IN DEV | true        | false       |

**Requirement:**
...

**Acceptance:**
...

**Details:**
...

**README:**
...

**README AI:**
exclude

<!-- ReqText ID Block End -->
```

3. **Generated README Output**

---

### 5.3: Example Reqt

This example demonstrates how a requirement is represented and managed in ReqText.

> **A Note from Joe:** I write all details in common language, like a prompt, and have AI populate the rest. Then I refine the README section.

---

## README & README\_AI Generation

| Command                        | Description                            |
| ------------------------------ | -------------------------------------- |
| `generate-readme`, `-grm`      | Generate `README.md` from `.reqt.json` |
| `generate-readme_ai`, `-grmai` | Generate `README_AI.reqt.json` for AI  |

To exclude a requirement from generation, set `readme_ai` to `exclude`. To include it, use `include`.

## Project Initialization

```bash
reqt init "My Project"
```

This creates a `.reqt` folder with:

```bash
My_Project/
└── .reqt/
    ├── config.reqt.json
    ├── itemTemplate.reqt.json
    └── My_Project.reqt.json
```

## Terminal Tree Editor

An interactive tree view to create, navigate, and structure your `.reqt` items.

### Sample Output

```bash
0: ReqText_Demo - In Dev
├── 0.1: Design Level Reqts - DESIGN
├── 0.2: Instructs Level - INSTRUCT
├── 1: Feature 1 - In Dev
│   ├── 1.1: Requirement 1 - In Dev
│   └── 1.2: Requirement 2 - ACCEPT
│       └── 1.2.1: Design Detail - DESIGN
└── 2: Feature 2 - NEW
```

### Keybindings

| Key            | Action                 |
| -------------- | ---------------------- |
| `↑` / `↓`      | Navigate               |
| `k` / `j`      | Move item up/down      |
| `→` / `←`      | Demote / Promote       |
| `a`            | Add item after current |
| `d`            | Delete item            |
| `e`            | Edit title             |
| `r`            | Reload data            |
| `q` / `Ctrl+C` | Quit and clear console |

---

## Get Involved

* ⭐ Star the [GitHub repo](https://github.com/joseph-terzi/reqtext)
* 🐛 Found a bug? [Open an issue](https://github.com/joseph-terzi/reqtext/issues)
* 🧪 Try the TUI and share your feedback — I'm building this solo and learning from every use case.

## Docucoding

If you are interested in my long term vision for ReqText, check out [Docucoding with ReqText](www.terzitech.dev).

I would love early feedback as I ramp up the project. Thank you!

---

Generated by **ReqText v0.1.0-demo.18** on 2025-05-21T02:01:41.407Z
