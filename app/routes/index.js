const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.post("/person", controller.createUser);
router.get("/people", controller.findAllPeople);
router.get("/person/:first/:last", controller.findPersonByName);

/* Import data to db using this call */
router.post("/csv", controller.parseCsv);

module.exports = router;
