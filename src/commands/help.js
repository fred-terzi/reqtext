export default async function help() {
    const helpText = `
Welcome to ReqText!

Usage: reqtext <command>

Commands:
    version, --version, -v   Show version
    help, --help, -h         Show help
    init <project name>      Initialize a new ReqText project
    editor                   Launch the interactive terminal editor
    add_item, -a             Add an item to the end of the project
        Usage: reqtext add_item <item_name>
    add_after, -aa           Add an item after a specified outline number
        Usage: reqtext add_after <outline_number> <item_name>
    delete, -d               Delete an item by outline number
        Usage: reqtext delete <outline_number>
    make_children, -mc       Demote an item (and its children) 
        Usage: reqtext make_children <outline_number>
    make_sibling, -ms        Promote an item (and its children)
        Usage: reqtext make_sibling <outline_number>
    edit_title, -et          Edit the title, status, test_exists, or test_passed of an item by outline number
        Usage: reqtext edit_title <outline_number> <new_title>
    set_status               Edit the status of an item by outline number
        Usage: reqtext set_status <outline_number> <new_status>
    test_exists              Edit the test_exists field of an item by outline number
        Usage: reqtext test_exists <outline_number> <true/false>
    test_passed              Edit the test_passed field of an item by outline number
        Usage: reqtext test_passed <outline_number> <true/false>
    clean                    Ensure all items have valid reqt_ID
        Usage: reqtext clean

Terminal Editor Keybindings:
    ↑/↓        Navigate requirements
    k          Move selected item up
    j          Move selected item down
    →          Demote selected item to child (indent)
    ←          Promote selected item to sibling (outdent)
    a          Add a new item after the selected requirement (prompts for title)
    d          Delete the selected item
    e          Edit the selected item's title
    r          Reload data
    q, Ctrl+C  Quit and clear the console
    `;
    console.log(helpText.trim());
}