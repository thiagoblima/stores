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
const jwt = require("jwt-simple");
const app = express();


app.use(passport.initialize());

require("../config/passport")(passport);

module.exports = app => {
  const authApiRoutes = express.Router();

  // connect the api routes under /api/*
  app.use("/api", authApiRoutes);

  /**
   * @function: getToken()
   * @param: headers
   * @prop: authorization
   * @description: getting headers for JWT token
   */

  const getToken = headers => {
    if (headers && headers.authorization) {
      let parted = headers.authorization.split(" ");
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  // create a new user account (POST http://localhost:3000/api/signup)
  authApiRoutes.post("/signup", (req, res) => {
    if (!req.body.username || !req.body.password) {
      res
        .status(401)
        .json({ success: false, msg: "Please fill out the complete form." });
    } else {
      let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        file: req.body.file,
        path: req.body.path
      });

      // save the user
      newUser.save(err => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, msg: "Username already exists." });
        }
        res
          .status(200)
          .json({ success: true, msg: "Successful created new user." });
      });

      // send email to be confirmed by the new user

      const transporter = nodemailer.createTransport({
      //service: 'gmail' is totally possible too
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "pqezz4q627sr4akk@ethereal.email",
          pass: "AxhqV2yKqQqy7NEKN8"
        }
      });
  
      let mailOptions = {
        to: req.body.email,
        subject: "Stores Email Confirmation ✔",
        text: "Welcome, dear" + req.body.firstname,
        html:
          "<p><b>Hello</b> " + req.body.firstname + ",</p>" +
          "<p>We just want to confirm that you've just registered your Stores account with the email: " +
          req.body.email + "</p>."
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
    }
  });

  // route to authenticate a user (POST /api/authenticate)
  authApiRoutes.post("/authenticate", (req, res) => {
    User.findOne(
      {
        username: req.body.username
      },
      (err, user) => {
        if (err) throw err;

        if (!user) {
          res.status(401).json({
            success: false,
            msg: "Authentication failed. User not found."
          });
        } else {
          // check if password matches
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.encode(user, config.secret);
              // return the information including token as JSON
              res.status(200).json({ success: true, token: "JWT " + token });
            } else {
              res.status(401).send({
                success: false,
                msg: "Authentication failed. Wrong password."
              });
            }
          });
        }
      }
    );
  });

  // route to a restricted info (GET /api/memberinfo)
  authApiRoutes.get(
    "/memberinfo",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      let token = getToken(req.headers);
      if (token) {
        let decoded = jwt.decode(token, config.secret);
        User.findOne(
          {
            username: decoded.username
          },
          (err, user) => {
            if (err) throw err;

            if (!user) {
              return res.status(401).send({
                success: false,
                msg: "Authentication failed. User not found."
              });
            } else {
              res
                .status(200)
                .json("Welcome in the member area " + user.username + "!");
            }
          }
        );
      } else {
        return res
          .status(401)
          .send({ success: false, msg: "No token provided." });
      }
    }
  );
};
