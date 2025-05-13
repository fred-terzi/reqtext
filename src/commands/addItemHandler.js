import fhr from "@terzitech/flathier";

export default async function addItemHandler (data, ...args) {
    // Join all arguments into a single string
    const argString = args.join("_");
    console.log(`Adding item with args: ${argString}`);

    // Get the last item outline
    const lastItemOutline = fhr.getLastItemOutline(data);

    const updatedData = await fhr.addObject(data, lastItemOutline, argString);
    // Save the updated data
    await fhr.saveData(updatedData);
}