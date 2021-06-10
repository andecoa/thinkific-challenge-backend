// handle JWT validation or invalidation here

const jwt = require("jsonwebtoken");
const { __ACCESS_TOKEN_SECRET__ } = require("./vars");

const createAccessToken = (id) => jwt.sign({ id }, __ACCESS_TOKEN_SECRET__);

const validateAccessToken = (accessToken) =>
  jwt.verify(accessToken, __ACCESS_TOKEN_SECRET__);

// access tokens that expire and refresh tokens are out of scope for this project...

// stub for refresh token creation
// stub for refresh token validation

module.exports = {
  createAccessToken,
  validateAccessToken,
};
