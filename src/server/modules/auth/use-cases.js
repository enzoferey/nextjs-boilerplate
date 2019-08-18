const buildMakeUser = require("./entity");

const buildCheckCredentials = (userDatabase, comparePassword) => async (
  email,
  password
) => {
  try {
    const user = await userDatabase.getByEmail(email);

    return comparePassword(password, user.password);
  } catch {
    return false;
  }
};

const buildCreateUser = userDatabase => async (email, password) => {
  const makeUser = buildMakeUser();

  try {
    const user = makeUser({ email, password });

    const createdUser = await userDatabase.create(user);

    return createdUser;
  } catch {
    return undefined;
  }
};

module.exports = {
  buildCheckCredentials,
  buildCreateUser,
};
