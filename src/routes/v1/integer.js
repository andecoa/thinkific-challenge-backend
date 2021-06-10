const router = require("express").Router();
const integerControllers = require("../../controllers/integer");

router.get("/current", [integerControllers.getCurrent]);
router.put("/current", [integerControllers.putCurrent]);
router.get("/next", [integerControllers.getNext]);

module.exports = router;
