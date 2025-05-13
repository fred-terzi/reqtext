export default async function help() {
    const helpText = `
Welcome to ReqText!

Usage: reqtext <command> 

Commands:
    version, --version, -v   Show version
    help, --help, -h         Show help
    `;
    console.log(helpText.trim());
}