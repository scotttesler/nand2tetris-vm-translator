const fs = require("fs");

const COMMENT_PREFIX = "//";
const FILE_ENCODING = "utf8";

function main(filePath) {
  return fs
    .readFileSync(filePath, FILE_ENCODING)
    .split(/[\r\n]+/)
    .reduce((acc, val) => {
      let str = val.replace(/\s/g, " ");
      const iComment = str.indexOf(COMMENT_PREFIX);

      if (str.length === 0) return acc;
      if (str.startsWith(COMMENT_PREFIX)) return acc;
      if (iComment !== -1) str = str.substring(0, iComment).trim();

      acc.push(str);

      return acc;
    }, []);
}

module.exports = main;
