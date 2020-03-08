const env = require("yeoman-environment").createEnv();

env.register(require.resolve("./generators/app"), "app");
env.register(require.resolve("./generators/plugin"), "plugin");

module.exports = env;
