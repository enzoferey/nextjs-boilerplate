const PRODUCTION = process.env.NODE_ENV === "production";

if (!PRODUCTION) {
  require("dotenv").config();
}

module.exports.PRODUCTION = PRODUCTION;

module.exports.PORT = parseInt(process.env.PORT, 10) || 3000;

module.exports.DATABASE_URL = process.env.DATABASE_URL;

module.exports.JWT_KEY = process.env.JWT_KEY || "jwt-key";
