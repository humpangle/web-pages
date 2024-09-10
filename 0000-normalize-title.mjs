#!/bin/env node

import { readFileSync, writeFileSync, existsSync } from "fs";
import { sep } from "path";

let destinationPathPrefix = process.env["SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR"];

if (!destinationPathPrefix) {
  throw new Error(
    `"SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR" environment variable is required and must exist.
      "UNIX_SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR" environment variable is optional.
      "PATH_SEPARATOR_SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR" environment variable is recommended on Windows OS.

      Example for a windows machine:
      export SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR='C:\\0000-shared\\web-pages'
      export PATH_SEPARATOR_SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR="\\\\" `,
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

const replace_with_empty_text_pattern = /[🐾.'…$]+|(?:_-)|-$/g;

const title = inText
  .toLowerCase()
  .trim()
  .replace(pattern, "-")
  .replace(replace_with_empty_text_pattern, "")
  .replace(/-?\.htm/, ".htm");

const now = (new Date().toJSON()).replace(/[:.T]/g, '-') // 2024-09-10-02-07-33-908Z
const titlePrefixedByDate = `${now}-${title}`

const outText = [
  `${destinationPathPrefix}${titlePrefixedByDate}`,
  "\n",
  `${destinationPathPrefix}chat-gpt${pathSeparator}${titlePrefixedByDate}`,
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
    `${unixDestinationPreifx}/${titlePrefixedByDate}`,
    "\n",
    `${unixDestinationPreifx}`,
  );
}

writeFileSync(outFile, outText.join("\n"));
