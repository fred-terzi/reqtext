import fhr from `@terzitech/flathier`

export default async function addItemHandler (data, outlineNumber, item) {
    // Check if the outline number is valid
    if (!data.outlineNumbers.includes(outlineNumber)) {
        console.error(`Invalid outline number: ${outlineNumber}`);
        return;
    }

    // Add the item to the specified outline number
    const outline = data.outlines[outlineNumber];
    if (outline) {
        outline.items.push(item);
        console.log(`Item "${item}" added to outline number ${outlineNumber}.`);
    } else {
        console.error(`Outline number ${outlineNumber} not found.`);
    }
}