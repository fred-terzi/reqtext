export default async function help() {
    const helpText = `
Welcome to ReqText!

Usage: reqtext <command> 

Commands:
    version, --version, -v   Show version
    `;
    console.log(helpText.trim());
}