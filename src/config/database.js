const mongoose = require("mongoose");
const { __MONGO_SRV__ } = require("../utils/vars");
const logger = require("../utils/logger");

const initDatabase = async () => {
  mongoose.connection
    .on("error", () => {
      logger.error(`MongoDB connection error!`);
    })
    .once("open", () => logger.info("Connected to the database!"));
  await mongoose.connect(__MONGO_SRV__, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

module.exports = initDatabase;
