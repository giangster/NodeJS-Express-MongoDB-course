const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");

module.exports = router;

//Load Idea Model
require("../models/User");
const User = mongoose.model("users");

//User login route
router.get("/login", (req, res) => {
  res.render("users/login");
});

//User register route
router.get("/register", (req, res) => {
  res.render("users/register");
});

//Login form POST
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/ides",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

//Register form POST
router.post("/register", (req, res) => {
  let errors = [];

  if (req.body.password !== req.body.password2) {
    errors.push({ text: "Password do not match" });
  }

  if (req.body.password.length < 4) {
    errors.push({ text: "Password must be at least 4 characters" });
  }

  if (errors.length > 0) {
    res.render("users/register", {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        req.flash(
          "error_msg",
          "There is already a user with that email. Please log in."
        );
        res.redirect("/users/login");
      } else {
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        };

        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) throw err;
            newUser.password = hash;
            new User(newUser).save().then(user => {
              req.flash("success_msg", "Registration completed. Please log in");
              res.redirect("/users/login").catch(err => console.log(err));
            });
          });
        });
      }
    });
  }
});
