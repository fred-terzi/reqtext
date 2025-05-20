<!-- reqt_id: 2025-05-20T00:21:07.991Z-d123f61d --start-->

# 0: ReqText

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
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

 undefined

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

 undefined

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

 undefined

<!-- reqt_id: 2025-05-20T00:24:52.186Z-7ce6967d --end-->

<!-- reqt_id: 2025-05-20T00:25:13.130Z-9ba8c130 --start-->

### 2.1: --version, -v

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
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

 undefined

<!-- reqt_id: 2025-05-20T00:25:13.130Z-9ba8c130 --end-->

<!-- reqt_id: 2025-05-20T00:27:35.249Z-cc998ee6 --start-->

### 2.2: --help, -h

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

 **README:**

 README

<!-- reqt_id: 2025-05-20T00:27:35.249Z-cc998ee6 --end-->

<!-- reqt_id: 2025-05-20T00:27:57.660Z-7d19b5ff --start-->

### 2.3: init <project name>

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
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

 **README:**

 Use `reqt init <project name>` to quickly start a new ReqText project. This command creates the necessary files and structure for managing your requirements. See the README for more details and examples.

<!-- reqt_id: 2025-05-20T00:27:57.660Z-7d19b5ff --end-->

<!-- reqt_id: 2025-05-20T00:28:20.116Z-92a81e13 --start-->

### 2.4: add-item, -a

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

 undefined

<!-- reqt_id: 2025-05-20T00:28:20.116Z-92a81e13 --end-->

<!-- reqt_id: 2025-05-20T00:28:26.979Z-c596438c --start-->

### 2.5: add-after, -aa <outline number>

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

 undefined

<!-- reqt_id: 2025-05-20T00:28:26.979Z-c596438c --end-->

<!-- reqt_id: 2025-05-20T00:29:36.696Z-72699288 --start-->

### 2.6: delete, -d <outline number>

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

 undefined

<!-- reqt_id: 2025-05-20T00:29:36.696Z-72699288 --end-->

<!-- reqt_id: 2025-05-20T01:26:58.829Z-8481b746 --start-->

### 2.7: make-children, -mc <outline number>

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

 undefined

<!-- reqt_id: 2025-05-20T01:26:58.829Z-8481b746 --end-->

<!-- reqt_id: 2025-05-20T01:27:52.950Z-47ebf7b2 --start-->

### 2.8: make-sibling, -ms <outline number>

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

 undefined

<!-- reqt_id: 2025-05-20T01:27:52.950Z-47ebf7b2 --end-->

<!-- reqt_id: 2025-05-20T01:28:12.893Z-bef84ff2 --start-->

### 2.9: set-status, -ss <outline number>

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

 undefined

<!-- reqt_id: 2025-05-20T01:28:12.893Z-bef84ff2 --end-->

<!-- reqt_id: 2025-05-20T01:29:56.349Z-5bca48cb --start-->

### 2.10: test-exists, -te <outline number>

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

 undefined

<!-- reqt_id: 2025-05-20T01:29:56.349Z-5bca48cb --end-->

<!-- reqt_id: 2025-05-20T01:30:09.693Z-73e490bb --start-->

### 2.11: test-passed -tp <outline number>

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

 undefined

<!-- reqt_id: 2025-05-20T01:30:09.693Z-73e490bb --end-->

<!-- reqt_id: 2025-05-20T01:30:28.413Z-10c1f70d --start-->

### 2.12: out-md, -omd

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

 undefined

<!-- reqt_id: 2025-05-20T01:30:28.413Z-10c1f70d --end-->

<!-- reqt_id: 2025-05-20T01:30:37.305Z-fc8adb5d --start-->

### 2.13: in-md, -imd

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

 undefined

<!-- reqt_id: 2025-05-20T01:30:37.305Z-fc8adb5d --end-->

<!-- reqt_id: 2025-05-20T01:31:14.743Z-9b80dca9 --start-->

### 2.14: clean, -c

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

 undefined

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

 undefined

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

 ReqText must provide a feature to generate a `README.md` file directly from the `.reqt.json` (or `.reqt.md`) source of truth. The generated README must include the main header and the content of the README field, supporting markdown, HTML, and other markup formats as stored in the source file. This ensures that documentation, requirements, and test states are always synchronized and up to date.

<!-- reqt_Accept_field-->
**Acceptance:**

 A user can run the appropriate CLI command (e.g., `reqt out-md` or a dedicated README generation command) and a `README.md` file is created or updated in the project root. The file contains the main header and the content from the README field in the `.reqt.json`/`.reqt.md`. The process completes without errors, and the output matches the source content. Automated or manual tests verify that changes in the README field are reflected in the generated README.md. If the README field is missing or empty, the tool provides a clear warning or error message.

<!-- reqt_Det_field-->
**Details:**

 The ReqText README generation feature is designed to take the README field, and main header from the .reqt.json file and generate a markdown file. The README field is a string and can be any text so any markdown, html, mermaid etc can be stored into the .reqt.json SoT. 

 The main purpose of this feature is to have the README directly with the design, requirements, and test states for the project. The goal being that the requirements, design and README all come from the same source of truth and kept visible and up to date togther.

<!-- reqt_README_field-->
**README:**

 undefined

<!-- reqt_id: 2025-05-20T02:26:37.787Z-dfbd435b --end-->

<!-- reqt_id: 2025-05-20T02:53:01.966Z-205bdb70 --start-->

### 4.1: reqt_README

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| NEW | false | false |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 The `.reqt` format must include a `README` field that holds the content to be generated into the project's `README.md`. This field must accept any string, including markdown, HTML, or mermaid diagrams, and serve as the canonical source for the README content.

<!-- reqt_Accept_field-->
**Acceptance:**

 The `README` field is present in the `.reqt.json`/`.reqt.md` file and contains valid text. When the README generation feature is invoked, the content of this field is included in the generated `README.md` file. If the field is missing or empty, the tool provides a clear warning or error. Tests or manual checks confirm that the README field content is faithfully rendered in the output file.

<!-- reqt_Det_field-->
**Details:**

 In the .reqt format there is a field called README. The purpose of this field is to hold the text for the section going to be generated into the README.md. It is a string and can be any text so any markdown, html, mermaid etc can be stored into the .reqt.json SoT.

<!-- reqt_README_field-->
**README:**

 README

<!-- reqt_id: 2025-05-20T02:53:01.966Z-205bdb70 --end-->

<!-- reqt_id: 2025-05-20T03:12:19.165Z-8fc59845 --start-->

### 4.2: reqt --gen-readme, -grm

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

 The ReqText README generation feature is designed to take the README field, and main header from the .reqt.json file and generate a markdown file. The README field is a string and can be any text so any markdown, html, mermaid etc can be stored into the .reqt.json SoT.

<!-- reqt_README_field-->
**README:**

 testy test test

<!-- reqt_id: 2025-05-20T03:12:19.165Z-8fc59845 --end-->