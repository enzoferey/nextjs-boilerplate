const createRouter = require("express").Router;
const router = createRouter();

const { login } = require("../modules/login");
const { register } = require("../modules/register");
const { checkSession } = require("../modules/session");

// Login
router.get("/api/login", (req, res) => {
  console.log("Login", req.query);

  const { email, password } = req.query;
  login(res, email, password);
});

// Register
router.post("/api/register", (req, res) => {
  console.log("Register", req.body);

  const { username, email, password } = req.body;
  register(res, username, email, password);
});

// Session
router.post("/api/session", (req, res) => {
  console.log("Session", req.body);

  const { email, token } = req.body;
  checkSession(res, email, token);
});

module.exports = () => router;
