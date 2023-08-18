const fs = require("fs");

const inFile = ".___scratch.in.txt";
const outFile = ".___scratch.out.txt";

let inText = fs.readFileSync(inFile, { encoding: "utf8" });

pattern = /[,\s()-]+|(?:_-)/g;

replace_with_empty_text_pattern = /[']+/g;

const title = inText
  .toLowerCase()
  .trim()
  .replace(pattern, "-")
  .replace(replace_with_empty_text_pattern, "")
  .replace(/-\.htm/, ".htm");

const outText = `${title}
C:\\web-pages\\${title}`;

fs.writeFileSync(outFile, outText);
