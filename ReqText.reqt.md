<!-- reqt_id: 2025-05-20T00:21:07.991Z-d123f61d --start-->

# 0: ReqText

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| v0.1.0 | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 The ReqText project must meet all the requirements outlined in this reqt project file.

<!-- reqt_Accept_field-->
**Acceptance:**

 A test suite must be created to validate the requirements outlined in this reqt project file.

<!-- reqt_Det_field-->
**Details:**

 This root-level requirement establishes that ReqText, as a project, is governed by the requirements defined in this file. It acts as a meta-requirement, ensuring traceability and completeness for all features, commands, and workflows. The intent is to guarantee that every aspect of the tool (CLI, TUI, markdown workflow, data model, and documentation) is covered by explicit, testable requirements. This requirement is validated by the presence of a comprehensive test suite that exercises all documented requirements, and by regular review to ensure new features or changes are reflected in this file. The root requirement also serves as a contract for contributors and maintainers, ensuring ongoing alignment between implementation, documentation, and user needs.

<!-- reqt_README_field-->
**README:**

 **ReqText** is a CLI & TUI requirements management tool designed to help you easily create, manage and visualize your requirements from the command line. The tool is built on my FlatHier (Short for Flat Hierarchy) library, which creates a manipulates hierarchical data structure in a flat, ordered json. Making it human readable and git ready.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T00:21:07.991Z-d123f61d --end-->

<!-- reqt_id: 2025-05-20T00:24:38.690Z-89ddbdb7 --start-->

### 0.1: AI INSTRUCTs

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| INSTRUCs | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T00:24:38.690Z-89ddbdb7 --end-->

<!-- reqt_id: 2025-05-20T02:05:38.677Z-b0309245 --start-->

## 1: ReqText Installation

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

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

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T02:05:38.677Z-b0309245 --end-->

<!-- reqt_id: 2025-05-20T00:24:52.186Z-7ce6967d --start-->

## 2: ReqText Commands

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| INFO | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 ReqText must provide a comprehensive set of CLI commands for managing requirements, including project initialization, item management (add, delete, edit, promote/demote), status updates, markdown import/export, and cleaning. Each command must be accessible via both long and short flags, and must function as described in the documentation.

<!-- reqt_Accept_field-->
**Acceptance:**

 All documented commands are implemented and accessible from the CLI. Each command produces the expected output, handles errors gracefully, and provides usage instructions when invoked incorrectly. Automated and/or manual tests exist for each command, verifying correct behavior and error handling.

<!-- reqt_Det_field-->
**Details:**

 The CLI commands cover all major user workflows: initializing a project, adding/editing/deleting items, promoting/demoting items in the hierarchy, updating item status, exporting/importing requirements to/from markdown, and cleaning up project files. Commands should be discoverable via `--help` and should provide clear feedback to the user. Each command should be testable via scripts in the `tests/` directory. Reference the README for command usage examples and expected behaviors.

<!-- reqt_README_field-->
**README:**

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
    "acceptance": "The example must be clear and helpful. The example must be approved by Joe.",
    "details": "For the README there will be a section to show an example of the .reqt.json, .reqt.md and the generated README.md and README_AI.reqt.json.",
    "readme": "This example demonstrates how a requirement is represented and managed in ReqText, including its appearance in the .reqt.json, .reqt.md, and the generated README files. Use this as a reference for structuring your own requirements and documentation workflow.\n\n\n\n> **A Note from Joe** My workflow is to write all the details in common language, like a prompt, and have AI populate the rest. Then I clean up or change the README section. I did it for this example.",
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

 The example must be clear and helpful. The example must be approved by Joe.

-- ReqText Details Field--
**Details:**

 For the README there will be a section to show an example of the .reqt.json, .reqt.md and the generated README.md and README_AI.reqt.json.

-- ReqText README Field--
**README:**

This example demonstrates how a requirement is represented and managed in ReqText, including its appearance in the .reqt.json, .reqt.md, and the generated README files. Use this as a reference for structuring your own requirements and documentation workflow.

> **A Note from Joe** My workflow is to write all the details in common language, like a prompt, and have AI populate the rest. Then I clean up or change the README section. I did it for this example.

 
**README AI:**

exclude

-- Make Content "exclude" to exclude from README AI generation --

