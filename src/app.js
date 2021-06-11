const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const handleErrors = require("./middleware/handleErrors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", routes);

// all errors thrown by the routes above will be caught in this "middleware"
app.use("/", handleErrors);

// handle routes that are not found
app.use((req, res) => {
  res.json({
    error: {
      message: "route not found",
      status: 404,
    },
  });
});

module.exports = app;
