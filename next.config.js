const path = require("path");
const Dotenv = require("dotenv-webpack");

const withSass = require("@zeit/next-sass");

module.exports = withSass({
  useFileSystemPublicRoutes: false,
  webpack: (config, { dev, isServer }) => {
    // Add aliases for imports
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        components: path.resolve(__dirname, "src/client/components/"),
        images: path.resolve(__dirname, "src/client/images/"),
        layouts: path.resolve(__dirname, "src/client/layouts/"),
        pages: path.resolve(__dirname, "src/client/pages/"),
        "@config": path.resolve(__dirname, "src/client/config.js"),
        "@globals": path.resolve(__dirname, "src/client/globals.js"),
      },
    };

    // Add .env variables
    config.plugins.push(new Dotenv());

    return config;
  },
});
