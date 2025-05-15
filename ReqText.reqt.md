# ReqText CLI Architecture

Design Reqs:

ALWAYS USE ES MODULES, never require.

## High Level 

Needs to be human readable and easy to understand.

## High Level (Simple)

```mermaid
flowchart TD
    A[User/AI] --> B[CLI Entry: reqt]
    B --> C{Command Parser}
    C --> D[Command Handlers]
    D --> E[Data Layer]
    E --> F[Project Data]
    D --> G[Markdown Conversion]
    G --> H[Markdown Files]
    C --> I[Utilities]
```

```mermaid
flowchart TD
    A[CLI Entry: bin/index.js] --> B{Command?}
    B -- mdreqt --> C[mdToReqtHandler.js]
    B -- else --> D[main.js]
    D --> E{Parse Command}
    E -- init --> F[init.js]
    E -- add_item --> G[addItemHandler.js]
    E -- add_after --> H[addAfterHandler.js]
    E -- delete --> I[deleteHandler.js]
    E -- make_children --> J[makeChildrenHandler.js]
    E -- make_sibling --> K[makeSiblingHandler.js]
    E -- edit_title --> L[editTitleHandler.js]
    E -- clean --> M[cleanHandler.js]
    E -- reqtmd --> N[reqtToMDHandler.js]
    E -- help --> O[help.js]
    E -- editor --> P[reqtEditor.js]
    F & G & H & I & J & K & L & M & N & P --> Q[FlathierDataLayer]
    Q --> R[ProjectData]
    N & C --> S[Markdown Files]
    subgraph Utilities
      U1[getCurrentReqtFilePath.js]
      U2[getVersion.js]
    end
    D --> Utilities
```

## Testing Design

Only use node.js for testing. No external libraries. This makes it easier to run tests in any environment especially since the AI can quickly evaluate printed statements with sophicasted testing reports.

## Test Fields Handling

As of flathier version 0.1.0-demo.9 and later, the fields `test_exists` and `test_passed` are automatically included in all new and template items by the flathier library. There is no need for ReqText to add or manage these fields manually in its own logic.

## Init Change Request
```mermaid
flowchart TD
    A[User runs: npx reqt init <project name>] --> B{Arguments Provided?}
    B -- No --> C[Show usage message and exit]
    B -- Yes --> D[Join args into project name]
    D --> E[Check for existing .reqt.json files in cwd]
    E -- Files exist --> F[Prompt user to confirm switch/create new file]
    F -- User declines --> G[Abort, no changes made]
    F -- User confirms --> H[Continue]
    E -- No files exist --> H
    H --> I[Call fhr.init with project name and reqt type]
    I -- Success --> J[Initialization complete]
    I -- Error --> K[Show error message]
```