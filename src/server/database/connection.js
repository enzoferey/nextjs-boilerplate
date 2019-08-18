const pg = require("pg");
const format = require("pg-format");

const { PRODUCTION, DATABASE_URL } = require("../config");

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  ssl: PRODUCTION, // allow ssl in production
});

async function executeQuery(query, ...args) {
  const client = await pool.connect();
  try {
    const parsedQuery = format(query, ...args);
    return client.query(parsedQuery);
  } catch (error) {
    console.log("[ERROR] executeQuery:", error);
  } finally {
    client.release();
  }
}

module.exports = () =>
  Object.freeze({
    query: executeQuery,
  });
