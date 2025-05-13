# flathier

FlatHier is a lightweight Node.js library designed to create and manipulate hierarchical data stored in a flat JSON structure. It provides a set of core, data handling, and utility functions to manage hierarchical data efficiently.

## Features

- **Core Functions**: Create, Add, delete, promote, demote, and move hierarchical objects.
- **Data Handling**: Load, save, and set hierarchical data.
- **Utility Functions**: Generate ASCII tree representations, compute outlines, and sanitize user inputs.

## Installation

Install the library using npm:

```bash
npm install flathier
```
Then use:
```bash
npx flathier
```

## Usage

Import the library and use its functions:

```javascript
import flathier from 'flathier';

// Initialize a new hierarchy
flathier.init();

// Load existing hierarchy data the .fhr.json file
const data = flathier.loadData();

// Add an object to the hierarchy
/**
 * @param {Object} data - The object loaded from the file
 * @param {string} outline - The outline number of the item to add the new item under
 */

flathier.addObject(data, "1");

// Save the hierarchy to a file
flathier.saveData();
```

## API Reference

### Core Functions
- `init()`: Initialize a new hierarchy.
- `addObject(data, outlineNumber)`: Add an object to the hierarchy under the specified outline number.
- `deleteObject(data, outlineNumber)`: Delete an object by its outlineNumber.
- `promote(data, outlineNumber)`: Promote an object and it's children in the hierarchy.
- `demote(data, outlineNumber)`: Demote an object and it's children in the hierarchy.
- `moveUp(data, outlineNumber)`: Move an object and it's children up in the hierarchy.
- `moveDown(data, outlineNumber)`: Move an object and it's children down in the hierarchy.
- `createAsciiTree(data, fieldsToInclude)`: Generate an ASCII representation of the hierarchy given the data and the fields from the object to include in the tree title.

### Data Handling
- `loadData(filePath)`: Load hierarchy data from the file.
- `saveData(filePath)`: Save hierarchy data to the file.
- `setData(data)`: Set the hierarchy data only in memory.

> Note: The file path is hard coded to `./.fhr.json` created during the init function to ensure a single source of truth.

### Utility Functions
- `getLastItemOutline()`: 
Get the outline of the last item in the hierarchy.
- `getLastTemplateObject()`: Get the template for the last item.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the AGPL-3.0 License. See the [LICENSE](LICENSE) file for details.

