const format = require("pg-format");
const bcrypt = require("bcrypt-nodejs");

const { executeQuery } = require("../../connection");

function insertPerson(username, email, password) {
  const query = format(
    "INSERT INTO person (username, email, password) VALUES (%L, %L, %L)",
    username,
    email,
    bcrypt.hashSync(password)
  );
  return executeQuery(query);
}

module.exports = {
  insertPerson,
};
