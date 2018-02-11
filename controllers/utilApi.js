/**
 * @author     : Thiago Lima <thiagolimasp@live.com>
 * @module     : App { server }
 * @description: Here goes the REST API responsible for
 * uploading files, properly used for saving photos or pdf files.
 */

const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("../config/database");
const User = require("../models/user");
const Stores = require("../models/stores");
const jwt = require("jwt-simple");

app.use(passport.initialize());
app.use(fileUpload());

require("../config/passport")(passport);

module.exports = app => {
  const utilApiRoutes = express.Router();

  // connect the api routes under /api/*
  app.use("/api", utilApiRoutes);

  /**
   * @function: getToken()
   * @param: headers
   * @prop: authorization
   * @description: getting headers for JWT token
   */

  getToken = headers => {
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

  // user asset uploder
  utilApiRoutes.post("/upload/user/asset", (req, res) => {
    if (!req.files) return res.status(400).send("No files were uploaded.");

    let file = req.files.file;

    file.mv("./public/dist/assets/images/user/" + req.files.file.name, err => {
      if (err) return res.status(500).send(err);

      res.send("File uploaded!");
      console.log(req.files.file);
    });
  });

  // store asset uploader
  utilApiRoutes.post("/upload/store/asset", (req, res) => {
    if (!req.files) return res.status(400).send("No files were uploaded.");

    let file = req.files.file;

    file.mv("./public/dist/assets/images/store/" + req.files.file.name, err => {
      if (err) return res.status(500).send(err);

      res.send("File uploaded!");
      console.log(req.files.file);
    });
  });
};
