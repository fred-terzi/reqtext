# ReqText by Terzi Tech

ReqText is a Git-native, CLI first requirements and documentation framework meant to bring requirement management directly into your workflow. The requirements can be easily created and modified in hierachical trees, but they are stored in a flat, ordered structure. This allows for easy human -and AI- readability. As well as easy version control and diffing.

## Docucoding with ReqText

Docucoding in a new to approach code requirements and documentation. The requirements live in your workspace with the same tools used for creating and managing them. 

Docucoding with AI revolutionizes how we interact with it. Rather than crafting a single starting prompt going back and forth; ReqText is a complete requirements and PM framework that your chosen AI can learn and maintain. In the era of AI Agents, ReqText brings the information and structure needed to turn AI from an assistant into a true developer.

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

