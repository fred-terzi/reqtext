import fhr from '@terzitech/flathier';



export default async function init(...args) {
    // If no arguments are provided, show a a usage message
    if (args.length === 0) {
        console.log("Usage: npx reqt init <project name>");
        return;
    }
    // Join all arguments into a single string
    const argString = args.join('_');
    // use fhr.init with the argString
    try {
        await fhr.init(argString, 'reqt');
    }
    catch (error) {
        console.error('Initialization failed:', error);
    }
}