const fs = require("fs");
const path = require("path");

const getPathsObject = require("./utils/getPathsObject");
const formatDate = require("./utils/formatDate");

// ROBOTS.txt
const robotsTxt = `User-agent: *
Disallow:`;

fs.writeFileSync(
  path.join(__dirname, "../src/server/public/robots.txt"),
  robotsTxt
);
console.log("robots.txt saved!");

/*
// SITEMAP.XML
const pathsObj = getPathsObject();
const today = formatDate(new Date());
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  ${Object.keys(pathsObj).map(
    path => `<url>
    <loc>https://worlds.victoryroadvgc.com${path}</loc>
    <lastmod>${
      pathsObj[path].lastModified
        ? formatDate(new Date(pathsObj[path].lastModified))
        : today
    }</lastmod>
  </url>`
  )}
</urlset>`;

fs.writeFileSync(
  path.join(__dirname, "../src/server/public/sitemap_local.xml"),
  sitemapXml
);
console.log("sitemap_local.xml saved!");
*/
