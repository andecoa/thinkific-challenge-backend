const User = require("../../models/User");
const token = require("../../utils/token");

const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const userJSON = user.toJSON();
    userJSON.accessToken = token.createAccessToken(user.id);
    res.json(userJSON);
  } catch (err) {
    next(err);
  }
};

const postRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const userJSON = user.toJSON();
    userJSON.accessToken = token.createAccessToken(user.id);
    res.status(201).json(userJSON);
  } catch (err) {
    next(err);
  }
};

// postLogout should be handled by the client since no tokens/sessions are being stored in the server
// stub for logout when we have refresh tokens (which are out of scope)

module.exports = {
  postLogin,
  postRegister,
};
