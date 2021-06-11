const router = require("express").Router();
const apiV1 = require("./v1");
const checkJwt = require("../middleware/checkJwt");

// all the routes are protected
router.use("/v1", [checkJwt, apiV1]);

module.exports = router;
