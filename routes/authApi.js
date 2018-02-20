/**
 * @author     : Thiago Lima <thiagolimasp@live.com>
 * @module     : App { server }
 * @description: Authentication API goes here for creating,
 * editing and hitting the auth API endpoint, here we're using
 * JWT passport strategy to provide a JWT token for registered users.
 */

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("../config/database");
const User = require("../models/user");
const Stores = require("../models/stores");
const getToken = require("./utilApi");
const jwt = require("jwt-simple");
const app = express();

app.use(passport.initialize());

require("../config/passport")(passport);

module.exports = app => {
  const authApiRoutes = express.Router();
  const authGuard = passport.authenticate("jwt", { session: false });

  // connect the api routes under /api/*
  app.use("/api", authApiRoutes);

  // api routes
  authApiRoutes.post("/authenticate", userAuth);
  authApiRoutes.get("/memberinfo", authGuard, memberInfo);


  // route to authenticate a user (POST /api/authenticate)
  function userAuth(req, res) {
    const promise = User.findOne({ username: req.body.username });
    promise
      .then(user => {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            let token = jwt.encode(user, config.secret);
            res.status(200).json({ success: true, token: "JWT " + token });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }
        });
      })
      .catch(err => {
        res.status(401).json({
          success: false,
          msg: "Authentication failed. User not found."
        });
      });
  }

  // route to a restricted info (GET /api/memberinfo)
  function memberInfo(req, res) {
    let token = getToken(req.headers);
    if (token) {
      let decoded = jwt.decode(token, config.secret);
      const promise = User.findOne({ username: decoded.username });
      promise
        .then(user => {
          res
            .status(200)
            .json("Welcome in the member area " + user.username + "!");
        })
        .catch(err => {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. User not found."
          });
        });
    } else {
      res.status(401).send({ success: false, msg: "No token provided." });
    }
  }
};
