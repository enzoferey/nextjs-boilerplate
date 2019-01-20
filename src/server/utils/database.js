const format = require("pg-format");

const { executeQuery } = require("../connection");

function getPersonId(email) {
  console.log("Get person id", email);
  const query = format("SELECT id FROM person WHERE email = %L", email);
  return executeQuery(query);
}

function deleteRow(table, column, id) {
  console.log("Deleting", id, "at", table);
  const deleteRow = format(
    "DELETE FROM " + table + " WHERE " + column + " = %L",
    id
  );
  return executeQuery(deleteRow);
}

module.exports = {
  getPersonId,
  deleteRow,
};
