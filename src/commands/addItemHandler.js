import fhr from "@terzitech/flathier";

export default async function addItemHandler (...args) {
    try {
        // Load the data
        const data = await fhr.loadData();
        // Check if data is loaded
        if (!data || !Array.isArray(data) || data.length === 0) {
            process.stdout.write("❌ No project data loaded.\nRun 'npx reqt init <project name>'\n");
            process.exit(1);
        }
        
        // Join all arguments into a single string
        let argString = args.join(" ");

        // If argString is empty, use new item
        if (argString === "") {
            process.stdout.write("No arguments provided. Using default 'new item'.\n");
            argString = "New Item";
        }

        // Get the last item outline
        const lastItemOutline = fhr.getLastItemOutline(data);

        const updatedData = await fhr.addObject(data, lastItemOutline, argString);
        // Save the updated data
        await fhr.saveData(updatedData);
        process.stdout.write(`✅ Added item: ${argString}\n`);
    } catch (err) {
        if (err.message && err.message.includes('Template file not found')) {
            process.stdout.write('Template file not found. Please run: npx reqt init <project name>\n');
            process.exit(1);
        } else {
            throw err;
        }
    }
}