const fs = require('fs');
const path = require('path');
const helpModule = require("./commands/help");
const organizeModule = require("./commands/organize");
// const treeModule = require("./commands/tree");

let inputArr = process.argv.slice(2);

// [Node FO.js tree folderpath]

let command = inputArr[0];

function iterateDirectories(directory) {
  try {
    // Read the contents of the directory
    const files = fs.readdirSync(directory);

    // Iterate over the contents
    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      // Check if the item is a directory
      if (stats.isDirectory()) {
        // Call the organize function on the directory
        organizeModule.organizeKey(filePath);
      }
    });
  } catch (error) {
    console.error("Error reading directory:", error.message);
  }
}

switch (command) {
  case "tree":
    console.log("Tree Implemented");
    break;
  case "organize":
    const directoryPath = inputArr[1];
    iterateDirectories(directoryPath);
    break;
  case "help":
    helpModule.helpKey();
    break;
  default:
    console.log("PLEASE ENTER A VALID Command");
    break;
}
