const pino = require("pino");
const { __NODE_ENV__ } = require("./vars");

const logger = pino(
  __NODE_ENV__ === "dev" && {
    prettyPrint: { colorize: true, ignore: "pid,hostname" },
  }
);

module.exports = logger;
