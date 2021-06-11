const router = require("express").Router();
const jwtAuthz = require("express-jwt-authz");
const apiV1 = require("./v1");
const checkJwt = require("../middleware/checkJwt");

const checkScopes = jwtAuthz(["read:userInteger", "write:userInteger"]);

// all the routes are protected
router.use("/v1", [checkJwt, checkScopes, apiV1]);

module.exports = router;
