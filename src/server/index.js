// Set dotenv
require("dotenv").config();

const express = require("express");
const next = require("next");
const favicon = require("serve-favicon");

const path = require("path");

const { PORT, PRODUCTION } = require("./config");
const routes = require("./routes");

const NextJsApp = next({
  dev: !PRODUCTION,
  dir: path.resolve(__dirname, "../client"),
});

NextJsApp.prepare().then(() => {
  const server = express();

  // Set favicon
  server.use(favicon(path.resolve(__dirname, "../client/static/favicon.ico")));

  // Register routes
  server.use("/", routes(NextJsApp));

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
