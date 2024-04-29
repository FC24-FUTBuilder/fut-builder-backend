const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  listUsers,
  updateUser,
} = require("../controller/userController.js");

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/list", listUsers);
router.post("/update", updateUser);

module.exports = router;
