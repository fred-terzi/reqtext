// Function to replace spaces with underscores in a given string
export default function sanitizeSpaces(inputString) {
    return inputString.replace(/\s+/g, '_');
}