export default async function help() {
    const helpText = `
Welcome to ReqText!

Usage:
  reqtext <command> [options]

Core Commands:
  init <project_name>       Initialize a new ReqText project
  editor                    Launch the interactive terminal editor
  version, -v, --version    Show version
  help, -h, --help          Show this help message

Item Management:
  add-item, -a <item_name>                     Add a new item to the end
  add-after, -aa <outline_number> <title>      Add an item after a specific outline number
  delete, -d <outline_number>                  Delete an item by outline number
  make-children, -mc <outline_number>          Demote item (and children)
  make-sibling, -ms <outline_number>           Promote item (and children)
  edit-title, -et <outline_number> <new_title> Edit an item title
  set-status, -ss <outline_number> <status>    Set status (e.g. open, done)


  generate-readme, -grm         Create README.md from .reqt.json
  
  clean, -c                      Ensure all items have valid reqt_IDs

Interactive Terminal Editor — Keybindings:
  ↑ / ↓       Navigate items        j / k        Move item down/up
  → / ←       Demote / Promote      a            Add after selected item
  e           Edit title            d            Delete item
  r           Reload file           q / Ctrl+C   Quit editor
    `;
    console.log(helpText.trim());
}