const pg = require("pg");

const { PRODUCTION, DATABASE_URL } = require("./config");
const { initDatabase } = require("./database");

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  ssl: PRODUCTION, // allow ssl in production
});

let myClient;

function createDatabaseConnection() {
  pool.connect((err, client) => {
    if (err) console.log(err);

    myClient = client;

    initDatabase(myClient);
  });
}

function executeQuery(query) {
  return myClient.query(query);
}

module.exports = {
  createDatabaseConnection,
  executeQuery,
};
