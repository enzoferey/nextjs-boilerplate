const { buildCheckCredentials, buildCreateUser } = require("./use-cases");

const buildDoLoginController = (
  userDatabase,
  comparePassword,
  createToken
) => async (req, res) => {
  const { email, password } = req.body;

  const checkCredentials = buildCheckCredentials(userDatabase, comparePassword);
  const validCredentials = await checkCredentials(email, password);

  if (validCredentials) {
    const token = createToken({ user: { email } });
    return res.send({ data: token });
  } else {
    return res.status(401).send({ error: "Invalid login credentials" });
  }
};

const buildCreateUserController = (userDatabase, hashPassword) => async (
  req,
  res
) => {
  const { email, password } = req.body;

  const createUser = buildCreateUser(userDatabase);
  const createdUser = await createUser(email, hashPassword(password));

  if (createdUser) {
    return res.send({ data: createdUser.toJson() });
  } else {
    return res.status(400).send({ error: "Invalid user data" });
  }
};

const buildVerifyAuthController = verifyToken => (req, res, next) => {
  if (!req.token) {
    return res.status(401).send({ error: "No token" });
  }

  try {
    verifyToken(req.token);
    next();
  } catch (error) {
    return res.status(401).send({ error: "Token not valid" });
  }
};

module.exports = {
  buildDoLoginController,
  buildCreateUserController,
  buildVerifyAuthController,
};
