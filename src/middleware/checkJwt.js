const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { __AUTH0_DOMAIN__, __AUTH0_IDENTIFIER__ } = require("../utils/vars");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${__AUTH0_DOMAIN__}.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: __AUTH0_IDENTIFIER__,
  issuer: __AUTH0_DOMAIN__,
  algorithms: ["RS256"],
});

module.exports = checkJwt;
