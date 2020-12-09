const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.post("/person", controller.createUser);

router.get("/people", controller.findAllPeople);

router.get("/person/:first/:last", controller.findPersonByName);

// router.get("/person/:last", controller.findPersonByLastName);

router.post("/csv", controller.parseCsv);

module.exports = router;
