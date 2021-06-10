const router = require("express").Router();
const authControllers = require("../../controllers/auth");

router.post("/login", [authControllers.postLogin]);
router.post("/register", [authControllers.postRegister]);

module.exports = router;
