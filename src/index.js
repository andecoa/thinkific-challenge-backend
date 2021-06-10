const app = require("./app");
const initDatabase = require("./config/database");
const logger = require("./utils/logger");
const { __PORT__ } = require("./utils/vars");

app.listen(__PORT__, async () => {
  try {
    await initDatabase();
    logger.info(`Started app on port ${__PORT__}`);
  } catch (err) {
    logger.error(err);
  }
});
