const buildMakeUser = require("./entity");

function makeUserDatabase(db) {
  const makeUser = buildMakeUser();

  async function create(user) {
    const result = await db.query(
      "INSERT INTO person (email, password) VALUES (%L, %L) RETURNING *",
      user.email,
      user.password
    );
    const createdUser = result.rows[0];
    return makeUser(createdUser);
  }

  async function getByEmail(email) {
    const result = await db.query(
      "SELECT * FROM person WHERE email = %L",
      email
    );
    const user = result.rows[0];
    return makeUser(user);
  }

  return Object.freeze({
    create,
    getByEmail,
  });
}

module.exports = makeUserDatabase;
