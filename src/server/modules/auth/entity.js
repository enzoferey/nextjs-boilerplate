const buildMakeUser = () => ({ email, password }) => {
  if (!email) {
    throw new Error("User must have an email.");
  }
  if (!password) {
    throw new Error("User must have a password.");
  }

  return Object.freeze({
    email,
    password,
    toJson: () => {
      return { email, password };
    },
  });
};

module.exports = buildMakeUser;
