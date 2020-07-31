const express = require("express");
const app = express();
const port = 7000;
const path = require("path");
const viewsPath = path.join(__dirname, "./Templates/views");
const partialsPath = path.join(__dirname, "./Templates/partials");
const hbs = require("hbs");
const publicPath = path.join(__dirname, "./public");
const router = require("./routes/router");
const passportSetup = require("./config/passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const profileRoutes = require("./routes/profileRoutes");
require("./database");
//Set views engine
app.set("view engine", "hbs");
//Set static folder
app.use(express.static(publicPath));
//set custom views path
app.set("views", viewsPath);
//Register partials
hbs.registerPartials(partialsPath);
//use cookie session
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["Roundone"],
  })
);
//Initialize passport
app.use(passport.initialize());
app.use(passport.session());
//Use router
app.use(router);
//Profile router
app.use("/profile", profileRoutes);
app.get("/", router);

app.listen(port, () => console.log("Server lisening on " + port));
