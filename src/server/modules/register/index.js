const database = require("./database");
const { createNewSession } = require("../session");

async function register(res, username, email, password) {
  try {
    await database.insertPerson(username, email, password);

    const token = await createNewSession(email);

    res.status(200);
    res.send({ data: token });
  } catch (error) {
    res.status(400);
    res.send(`Email ${email} is already in use`);
  }
}

module.exports = {
  register,
};
