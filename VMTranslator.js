#!/usr/bin/env node

const {
  ASM,
  BOOTSTRAP_FILENAME,
  RAM_BASES,
  RAM_POINTERS,
  VM_FILE_EXTENSION
} = require("./src/constants");

const _forEach = require("lodash/forEach");
const fs = require("fs");
const parseVmFile = require("./src/parse-vm-file");
const path = require("path");
const translateVmToAsm = require("./src/translate-vm-to-asm");

function main() {
  if (process.argv.length < 3) {
    throw new Error("No VM file or directory supplied to VM Translator.");
  }

  const cmdLineArg = process.argv[2];
  let asmCode = [];

  if (fs.lstatSync(cmdLineArg).isDirectory()) {
    _forEach(fs.readdirSync(cmdLineArg), filename => {
      asmCode = generateAsmFromVmFile(
        asmCode,
        `${path.resolve(cmdLineArg)}/${filename}`
      );
    });
  } else {
    asmCode = generateAsmFromVmFile(asmCode, path.resolve(cmdLineArg));
  }

  fs.writeFileSync(createAsmFilename(cmdLineArg), asmCode.join("\n"));
}

function createAsmCode(absPath, filename) {
  const vmCodeArr = parseVmFile(absPath);
  return translateVmToAsm(vmCodeArr, filename);
}

function createAsmFilename(cmdLineArg) {
  const resolvedPath = path.resolve(cmdLineArg);
  const parsedPath = path.parse(resolvedPath);

  return fs.lstatSync(cmdLineArg).isDirectory()
    ? `${resolvedPath}/${path.basename(resolvedPath)}.asm`
    : `${parsedPath.dir}/${path.basename(parsedPath.dir)}.asm`;
}

function generateAsmFromVmFile(asmCode, filePath) {
  if (!isValidVmFilename(filePath)) return asmCode;

  const filename = path.parse(filePath).name;

  if (filename === BOOTSTRAP_FILENAME) {
    asmCode = prependBootstrapCode(asmCode);
  }

  return asmCode.concat(createAsmCode(filePath, filename));
}

function getFilenameWithoutExtension(filename) {
  const idx = filename.indexOf(VM_FILE_EXTENSION);
  return filename.substring(0, idx);
}

function isValidVmFilename(filename) {
  if (!fs.lstatSync(filename).isFile()) return false;

  return path.extname(filename) === VM_FILE_EXTENSION;
}

function prependBootstrapCode(asmCode) {
  return [ASM.BOOTSTRAP]
    .concat(translateVmToAsm(["call Sys.init 0"], BOOTSTRAP_FILENAME))
    .concat(asmCode);
}

main();
