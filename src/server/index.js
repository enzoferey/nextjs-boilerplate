const path = require("path");
const express = require("express");
const next = require("next");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const favicon = require("serve-favicon");

const { PRODUCTION, PORT } = require("./config");

const languageMiddleware = require("./middlewares/language");
const forceHttpsMiddleware = require("./middlewares/forceHttps");

const apiRoutes = require("./routes/api");
const clientRoutes = require("./routes/client");

const connectDb = require("./database/connection");

// Initialisations
const db = connectDb();
const NextJsApp = next({
  dev: !PRODUCTION,
  dir: path.resolve(__dirname, "../client/"),
});

NextJsApp.prepare().then(() => {
  const server = express();

  // Middlewares
  server.use(cors());
  server.use(express.json()); // parse POST body
  server.use(bearerToken()); // parse Bearer Token
  server.use(languageMiddleware()); // parse locale
  server.use(forceHttpsMiddleware()); // force https redirects
  server.use(favicon(path.join(__dirname, "./public/favicon.ico"))); // favicon
  server.use(express.static(path.join(__dirname, "./public/"))); // static folder

  // API routes
  server.use("/api", apiRoutes(db));

  // Frontend routes
  server.use("/", clientRoutes(NextJsApp));

  server.listen(PORT, error => {
    if (error) throw error;
    console.log(`> App listening on port ${PORT}`);
  });
});
