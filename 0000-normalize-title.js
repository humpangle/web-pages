const fs = require("fs");

const inFile = ".___scratch.in.txt";
const outFile = ".___scratch.out.txt";

let inText = fs.readFileSync(inFile, { encoding: "utf8" });

pattern = /[|,\s()-]+/g;

replace_with_empty_text_pattern = /[']+|(?:_-)/g;

const title = inText
  .toLowerCase()
  .trim()
  .replace(pattern, "-")
  .replace(replace_with_empty_text_pattern, "")
  .replace(/-?\.htm/, ".htm");

const outText = [
  `C:\\google-drive-maneptha\\web-pages\\${title}`,
  "\n",
  `/c/google-drive-maneptha/web-pages/${title}`,
  "\n",
  "C:\\google-drive-maneptha\\web-pages",
  "\n",
  "/c/google-drive-maneptha/web-pages",
  "\n",
  title,
].join("\n");

fs.writeFileSync(outFile, outText);
