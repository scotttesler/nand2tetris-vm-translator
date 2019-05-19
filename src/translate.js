const cleanVmFile = require("./clean-vm-file");
const fs = require("fs");
const path = require("path");
const translateVmToAsm = require("./translate-vm-to-asm");

const VM_FILE_EXTENSION = ".vm";

function main(vmFilename) {
  const filenameWithoutExtension = getFilenameWithoutExtension(vmFilename);

  const vmCode = cleanVmFile(vmFilename);
  const asmCode = translateVmToAsm(vmCode, path.basename(filenameWithoutExtension));
  fs.writeFileSync(`${filenameWithoutExtension}.asm`, asmCode.join("\n"));
}

function getFilenameWithoutExtension(filename) {
  const iFileExtension = filename.indexOf(VM_FILE_EXTENSION);
  return filename.substring(0, iFileExtension);
}

module.exports = main;
