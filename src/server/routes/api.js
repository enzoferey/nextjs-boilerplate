const createRouter = require("express").Router;
const router = createRouter();

const {
  doLoginController,
  createUserController,
  verifyAuthController,
} = require("../modules/auth");

// External interface
let db;
const initRoutes = targetDb => {
  db = targetDb;

  // Routes
  router.post("/login", doLoginController(db));
  router.post("/register", createUserController(db));

  return router;
};
module.exports = initRoutes;
