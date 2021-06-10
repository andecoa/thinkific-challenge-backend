const router = require("express").Router();
const authRoute = require("./auth");
const integerRoute = require("./integer");
const authenticator = require("../../middleware/authenticator");

router.use("/auth", [authRoute]);

// this is not semantic because of the challenge requirements
// we also have to make this a protected route
router.use("/", [authenticator, integerRoute]);

module.exports = router;
