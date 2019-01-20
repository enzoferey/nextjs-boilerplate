const crypto = require("crypto");

function generateSessionToken() {
  const buffer = crypto.randomBytes(48);
  const token = buffer.toString("hex");

  return token;
}

module.exports = {
  generateSessionToken,
};
