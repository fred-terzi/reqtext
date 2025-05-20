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

 DETAILS

<!-- reqt_README_field-->

 undefined

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

 undefined

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

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->

 undefined

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

 REQUIREMENT

<!-- reqt_Accept_field-->
**Acceptance:**

 ACCEPTANCE

<!-- reqt_Det_field-->
**Details:**

 DETAILS

<!-- reqt_README_field-->

 undefined

<!-- reqt_id: 2025-05-20T02:26:37.787Z-dfbd435b --end-->