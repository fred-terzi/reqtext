import fhr from "@terzitech/flathier";

export default async function addItemHandler (data, ...args) {
    // Join all arguments into a single string
    let argString = args.join("_");
    console.log(`Adding item with args: ${argString}`);

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
}