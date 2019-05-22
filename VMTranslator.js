#!/usr/bin/env node

const fs = require("fs");
const translate = require("./src/translate");

function getVmFilenameFromInput() {
  if (process.argv.length < 3) return;
  const filename = process.argv[2];
  if (!filename.endsWith(".vm")) return;

  return filename;
}

(function main() {
  const vmFilename = getVmFilenameFromInput();

  if (typeof vmFilename === "undefined") {
    console.error("No .vm file supplied to VM Translator.");
    return;
  }

  translate(vmFilename);
})();
