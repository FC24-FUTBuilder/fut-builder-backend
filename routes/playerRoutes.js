const express = require("express");
const router = express.Router();

const {
  listPlayers,
  getPlayerDetails,
} = require("../controller/playerController");

router.get("/list", listPlayers);
router.get("/playerdetails", getPlayerDetails);

module.exports = router;
