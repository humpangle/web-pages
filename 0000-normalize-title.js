const fs = require("fs");

const inFile = ".___scratch.in.txt";
const outFile = ".___scratch.out.txt";

let inText = fs.readFileSync(inFile, { encoding: "utf8" });

pattern = /[|,\s()-]+/g;

replace_with_empty_text_pattern = /[']+|(?:_-)/g;

let outText = inText
  .toLowerCase()
  .trim()
  .replace(pattern, "-")
  .replace(replace_with_empty_text_pattern, "")
  .replace(/-?\.htm/, ".htm");

fs.writeFileSync(outFile, outText);
