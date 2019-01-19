const createRouter = require("express").Router;

// External interface
let app;
const router = createRouter();
const initRoutes = targetApp => {
  app = targetApp;
  return router;
};
module.exports = initRoutes;

router.get("*", (req, res) => {
  app.render(req, res, "/");
});