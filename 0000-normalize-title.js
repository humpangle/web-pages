const fs = require("fs");

const inFile = ".___scratch.in.txt";
const outFile = ".___scratch.out.txt";

let inText = fs.readFileSync(inFile, { encoding: "utf8" });

pattern = /[,\s()-]+|(?:_-)/g;

inText = inText.toLowerCase().trim().replace(pattern, "-");

fs.writeFileSync(outFile, inText)
