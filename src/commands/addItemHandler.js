import fhr from "@terzitech/flathier";

export default async function addItemHandler (data, ...args) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error("❌ No project data loaded.\n Run 'npx reqt init <project name>'");
        process.exit(1);
    }
    // Join all arguments into a single string
    let argString = args.join("_");

    // If argString is empty, use new item
    if (argString === "") {
        console.log("No arguments provided. Using default 'new item'.");
        argString = "New Item";
    }

    // Get the last item outline
    const lastItemOutline = fhr.getLastItemOutline(data);

    const updatedData = await fhr.addObject(data, lastItemOutline, argString);
    // Save the updated data
    await fhr.saveData(updatedData);
    console.log(`✅ Added item: ${argString}`);
}