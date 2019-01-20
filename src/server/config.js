module.exports.PORT = parseInt(process.env.PORT, 10) || 3000;

module.exports.PRODUCTION = process.env.NODE_ENV === "production";

module.exports.DATABASE_URL = process.env.DATABASE_URL;
