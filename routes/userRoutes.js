const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../controller/userController.js");

router.post("/create", createUser);
router.post("/login", loginUser);

module.exports = router;
