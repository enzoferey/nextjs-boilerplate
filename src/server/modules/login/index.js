const bcrypt = require("bcrypt-nodejs");

const database = require("./database");
const { createNewSession } = require("../session");

async function login(res, email, password) {
  function personNotFound() {
    res.status(400);
    res.send({ data: "Email doesn't exist" });
  }

  function wrongCredentials() {
    res.status(401);
    res.send({ data: "Email and password don't match" });
  }

  async function correctCredentials() {
    const token = await createNewSession(email);

    res.status(200);
    res.send({ data: token });
  }

  try {
    const persons = await database.getPerson(email);

    const personExists = persons.rows.length > 0;
    if (personExists) {
      const person = persons.rows[0];
      const success = bcrypt.compareSync(password, person.password);

      if (success) {
        correctCredentials();
      } else {
        wrongCredentials();
      }
    } else {
      personNotFound();
    }
  } catch (error) {
    console.log(error);
    res.sendInternalError("");
  }
}

module.exports = {
  login,
};
