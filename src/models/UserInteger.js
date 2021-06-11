const mongoose = require("mongoose");

const UserIntegerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model("UserInteger", UserIntegerSchema);
