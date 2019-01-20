const format = require("pg-format");

function initDatabase(myClient) {
  // Drop tables for testing
  const dropTables = format("DROP TABLE IF EXISTS session, person");
  myClient.query(dropTables, err => {
    if (err) console.log(err);
    console.log("> tables droped\n");
  });

  // Create session table
  const createTableSession = format(
    "CREATE TABLE IF NOT EXISTS session (" +
      "id SERIAL," +
      "email varchar NOT NULL," +
      "token varchar NOT NULL UNIQUE," +
      "PRIMARY KEY (id))"
  );
  myClient.query(createTableSession, err => {
    if (err) console.log(err);
    console.log("> table SESSION created");
  });

  // Create person table
  const createTablePersons = format(
    "CREATE TABLE IF NOT EXISTS person (" +
      "id SERIAL," +
      "username varchar NOT NULL," +
      "email varchar NOT NULL UNIQUE," +
      "password varchar NOT NULL," +
      "PRIMARY KEY (id))"
  );
  myClient.query(createTablePersons, err => {
    if (err) console.log(err);
    console.log("> table PERSON created");
  });
}

module.exports = {
  initDatabase,
};
