#!/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { isAbsolute, sep } from "path";

const destinationPathPrefixHelpText = `
  The following environment variables are not required when using -f option:
    "SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR" environment variable is required and must exist.
    "UNIX_SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR" environment variable is optional.
    "PATH_SEPARATOR_SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR" environment variable is recommended on Windows OS.

    Example for a windows machine:
    export SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR='C:\\0000-shared\\web-pages'
    export PATH_SEPARATOR_SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR="\\\\" `

if ((process.argv[2] || "").trim() === "-h") {
  const helpText =
    `Place in file ".___scratch.in.txt" text of following format:
    ============================================================================
        -d sub/directory/path
        -f /full/directory/path
        Page Title
    ============================================================================

    Note that -f and -d are mutually exclusive. If both are specified, -f will win and -d will be ignored.
    ${destinationPathPrefixHelpText}`

  console.log(helpText)
  process.exit()
}

const pathSeparator =
  process.env["PATH_SEPARATOR_SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR"] || sep;

const inFile = ".___scratch.in.txt";
const outFile = ".___scratch.out.txt";
const readFileText = readFileSync(inFile, { encoding: "utf8" }).trim();

const parseResult = parseArgs(readFileText)
const parsedArgs = parseResult[0]
let inText = parseResult[1]

const fullDirPath = parsedArgs.fullDirPath
let destinationPathPrefix

if (fullDirPath) {
  destinationPathPrefix = fullDirPath
} else {
  let dirPath = parsedArgs.dirPath

  destinationPathPrefix = process.env["SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR"];

  if (!destinationPathPrefix) {
    throw new Error(destinationPathPrefixHelpText);
  }

  destinationPathPrefix =
    destinationPathPrefix.replace(/[\/]$/, "") + pathSeparator;

  if (dirPath) {
    destinationPathPrefix += dirPath + pathSeparator
  }
}

mkdirSync(destinationPathPrefix, { recursive: true })

const pattern = /[”“`⧸\\/\[\]|｜,’\s:()-]+/g;

const replace_with_empty_text_pattern = /[🐾.'…$]+|(?:_-)|-$/g;

const title = inText
  .toLowerCase()
  .trim()
  .replace(pattern, "-")
  .replace(replace_with_empty_text_pattern, "")
  .replace(/-?\.htm/, ".htm");

const now = (new Date().toJSON()).replace(/[:.T]/g, '-') // 2024-09-10-02-07-33-908Z
const titlePrefixedByDate = `${now}-${title}`.replace(/-$/g, "")

const outText = [
  `${destinationPathPrefix}${titlePrefixedByDate}`,
  "\n",
  `${destinationPathPrefix}chat-gpt${pathSeparator}${titlePrefixedByDate}`,
  "\n",
  destinationPathPrefix,
  "\n",
  title,
];

const unixDestinationPrefix =
  process.env["UNIX_SINGLE_FILE_WEB_PAGES_DOWNLOAD_DIR"];

if (unixDestinationPrefix && existsSync(unixDestinationPrefix)) {
  outText.push(
    "\n",
    `${unixDestinationPrefix}/${titlePrefixedByDate}`,
    "\n",
    `${unixDestinationPrefix}`,
  );
}

writeFileSync(outFile, outText.join("\n"));

function parseArgs(stringArgs) {
  const allArgs = stringArgs.split("\n")
  const result = {}
  let line

  while (allArgs.length > 1) {
    line = allArgs[0].trim().split(/[ ]+/)

    switch (line[0].trim()) {
      case "-d":
        {
          const dirPath = (line[1] || "").trim()

          if (dirPath !== "") {
            result.dirPath = dirPath.replace(new RegExp(`${pathSeparator}\$`), "")
          }

          allArgs.shift()
        }
        break;


      case "-f":
        {
          const fullDirPath = (line[1] || "").trim()

          if (fullDirPath !== "" && isAbsolute(fullDirPath)) {
            result.fullDirPath = fullDirPath.replace(new RegExp(`${pathSeparator}\$`), "")
          }

          allArgs.shift()
        }
        break;

      default:
        allArgs.shift()
        break;
    }
  }

  return [result, allArgs[0]]
}
