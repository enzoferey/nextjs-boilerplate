module.exports = {
  useFileSystemPublicRoutes: false,
  webpack: (config, { dev }) => {
    if (dev) {
      const Dotenv = require("dotenv-webpack");
      // Add .env variables
      config.plugins.push(new Dotenv());
    }

    return config;
  },
};
