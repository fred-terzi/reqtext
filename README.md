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


## Installation

> If you do not have Node.js installed, please install it first. You can download it from [nodejs.org](https://nodejs.org/).

### Local installation:
```bash
npm install @terzitech/reqtext
```
Usage:
```bash
npx reqt <command> <args>
```

> NOTE: Both `reqtext` and `reqt` are valid, but `reqt` is shorter and more convenient.

## Terminal Editor

The terminal editor is meant to be your starting point. It quickly allows you to create and modify your reqt item's order and hierarchy. Once your reqt items are in place, you can use `reqt` commands to modify any individual item.

### Example Editor View: 

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
## Terminal Editor Keybindings

- `↑`/`↓`: Navigate requirements
- `k`: Move selected item up
- `j`: Move selected item down
- `→`: Demote selected item to child (indent)
- `←`: Promote selected item to sibling (outdent)
- `a`: Add a new item after current selection
- `d`: Delete the selected item
- `e`: Edit the selected item's title
- `r`: Reload data
- `q` or `Ctrl+C`: Quit and clear the console

