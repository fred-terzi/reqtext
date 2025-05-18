# ReqText Flowcharts

- Source of Truth (SoT) is the main data source.
    - .reqt.json files
- Data Handler (`dataHandler.js`) is responsible for reading and writing data to the SoT. Nothing else has access.
- The diff gate checks if when the user change something through the CLI, that there are no difference in the markdown editable fields between the SoT and the current markdown file
    - If there is a difference, do not make the change and notify the user
    - If there are no difference make the change and notify succesful

## ReqText Data Flow

````mermaid
flowchart TD
    Start([Start: CLI Request])
    Markdown([📄 Markdown File])
    Diff{Diff Gate fn}
    DataHandler[Data Handler]
    SoT[Source of Truth]
    mem[App Memory]
    Notify[Notify User]

    Start --> Diff
    Markdown --> Diff
    Diff -- "No Differences" --> DataHandler
    Diff -- "Differences" --> Notify
    DataHandler --> SoT
    DataHandler --> mem
````

