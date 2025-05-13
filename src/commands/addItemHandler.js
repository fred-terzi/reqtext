import fhr from "@terzitech/flathier";

export default async function addItemHandler (data, outlineNumber) {
    // If outline === "END", add to the end of the list
    if (outlineNumber === "END") {
        // Get the template object
        const templateObject = await fhr.getLastTemplateObject();
        console.log('templateObject:', templateObject);
        // Add the template object to the end of the data
        data.push(templateObject);
        // Save the data
        await fhr.saveData(data);
        console.log("Item added to the end of the list.");
    }
}