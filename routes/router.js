const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("", (req, res) => {
  res.render("home", {
    title: "Home page",
    user: req.user,
  });
});
//Login
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login with",
  });
});
//Logout
router.get("/auth/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});
//With google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);
//callback route
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/profile");
  }
);
module.exports = router;