-- ReqText ID Comment Line --end--
```
> **Note:** The `-- ReqText ID Comment line --` is a comment line that is used for parsing. They include the `reqt_id` and other metadata. I couldn't put real lines in the example or they would have been stripped out at generation. I hope you get the idea!

3. **The README.md file generated by the generate-readme command will look like this:**
---
### 5.3: Example Reqt

This example demonstrates how a requirement is represented and managed in ReqText, including its appearance in the .reqt.json, .reqt.md, and the generated README files. Use this as a reference for structuring your own requirements and documentation workflow.

> **A Note from Joe** My workflow is to write all the details in common language, like a prompt, and have AI populate the rest. Then I clean up or change the README section. I did it for this example!
---

## README and README_AI Generation
| Command | Description |
| --- | --- |
| `generate-readme`, `-grm`     | Generate README.md from the .reqt.json source of truth |
| `generate-readme_ai`, `-grmai`| Generate README_AI.reqt.json for AI from the .reqt.json source of truth |

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T00:24:52.186Z-7ce6967d --end-->

<!-- reqt_id: 2025-05-20T00:25:13.130Z-9ba8c130 --start-->

### 2.1: --version, -v

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 The CLI must display the current version of ReqText when invoked with `--version` or `-v` and then exit.

<!-- reqt_Accept_field-->
**Acceptance:**

 Running `reqt --version` or `reqt -v` outputs the version number (matching `package.json`) to stdout and exits with code 0. If an error occurs, a helpful message is shown and a non-zero exit code is returned. A test exists to verify this behavior.

<!-- reqt_Det_field-->
**Details:**

 The version should be sourced from `package.json` to ensure consistency. No other output should be produced. This command is typically used in CI, scripting, and user troubleshooting. See `src/utils/getVersion.js` for implementation and `tests/` for test coverage.

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T00:25:13.130Z-9ba8c130 --end-->

<!-- reqt_id: 2025-05-20T00:27:35.249Z-cc998ee6 --start-->

### 2.2: --help, -h

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 The CLI must provide a `--help` or `-h` command that displays usage instructions and a summary of all available commands, including their flags and descriptions. The help output must be clear, concise, and up to date with all implemented features. The command should exit after displaying help.

<!-- reqt_Accept_field-->
**Acceptance:**

 Running `reqt --help` or `reqt -h` displays a help message listing all available commands, their flags, and a brief description of each. The output is readable and matches the current CLI implementation. The command exits with code 0. If an unknown command is entered, the help message is also shown. Manual or automated tests verify the output and behavior.

<!-- reqt_Det_field-->
**Details:**

 The help command is essential for user onboarding and troubleshooting. It should be updated whenever new commands or flags are added. The help output should include both long and short flags, usage examples, and a brief description of each command. The implementation should ensure that the help message is shown for both explicit (`--help`, `-h`) and fallback (unknown command) invocations. See `src/commands/help.js` for implementation and `tests/` for test coverage.

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T00:27:35.249Z-cc998ee6 --end-->

<!-- reqt_id: 2025-05-20T00:27:57.660Z-7d19b5ff --start-->

### 2.3: `init <project name>`

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| DONE | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 The CLI must provide an `init <project name>` command that initializes a new ReqText project in the specified directory. This command must create the necessary project structure, including a `.reqt.json` or `.reqt.md` file, and populate it with a minimal valid template. The command should prevent overwriting existing projects unless explicitly confirmed by the user.

<!-- reqt_Accept_field-->
**Acceptance:**

 Running `reqt init <project name>` creates a new directory (if it does not exist), initializes a `.reqt.json` or `.reqt.md` file with a valid template, and provides a success message. If the target directory or file already exists, the user is prompted before overwriting. The command exits with code 0 on success and a non-zero code on error. Tests exist to verify correct initialization, error handling, and user prompts.

<!-- reqt_Det_field-->
**Details:**

 The `init` command is the entry point for new ReqText projects. It sets up the required files and structure for requirements management. The template includes a root requirement and example items to guide users. The implementation should handle edge cases such as invalid project names, permission errors, and existing files. See `src/commands/init.js` for implementation and `init.unit.test.js` for test coverage. Reference the README for usage examples and expected behaviors.

<!-- reqt_README_field-->
**README:**

 `reqt init <project name>`

Project name can be entered in "" or with spaces, the init command will replace spaces with underscores.

The init command will create a `.reqt` directory in your root that will hold the following files:
    - `config.reqt.json` - The config file for the project
    - `itemTemplate.reqt.json` - The template for new items. This can be edited at any time, but will not back populate existing items.
    - <project name>.reqt.json - The source of truth for the project. This is where all the requirements, acceptance, details, and status are stored.

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T00:27:57.660Z-7d19b5ff --end-->

<!-- reqt_id: 2025-05-20T00:28:20.116Z-92a81e13 --start-->

### 2.4: `add-item "New Item Name"` or `-a`

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 README

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T00:28:20.116Z-92a81e13 --end-->

<!-- reqt_id: 2025-05-20T00:28:26.979Z-c596438c --start-->

### 2.5: `add-after <outline number> "New Item Name"` or `-aa`

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T00:28:26.979Z-c596438c --end-->

<!-- reqt_id: 2025-05-20T00:29:36.696Z-72699288 --start-->

### 2.6: `delete <outline number` or `-d`

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | trure |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T00:29:36.696Z-72699288 --end-->

<!-- reqt_id: 2025-05-20T01:26:58.829Z-8481b746 --start-->

### 2.7: `make-children <outline number>` or `-mc`

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| Done | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T01:26:58.829Z-8481b746 --end-->

<!-- reqt_id: 2025-05-20T01:27:52.950Z-47ebf7b2 --start-->

### 2.8: `make-sibling <outline number>` or `-ms`

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T01:27:52.950Z-47ebf7b2 --end-->

<!-- reqt_id: 2025-05-20T01:28:12.893Z-bef84ff2 --start-->

### 2.9: `set-status <outline number>` or `-ss`

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T01:28:12.893Z-bef84ff2 --end-->

<!-- reqt_id: 2025-05-20T01:29:56.349Z-5bca48cb --start-->

### 2.10: `test-exists <outline number>` or `-te`

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T01:29:56.349Z-5bca48cb --end-->

<!-- reqt_id: 2025-05-20T01:30:09.693Z-73e490bb --start-->

### 2.11: `test-passed <outline number>` or `-tp`

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T01:30:09.693Z-73e490bb --end-->

<!-- reqt_id: 2025-05-20T01:30:28.413Z-10c1f70d --start-->

### 2.12: `out-md` or `-omd`

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T01:30:28.413Z-10c1f70d --end-->

<!-- reqt_id: 2025-05-20T01:30:37.305Z-fc8adb5d --start-->

### 2.13: `in-md` or `-imd`: options: `--keep` or `-k`

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T01:30:37.305Z-fc8adb5d --end-->

<!-- reqt_id: 2025-05-20T01:31:14.743Z-9b80dca9 --start-->

### 2.14: `clean` or `-c`

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T01:31:14.743Z-9b80dca9 --end-->

<!-- reqt_id: 2025-05-20T00:28:48.594Z-b59141b8 --start-->

## 3: ReqText Tree Editor

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->
**README:**

 ## Terminal Editor

The terminal editor provides an interactive tree view to create, navigate, and structure your `.reqt` items. It's the primary interface for building your requirement hierarchy quickly and visually.

### Sample Output from `reqt editor`

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

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T00:28:48.594Z-b59141b8 --end-->

<!-- reqt_id: 2025-05-20T02:26:37.787Z-dfbd435b --start-->

## 4: README Generation

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 ReqText must provide a feature to generate a `README.md` file directly from the `.reqt.json` source of truth. The generated README must include the main header and the content of the README field, supporting markdown, HTML, and other markup formats as stored in the source file. This ensures that documentation, requirements, and test states are always synchronized and up to date.

<!-- reqt_Accept_field-->
**Acceptance:**

 A user can run the appropriate CLI command (e.g., `reqt out-md` or a dedicated README generation command) and a `README.md` file is created or updated in the project root. The file contains the main header and the content from the README field in the `.reqt.json`. The process completes without errors, and the output matches the source content. Automated or manual tests verify that changes in the README field are reflected in the generated README.md. If the README field is missing or empty, the tool provides a clear warning or error message.

<!-- reqt_Det_field-->
**Details:**

 The ReqText README generation feature is designed to take the README field, and main header from the .reqt.json file and generate a markdown file. The README field is a string and can be any text so any markdown, html, mermaid etc can be stored into the .reqt.json SoT. 

 The main purpose of this feature is to have the README directly with the design, requirements, and test states for the project. The goal being that the requirements, design and README all come from the same source of truth and kept visible and up to date togther.

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T02:26:37.787Z-dfbd435b --end-->

<!-- reqt_id: 2025-05-20T12:50:41.265Z-da00905f --start-->

### 4.1: Meta Data

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 The README will create a section at the bottom for the root project reqt_id. It will include the version of reqtext and a link to the github repo. It will include a date time stamp of when the README was generated.

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T12:50:41.265Z-da00905f --end-->

<!-- reqt_id: 2025-05-20T13:31:09.057Z-b96e5191 --start-->

### 4.2: Title

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 Each object that is generated in the README will have the title of the object and follow the same logic as the project .reqt.md with the hier level driving the number of # in the markdown. The outline number will not be included in case the user excludes items out of order. It is a design choice to not generated new ones so there can be no confusion with a SoT outline and readme outline being different.

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T13:31:09.057Z-b96e5191 --end-->

<!-- reqt_id: 2025-05-20T17:26:44.799Z-9de40eff --start-->

### 4.3: README Section

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 The **README** in the .reqt.md is necesarry for efficient AI parsing, but will be stripped out of the README. Only the text section will be included in the README. The README.md itself should not be edited directly. Any changes should be made through the reqtext workflow and then regenerate the README.md.

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T17:26:44.799Z-9de40eff --end-->

<!-- reqt_id: 2025-05-20T13:31:23.772Z-d21ac780 --start-->

### 4.4: README Exclude

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| IN DEV | true | true |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 If the readme section in the .reqt.json value is "exclude" then the entire item will be excluded from the readme. 

 Use case: the user wants to have more detailed fileds in the README_AI but not in the regular README it can be excluded. 

 Example: for reqtext there will be a README section showing all the basic commands, in the README_AI that higher level will be included but there will a lower level item for each individual command so the AI has an easier time separating the commands.

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T13:31:23.772Z-d21ac780 --end-->

<!-- reqt_id: 2025-05-20T18:19:07.628Z-29189ab9 --start-->

## 5: README_AI Generation

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 ReqText must provide a CLI command (`generate-readme_ai` or `-grmai`) to generate a `README_AI.reqt.json` file directly from the `.reqt.json` source of truth. The generated file must include, for each included item, the `title` and `readme` fields, and must support project-specific filtering via the `readme_ai` field. The process must be robust to missing or malformed fields and should provide clear error messages if generation fails.

<!-- reqt_Accept_field-->
**Acceptance:**

 A user can run `reqt generate-readme_ai` or `reqt -grmai` and a `README_AI.reqt.json` file is created or updated in the project root. The file contains an array of objects, each with `title` and `readme` fields, filtered according to the `readme_ai` field. The process completes without errors, and the output matches the source content. Automated or manual tests verify that changes in the source are reflected in the generated file, and that exclusion/inclusion logic works as specified. If required fields are missing, the tool provides a clear warning or error message.

<!-- reqt_Det_field-->
**Details:**

 The README_AI will be a README_AI.reqt.json. It will include the title and readme sections of the .reqt.json file. It will be generated from the .reqt.json file and will be used for AI understanding of the project.

 Command: reqt generate-readme_ai, or reqt -grmai.

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T18:19:07.628Z-29189ab9 --end-->

<!-- reqt_id: 2025-05-20T18:24:20.031Z-7ba8b28d --start-->

### 5.1: README_AI Meta Data

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 The generated `README_AI.reqt.json` file must begin with a metadata object containing at least `generated_on` (ISO 8601 datetime) and `generated_by` (a string with the ReqText version and a link to the ReqText repository). This object must precede the array of requirement items.

<!-- reqt_Accept_field-->
**Acceptance:**

 After running the README_AI generation command, the first object in `README_AI.reqt.json` contains `generated_on` (with the correct timestamp) and `generated_by` (with the correct version and repo link). Automated or manual tests verify that the metadata is present, accurate, and updated on each generation.

<!-- reqt_Det_field-->
**Details:**

 A new object in the json will be added at the start of the README_AI.reqt.json file that will include the 'generated_on' and a 'generated_by' with the link to the reqtext repo.

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T18:24:20.031Z-7ba8b28d --end-->

<!-- reqt_id: 2025-05-20T13:31:50.019Z-38ce0010 --start-->

### 5.2: README_AI Include/Exclude

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 Each item in the `.reqt.json` source may include a `readme_ai` boolean field. If `readme_ai` is true or missing, the item is included in `README_AI.reqt.json`. If `readme_ai` is false, the item is excluded. This allows users to control which requirements are exposed to AI tools.

<!-- reqt_Accept_field-->
**Acceptance:**

 When generating `README_AI.reqt.json`, only items with `readme_ai: true` or no `readme_ai` field are included. Items with `readme_ai: false` are excluded. Automated or manual tests verify that the inclusion/exclusion logic works as described, and that edge cases (missing or malformed fields) are handled gracefully.

<!-- reqt_Det_field-->
**Details:**

 There is a readme_ai field that is true or false. If it is true then the item will be included in the README_AI section. If it is false then it will be excluded from the README_AI section.

 Use case: the user wants to separate out items for the design but not needed in either README or README_AI.

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-20T13:31:50.019Z-38ce0010 --end-->

<!-- reqt_id: 2025-05-21T01:45:43.797Z-f61234e5 --start-->

## 6: BUGS

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 The diff feature does not recognize when there are deleted or added items. It only looks at the text. This is a bug that needs to be fixed.

<!-- reqt_README_field-->
**README:**

 exclude

<!-- Make Content "exclude" to exclude from README generation -->

<!-- reqt_README_AI_field--> 
**README AI:**

exclude

<!-- Make Content "exclude" to exclude from README AI generation -->

<!-- reqt_id: 2025-05-21T01:45:43.797Z-f61234e5 --end-->