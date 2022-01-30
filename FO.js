const helpModule = require("./commands/help");
const organizeModule = require("./commands/organize");
const treeModule = require("./commands/tree");
let inputArr = process.argv.slice(2);

//[Node FO.js tree folderpath]

let command = inputArr[0];

switch (command) {
  case "tree":
    console.log("Tree Implemented")
    break;
  case "organize":
    organizeModule.organizeKey(inputArr[1]);
    break;
  case "help":
    helpModule.helpKey();
    break;

  default:
    console.log("PLEASE ENTER A VALID Command");
    break;
}