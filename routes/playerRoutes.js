const express = require("express");
const router = express.Router();

const {
  getPlayerDetails,
  listPlayers,
  editPlayerDetails,
} = require("../controller/playerController");

router.get("/list", listPlayers);
router.get("/playerdetails", getPlayerDetails);
router.post("/edit", editPlayerDetails);

module.exports = router;
