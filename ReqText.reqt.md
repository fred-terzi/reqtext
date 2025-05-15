# ReqText CLI Architecture

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



