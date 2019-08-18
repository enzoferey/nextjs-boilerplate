const fs = require("fs");
const path = require("path");

module.exports = () => {
  const fileObj = {};

  const walkSync = dir => {
    // Get all files of the current directory & iterate over them
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      // Construct whole file-path & retrieve file's stats
      const filePath = `${dir}/${file}`;
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        // Recurse one folder deeper
        walkSync(`${filePath}/`);
      } else {
        // Construct this file's pathname excluding the "pages" folder & its extension
        const cleanFileName = filePath
          .substr(filePath.lastIndexOf("/") + 1) // keep only the page file
          .substr(0, filePath.lastIndexOf(".")) // remove extension
          .replace("index", "")
          .replace(".tsx", "");

        if (cleanFileName.indexOf("_") === 0) {
          return;
        }

        // Add this file to `fileObj`
        fileObj[`/${cleanFileName}`] = {
          page: `${cleanFileName}`,
          lastModified: fileStat.mtime,
        };
      }
    });
  };

  // Start recursion to fill `fileObj`
  walkSync(path.join(__dirname, "../../src/client/pages"));

  return fileObj;
};
