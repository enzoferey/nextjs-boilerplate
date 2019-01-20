const format = require("pg-format");

const { executeQuery } = require("../../connection");

function getPerson(email) {
  const query = format("SELECT * FROM person WHERE email = %L", email);
  return executeQuery(query);
}

module.exports = {
  getPerson,
};
