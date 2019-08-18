const createRouter = require("express").Router;
const router = createRouter();

// External interface
let app;
const initRoutes = targetApp => {
  app = targetApp;

  // Routes
  // -- Declare client routes here !!! --
  router.get("*", (req, res) => {
    app.render(req, res, "/");
    return;
  });

  return router;
};
module.exports = initRoutes;
