const format = require("pg-format");
const bcrypt = require("bcrypt-nodejs");

const { executeQuery } = require("../../connection");
const { deleteRow } = require("../../utils/database");

function getSession(email) {
  const query = format("SELECT * FROM session WHERE email = %L", email);
  return executeQuery(query);
}

function insertSession(email, token) {
  const query = format(
    "INSERT INTO session (email, token) VALUES (%L, %L)",
    email,
    bcrypt.hashSync(token)
  );
  return executeQuery(query);
}

function deleteSession(email) {
  return deleteRow("session", "email", email);
}

module.exports = {
  getSession,
  insertSession,
  deleteSession,
};
