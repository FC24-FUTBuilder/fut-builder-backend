const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  listUsers,
} = require("../controller/userController.js");

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/list", listUsers);

module.exports = router;
