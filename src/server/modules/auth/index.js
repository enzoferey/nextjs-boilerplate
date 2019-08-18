const {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
} = require("./dependencies");
const makeUserDatabase = require("./database");
const {
  buildDoLoginController,
  buildCreateUserController,
  buildVerifyAuthController,
} = require("./controllers");

const userControllerWithDb = (buildController, ...args) => db => {
  const userDatabase = makeUserDatabase(db);
  return buildController(userDatabase, ...args);
};

const doLoginController = userControllerWithDb(
  buildDoLoginController,
  comparePassword,
  createToken
);

const createUserController = userControllerWithDb(
  buildCreateUserController,
  hashPassword
);

const verifyAuthController = () => buildVerifyAuthController(verifyToken);

module.exports = {
  doLoginController,
  createUserController,
  verifyAuthController,
};
