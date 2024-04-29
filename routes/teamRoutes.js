const express = require("express");
const router = express.Router();

const { createTeam, getTeam } = require("../controller/teamController.js");

router.post("/create", createTeam);
router.get("/get", getTeam);

module.exports = router;
