/**
 * @author     : Thiago Lima <thiagolimasp@live.com>
 * @module     : App { server }
 * @description: Here goes the REST API responsible for
 * saving, editing and deleting an existing store. User
 * has to be authenticated to call these methods.
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

require("../config/passport")(passport);

module.exports = app => {
  const storesApiRoutes = express.Router();

  // connect the api routes under /api/*
  app.use("/api", storesApiRoutes);

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

  // create a new store (POST /api/stores)
  storesApiRoutes.post(
    "/stores",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const token = getToken(req.headers);
      if (token) {
        let decoded = jwt.decode(token, config.secret);
        const promise = User.findOne({ username: decoded.username });
        promise
          .then(user => {
            if (!req.body.store_name || !req.body.store_phone) {
              res.status(401).json({
                success: false,
                msg: "Name or phone number missing."
              });
            } else {
              let newStore = new Stores({
                store_name: req.body.store_name,
                store_file: req.body.store_file,
                store_path: req.body.store_path,
                store_phone: req.body.store_phone,
                store_country: req.body.store_country,
                store_city: req.body.store_city,
                store_type: req.body.store_type,
                store_address: req.body.store_address
              });
              // save the Store
              const promise_save_store = newStore.save();
              promise_save_store
                .then(store => {
                  res.status(200).json({
                    success: true,
                    msg: "Successfully added the new Store " + user.username,
                    created_store: store
                  });
                })
                .catch(err => {
                  res.status(409).json({
                    success: false,
                    msg: "Store already exists.",
                    err
                  });
                });
            }
          })
          .catch(err => {
            res.status(403).send({
              success: false,
              msg: "Authentication failed. Wrong user."
            });
          });
      } else {
        return res
          .status(401)
          .send({ success: false, msg: "No token provided." });
      }
    }
  );

  // Get the list of a specific user's stores. (only for authenticated users.)
  storesApiRoutes.get(
    "/stores",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const token = getToken(req.headers);
      if (token) {
        let decoded = jwt.decode(token, config.secret);
        const promise = User.findOne({ username: decoded.username });
        promise
          .then(user => {
            // User authenticated, get the list of all the stores.
            const promise_get_store = Stores.find();
            promise_get_store
              .then(stores => {
                res.status(200).json(stores);
              })
              .catch(err => {
                res.status(403).send({
                  success: false,
                  msg: "Authentication failed. Stores were not found."
                });
              });
          })
          .catch(err => {
            return res.status(403).send({
              success: false,
              msg: "Authentication failed. Wrong user."
            });
          });
      } else {
        return res
          .status(403)
          .send({ success: false, msg: "No token provided." });
      }
    }
  );

  // find store by id (only for authenticated users)
  storesApiRoutes.get(
    "/store/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const token = getToken(req.headers);
      if (token) {
        let decoded = jwt.decode(token, config.secret);
        // find store by id and get it
        const promise = Stores.findById(req.params.id, {});
        promise
          .then(store => {
            res.status(200).json(store);
          })
          .catch(err => {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Store not found."
            });
          });
      } else {
        return res
          .status(401)
          .send({ success: false, msg: "No token provided." });
      }
    }
  );

  // Delete store by id (only for authenticated users)
  storesApiRoutes.delete(
    "/store/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const token = getToken(req.headers);
      if (token) {
        let decoded = jwt.decode(token, config.secret);
        // find store by id and remove it
        const promise = Stores.findByIdAndRemove({ _id: req.params.id });
        promise
          .then(store => {
            res
              .status(200)
              .send({ success: true, msg: "Store was successfully deleted" });
          })
          .catch(err => {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Store not found.",
              err: err
            });
          });
      } else {
        return res
          .status(401)
          .send({ success: false, msg: "No token provided." });
      }
    }
  );

  // update store by id (only for authenticated users)
  storesApiRoutes.put(
    "/store/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const token = getToken(req.headers);
      if (token) {
        let decoded = jwt.decode(token, config.secret);
        // find store by id and update it
        const promise = Stores.findByIdAndUpdate(req.params.id, {
          _id: req.params.id,
          store_file: req.body.store_file,
          store_phone: req.body.store_phone,
          store_country: req.body.store_country,
          store_city: req.body.store_city,
          store_type: req.body.store_type,
          store_address: req.body.store_address
        });
        promise
          .then(store => {
            res.status(200).send({
              success: true,
              msg: "Store was successfully updated!", store
            });
          })
          .catch(err => {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Store not found.", err
            });
          });
      } else {
        return res
          .status(401)
          .send({ success: false, msg: "No token provided." });
      }
    }
  );
};
