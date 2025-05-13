export default async function help() {
    const helpText = `
Welcome to ReqText!

Usage: reqtext <command> 

Commands:
    version, --version, -v   Show version

    help, --help, -h         Show help

    add_item, -a             Add an item to the end of the project
        Usage: reqtext add_item <item_name>

    add_after, -aa           Add an item after a specified outline number
        Usage: reqtext add_after <outline_number> <item_name>

    delete, -d               Delete an item by outline number
        Usage: reqtext delete <outline_number>
    `;
    console.log(helpText.trim());
}