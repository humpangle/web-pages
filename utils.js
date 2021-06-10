const fs = require("fs");
const path = require("path");

const pagesPath = path.resolve(__dirname, "pages");
const pages = path.parse(pagesPath);

for (const file of fs.readdirSync(pagesPath)) {
  const newFileName = file
    .toLowerCase()
    .replace(/[\s()'&\.,…]/g, "-")
    .replace("html", "html");

  const oldPath = `${pagesPath}/${file}`;
  const newPath = `${pagesPath}/${newFileName}`;
  console.log(newPath);
  fs.renameSync(oldPath, newPath);
}
