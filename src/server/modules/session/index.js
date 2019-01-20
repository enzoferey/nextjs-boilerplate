const bcrypt = require("bcrypt-nodejs");

const database = require("./database");

const { generateSessionToken } = require("./utils");

async function createNewSession(email) {
  await database.deleteSession(email);

  const token = generateSessionToken();

  await database.insertSession(email, token);

  return token;
}

async function checkSession(res, email, token) {
  function sessionNotFound() {
    res.status(400);
    res.send({ data: null });
  }

  async function wrongToken() {
    await database.deleteSession(email);

    res.status(401);
    res.send({ data: null });
  }

  async function correctToken() {
    res.status(200);

    const token = generateSessionToken();

    await database.deleteSession(email);
    await database.insertSession(email, token);

    res.send({ data: token });
  }

  try {
    const result = await database.getSession(email);
    const sessionExists = result.rows.length > 0;
    if (sessionExists) {
      const session = result.rows[0];
      const success = bcrypt.compareSync(token, session.token);

      if (success) {
        correctToken();
      } else {
        wrongToken();
      }
    } else {
      sessionNotFound();
    }
  } catch (error) {
    console.log(error);
    res.sendInternalError("");
  }
}

module.exports = {
  createNewSession,
  checkSession,
};
