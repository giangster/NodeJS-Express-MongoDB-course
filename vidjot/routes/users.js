const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

module.exports = router;

//User login route
router.get("/login", (req, res) => {
  res.render("users/login");
});

//User register route
router.get("/register", (req, res) => {
  res.render("users/register");
});
