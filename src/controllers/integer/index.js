const User = require("../../models/User");

const getCurrent = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { userInteger } = await User.findById(id);
    res.json({ userInteger });
  } catch (err) {
    next(err);
  }
};

const putCurrent = async (req, res, next) => {
  try {
    const { id, newInteger } = req.body;
    const { userInteger } = await User.findByIdAndUpdate(
      id,
      {
        $set: { userInteger: newInteger },
      },
      { new: true }
    );
    res.json({ userInteger });
  } catch (err) {
    next(err);
  }
};

const getNext = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { userInteger } = await User.findByIdAndUpdate(
      id,
      {
        $inc: { userInteger: 1 },
      },
      { new: true }
    ).exec();

    res.json({ userInteger });
  } catch (err) {
    next(err);
  }
  res.json({ route: "/next", protected: true, method: "GET" });
};

module.exports = {
  getCurrent,
  putCurrent,
  getNext,
};
