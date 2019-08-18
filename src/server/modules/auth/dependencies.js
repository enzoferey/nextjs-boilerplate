const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_KEY } = require("../../config");

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function createToken(payload) {
  return jwt.sign(payload, JWT_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, JWT_KEY);
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
};
