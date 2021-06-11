const router = require("express").Router();
const userInteger = require("../../controllers/userInteger");

router.get("/current", [userInteger.getCurrent]);
router.put("/current", [userInteger.setCurrent]);
router.get("/next", [userInteger.getNext]);

module.exports = router;
