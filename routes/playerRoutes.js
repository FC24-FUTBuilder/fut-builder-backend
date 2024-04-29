const express = require("express");
const router = express.Router();

const {
  getPlayerDetails,
  listPlayers,
  editPlayerDetails,
  deletePlayerDetails,
} = require("../controller/playerController");

router.get("/list", listPlayers);
router.get("/playerdetails", getPlayerDetails);
router.post("/edit", editPlayerDetails);
router.delete("/delete", deletePlayerDetails);

module.exports = router;
