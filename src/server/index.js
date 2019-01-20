// Set dotenv
require("dotenv").config();

const express = require("express");
const next = require("next");
const favicon = require("serve-favicon");
const cors = require("cors");
const bodyParser = require("body-parser");

const path = require("path");

const { PORT, PRODUCTION } = require("./config");

const apiRoutes = require("./routes/api");
const clientRoutes = require("./routes/client");

const internalErrorMiddleware = require("./middlewares/internalError");

const { createDatabaseConnection } = require("./connection");

// Create dabatase connection
createDatabaseConnection();

// Prepare NextjsApp
const NextJsApp = next({
  dev: !PRODUCTION,
  dir: path.resolve(__dirname, "../client"),
});

NextJsApp.prepare().then(() => {
  const server = express();

  // Set favicon
  server.use(favicon(path.resolve(__dirname, "../client/static/favicon.ico")));

  // Set middlewares
  server.use(cors());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(internalErrorMiddleware()); // Implement res.sendInternalError

  // Register API routes
  server.use("/", apiRoutes());

  // Register client routes
  server.use("/", clientRoutes(NextJsApp));

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
