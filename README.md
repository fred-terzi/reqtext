# ReqText by Terzi Tech

**ReqText** is a Git-native, CLI-first requirements and documentation framework that brings requirement management directly into your development workflow. Requirements are edited as hierarchical trees but stored in a flat, ordered structure—making them easy to version, diff, and understand by both humans and AI.

---

## 🧠 Docucoding with ReqText

**Docucoding** is a new approach to writing and managing code requirements. With ReqText, your requirements live *in your workspace*, alongside your code, using the same tools.

AI-enhanced docucoding transforms how we work with AI. Instead of writing long prompts and iterating manually, ReqText provides a structured framework your chosen AI can understand and update. In the era of AI agents, ReqText gives them the project context they need to go from helpful assistant to actual team member.

---

## 📄 Introducing `README_AI.reqt`

ReqText naturally centralizes your requirements, documentation, design intent, and project status in a unified format. While this powers your human-readable docs, it’s also instantly usable by AI.

The `README_AI.reqt` file acts as a *living prompt*—a clear, structured file that helps your AI tools understand not just ReqText itself, but the project you're building with it.

---

## 👋 A Note from the Developer

This project is in early demo release because I believe the core functionality and methodology are ready for real-world feedback.

I’m actively working on new features and refinements. Your feedback is invaluable—please [open an issue](https://github.com/terzitech/reqtext/issues) with any bugs, requests, or ideas. Issues always take top priority.

Thank you for checking out ReqText. Happy Docucoding!

— *Joseph Terzi*

## Quick Start Guide

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
npx reqt -a "New Item"           # Add a new item to the end
npx reqt clean                   # Ensure all items have valid reqt_ID and proj_ID
```

> ✅ Both `reqtext` and `reqt` are valid commands. For convenience, `reqt` is the preferred shorthand throughout this guide.

---

## CLI Reference

### General Commands

| Command                      | Description                            |
| ---------------------------- | -------------------------------------- |
| `version`, `--version`, `-v` | Show version number                    |
| `help`, `--help`, `-h`       | Show help text                         |
| `init <project name>`        | Initialize a new ReqText project       |
| `editor`                     | Launch the interactive terminal editor |
| `clean`                      | Ensure all items have valid reqt_ID and proj_ID |

### Item Management Commands

| Command                | Description                             | Usage Example                         |
| ---------------------- | --------------------------------------- | ------------------------------------- |
| `add_item`, `-a`       | Add an item to the end of the project   | `reqt add_item "New Item"`            |
| `add_after`, `-aa`     | Add an item after a specific outline ID | `reqt add_after 1.2 "New Subitem"`    |
| `delete`, `-d`         | Delete an item by outline number        | `reqt delete 1.3`                     |
| `make_children`, `-mc` | Demote an item (and its children)       | `reqt make_children 1.2`              |
| `make_sibling`, `-ms`  | Promote an item (and its children)      | `reqt make_sibling 1.2`               |
| `edit_title`, `-et`    | Edit the title of an item by outline ID | `reqt edit_title 1.2 "Updated Title"` |

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

## Learn More

Visit [terzitech.dev](https://terzitech.dev) for documentation, updates, and blog posts.
