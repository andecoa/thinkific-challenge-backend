const UserInteger = require("../models/UserInteger");
const { BadRequest, UnprocessibleEntry } = require("../utils/clientErrors");

// note: input validations and services are here for conciseness

const getCurrent = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throw BadRequest("Missing 'email' field");

    const userInteger = await UserInteger.findOne({ email });
    res.json({ value: userInteger?.value || 0 });
  } catch (err) {
    next(err);
  }
};

const setCurrent = async (req, res, next) => {
  try {
    const { email, newInteger } = req.body;

    if (!email || !newInteger)
      throw BadRequest("Missing 'email' or 'newInteger' field");
    if (!Number.isInteger(newInteger) || newInteger < 0)
      throw UnprocessibleEntry("`newInteger` should be a non-negative number");

    const userInteger = await UserInteger.findOneAndUpdate(
      { email },
      {
        $set: { value: newInteger },
      },
      {
        upsert: true,
        new: true,
      }
    );
    res.json({ value: userInteger.value });
  } catch (err) {
    next(err);
  }
};

const getNext = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throw BadRequest("Missing 'email' field");

    const userInteger = await UserInteger.findOneAndUpdate(
      { email },
      {
        $inc: { value: 1 },
      },
      { new: true, upsert: true }
    );
    res.json({ value: userInteger.value });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCurrent,
  setCurrent,
  getNext,
};
