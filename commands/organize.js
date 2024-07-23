const fs = require('fs');
const path = require('path');

let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf",
    "txt", "ps", "tex", "ai", "indd", "psd"
  ],
  app: ["exe", "dmg", "pkg", "deb"],
  images: ["png", "jpeg", "tiff", "jpg", "psd", "raw"]
};

function organizeFn(srcDir, destDir) {
  if (!srcDir || !destDir) {
    console.log("Please provide both source and destination directories.");
    return;
  }

  let doesSrcExist = fs.existsSync(srcDir);
  if (!doesSrcExist) {
    console.log("Source directory does not exist.");
    return;
  }

  let destPath = path.join(destDir, "organized_files");

  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath);
  } else {
    console.log("Destination folder already exists.");
  }

  // Now organize files from each directory inside srcDir
  let directories = fs.readdirSync(srcDir);

  directories.forEach(directory => {
    let directoryPath = path.join(srcDir, directory);
    let isDir = fs.lstatSync(directoryPath).isDirectory();

    if (isDir) {
      organizeHelper(directoryPath, destPath);
    }
  });
}

function organizeHelper(src, dest) {
  let childNames = fs.readdirSync(src);

  childNames.forEach(childName => {
    let childAddress = path.join(src, childName);
    let isFile = fs.lstatSync(childAddress).isFile();

    if (isFile) {
      let fileCategory = getCategory(childName);
      console.log(childName + " belongs to " + fileCategory);
      sendFiles(childAddress, dest, fileCategory);
    }
  });
}

function getCategory(name) {
  let ext = path.extname(name).slice(1);

  for (let type in types) {
    let cTypeArr = types[type];

    if (cTypeArr.includes(ext)) {
      return type;
    }
  }

  return "others";
}

function sendFiles(srcFilePath, dest, fileCategory) {
  let catPath = path.join(dest, fileCategory);

  if (!fs.existsSync(catPath)) {
    fs.mkdirSync(catPath);
  }

  let fileName = path.basename(srcFilePath);
  let destFilePath = path.join(catPath, fileName);

  fs.copyFileSync(srcFilePath, destFilePath);
  fs.unlinkSync(srcFilePath);

  console.log(fileName + " is copied to " + fileCategory);
}

module.exports = {
  organizeKey: organizeFn
};
