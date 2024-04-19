#!/bin/env node

const fs = require("fs");

const inFile = ".___scratch.in.txt";
const outFile = ".___scratch.out.txt";

let inText = fs.readFileSync(inFile, { encoding: "utf8" });

const pattern = /[`⧸\\/\[\]|｜,’\s:()-]+/g;

const replace_with_empty_text_pattern = /[']+|(?:_-)/g;

const title = inText
  .toLowerCase()
  .trim()
  .replace(pattern, "-")
  .replace(replace_with_empty_text_pattern, "")
  .replace(/-?\.htm/, ".htm");

const windowsOsDestinationPathPrefix = "C:\\0000-shared\\web-pages\\";

const outText = [
  `${windowsOsDestinationPathPrefix}${title}`,
  "\n",
  `${windowsOsDestinationPathPrefix}chat-gpt\\${title}`,
  "\n",
  `/c/0000-shared/web-pages/${title}`,
  "\n",
  "C:\\0000-shared\\web-pages",
  "\n",
  "/c/0000-shared/web-pages",
  "\n",
  title,
].join("\n");

fs.writeFileSync(outFile, outText);
