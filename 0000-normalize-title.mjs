#!/bin/env node

import { readFileSync, writeFileSync, existsSync } from "fs";
import { sep } from "path";

let destinationPathPrefix = process.env["SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR"];

if (!destinationPathPrefix) {
  throw new Error(
    `"SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR" environment variable is required and must exist.
      "UNIX_SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR" environment variable is optional.
      "PATH_SEPARATOR_SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR" environment variable is recommended on Windows OS.`,
  );
}

const pathSeparator =
  process.env["PATH_SEPARATOR_SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR"] || sep;

destinationPathPrefix =
  destinationPathPrefix.replace(/[\/]$/, "") + pathSeparator;

const inFile = ".___scratch.in.txt";
const outFile = ".___scratch.out.txt";

let inText = readFileSync(inFile, { encoding: "utf8" });

const pattern = /[`⧸\\/\[\]|｜,’\s:()-]+/g;

const replace_with_empty_text_pattern = /[']+|(?:_-)/g;

const title = inText
  .toLowerCase()
  .trim()
  .replace(pattern, "-")
  .replace(replace_with_empty_text_pattern, "")
  .replace(/-?\.htm/, ".htm");

const outText = [
  `${destinationPathPrefix}${title}`,
  "\n",
  `${destinationPathPrefix}chat-gpt${pathSeparator}${title}`,
  "\n",
  destinationPathPrefix,
  "\n",
  title,
];

const unixDestinationPreifx =
  process.env["UNIX_SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR"];

if (unixDestinationPreifx && existsSync(unixDestinationPreifx)) {
  outText.push(
    "\n",
    `${unixDestinationPreifx}/${title}`,
    "\n",
    `${unixDestinationPreifx}`,
  );
}

writeFileSync(outFile, outText.join("\n"));
