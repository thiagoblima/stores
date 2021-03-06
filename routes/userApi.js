/**
 * @author     : Thiago Lima <thiagolimasp@live.com>
 * @module     : App { server }
 * @description: Here goes the REST API responsible for
 * saving, editing and deleting an existing an user. User
 * has to be authenticated to call these methods.
 */

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("../config/database");
const User = require("../models/user");
const Stores = require("../models/stores");
const otpDB = require("../models/otpdb");
const Schedule = require("../models/schedule");
const Pickup = require("../models/pickup");
const Donation_list = require("../models/donation_list");
const getToken = require("../config/token");
const jwt = require("jwt-simple");
const app = express();

app.use(passport.initialize());

require("../config/passport")(passport);

module.exports = app => {
  const userApiRoutes = express.Router();
  const authGuard = passport.authenticate("jwt", { session: false });

  // connect the api routes under /api/*
  app.use("/api", userApiRoutes);

  // api routes
  userApiRoutes.post("/signup", signUp);
  userApiRoutes.get("/users", authGuard, getAllUsers);
  userApiRoutes.get("/user/:id", authGuard, getUserById);
  userApiRoutes.delete("/user/:id", authGuard, deleteUserById);
  userApiRoutes.put("/user/:id", authGuard, updateUserById);

  // create a new user account 
  function signUp(req, res) {
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

      const promise = newUser.save();
      promise
        .then(user => {
          res
            .status(200)
            .json({ success: true, msg: "Successful created new user.", user: user });

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
              "<p><b>Hello</b> " +
              req.body.firstname +
              ",</p>" +
              "<p>We just want to confirm that you've just registered your Stores account with the email: " +
              req.body.email +
              "</p>."
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          });
        })
        .catch(err => {
          res
            .status(409)
            .json({ success: false, msg: "Username already exists.", err: err });
        });
    }
  }

  // Get the list of all the users. (only for authenticated users.)
  function getAllUsers(req, res) { 
    const token = getToken(req.headers);
    if (token) {
      let decoded = jwt.decode(token, config.secret);
      const promise = User.findOne({
        username: decoded.username
      });
      promise
        .then(() => {
          // note that `User.find(user)` will bring only the decoded.username
          // instead of all the users
          const promise_get_users = User.find({});
          promise_get_users
            .then(users => res.status(200).json(users))
            .catch(err => {
              res.status(401).send({
                success: false,
                msg: "Authentication failed. User not found.",
                err: err
              });
            });
        })
        .catch(err => {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. Wrong user.",
            err: err
          });
        });
    } else {
      res.status(401).send({
        success: false,
        msg: "No token provided."
      });
    }
  }

  // find user by id (only for authenticated users)
  function getUserById(req, res) {
    const token = getToken(req.headers);
    if (token) {
      let decoded = jwt.decode(token, config.secret);
      const promise = User.findById(req.params.id, {});
      promise.then(user => res.status(200).json(user)).catch(err =>
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found.",
          err: err
        })
      );
    } else {
      res.status(401).send({
        success: false,
        msg: "No token provided."
      });
    }
  }

  // Delete user by id (only for authenticated users)
  function deleteUserById(req, res) {
    const token = getToken(req.headers);
    if (token) {
      let decoded = jwt.decode(token, config.secret);
      const promise = User.findByIdAndRemove(req.params.id, {
        _id: req.params.id
      });
      promise
        .then(user =>
          res.status(200).send({
            success: true,
            msg: "User was successfully deleted",
            deleted_user: user
          })
        )
        .catch(err =>
          res.status(401).send({
            success: false,
            msg: "Authentication failed. User not found.",
            err: err
          })
        );
    } else {
      res.status(401).send({
        success: false,
        msg: "No token provided."
      });
    }
  }

  // update user by id (only for authenticated users)
  function updateUserById(req, res) {
    const token = getToken(req.headers);
    if (token) {
      let decoded = jwt.decode(token, config.secret);
      const promise = User.findByIdAndUpdate(req.params.id, {
        _id: req.params.id,
        file: req.body.file,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        path: req.body.path,
        age: req.body.age
      });
      promise
        .then(user =>
          res.status(200).send({
            success: true,
            msg: "User was successfully updated!",
            updated_user: user
          })
        )
        .catch(err =>
          res.status(401).send({
            success: false,
            msg: "An error occured while updating.",
            err: err
          })
        );
    } else {
      res.status(401).send({
        success: false,
        msg: "No token provided."
      });
    }
  }

  // route to authenticate a user (POST http://localhost:8080/api/authenticate)
  userApiRoutes.post("/sendotp", (req, res) => {
    Recycler.findOne(
      {
        recycler_phone: req.body.phone
      },
      (err, recycler) => {
        if (err) throw err;

        if (!recycler) {
          res.send({
            success: false,
            msg:
              "Authentication failed. Recycler not found, please contact Shankrit"
          });
        } else {
          // we found the user in the database. please send OTP, and save it in our database too.

          // Generate a Randome Number
          let OTP_num = Math.floor(Math.random() * 99999 + 9999);

          const http = require("http");
          const urlencode = require("urlencode");
          const msg = urlencode("OTP for Recycle Impact Login: " + OTP_num);
          const number = req.body.phone;
          const username = "thiagolimasp@live.com";
          const hash = "53ghsmKpgDWC3qYRrUmTAcQ3i";

          const sender = "txtlcl";
          let data =
            "username=" +
            username +
            "&hash=" +
            hash +
            "&sender=" +
            sender +
            "&numbers=" +
            number +
            "&message=" +
            msg;
          let options = {
            host: "api.textlocal.in",
            path: "/send?" + data
          };

          callback = response => {
            var str = "";

            //another chunk of data has been recieved, so append it to `str`
            response.on("data", chunk => {
              str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on("end", () => {
              console.log(str);
            });
          };

          //console.log('hello js'))
          http.request(options, callback).end();

          // Save the below OTP only when SMS is sent. For authinticateOTP

          let otp_DB = new otpDB({
            otp: OTP_num,
            otp_number: req.body.phone
          });
          // save the Recycler
          otp_DB.save(err => {
            if (err) {
              throw err;
            }
            res.json({
              success: true,
              msg:
                "Successfully Saved and sent (Number " +
                req.body.phone +
                ") the OTP. Its " +
                OTP_num
            });
          });
        }
      }
    );
  });

  // route to authenticate a user (POST http://localhost:8080/api/authenticate)
  userApiRoutes.post("/authenticateotp", (req, res) => {
    otpDB.findOne(
      {
        otp: req.body.otp
        //otp_number: req.body.numbers
      },
      (err, otpDB) => {
        if (err) throw err;

        if (!otpDB) {
          res.send({
            success: false,
            msg: "Authentication failed. OTP is wrong."
          });
        } else {
          let token = jwt.encode(otpDB, config.secret);
          // return the information including token as JSON
          res.json({
            success: true,
            token: "JWT " + token
          });

          // Delete the otp database once token is sent. will do if required.
        }
      }
    );
  });

  ///*****************************************
  // Schedule

  // create a new user account (POST http://localhost:8080/api/signup)
  userApiRoutes.post(
    "/schedule",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      const token = getToken(req.headers);
      if (token) {
        let decoded = jwt.decode(token, config.secret);
        Recycler.findOne(
          {
            recycler_phone: decoded.otp_number
          },
          (err, recycler) => {
            if (err) throw err;

            if (!recycler) {
              return res.status(403).send({
                success: false,
                msg: "Authentication failed. Wrong user."
              });
            } else {
              if (!req.body.schedule_time || !req.body.user) {
                res.json({
                  success: false,
                  msg: "User or schedule time missing."
                });
              } else {
                let newSchedule = new Schedule({
                  schedule_time: req.body.schedule_time,
                  username: req.body.username,
                  recycler: req.body.recycler,
                  status: req.body.status,
                  pickup_id: req.body.pickup_id,
                  cancel_state: req.body.cancel_state,
                  cancel_note: req.body.cancel_note
                });
                // save the Recycler
                newSchedule.save(err => {
                  if (err) {
                    throw err;
                  }
                  res.json({
                    success: true,
                    msg: "Successfully added the new Schedule."
                  });
                });
              }
            }
          }
        );
      } else {
        return res.status(403).send({
          success: false,
          msg: "No token provided."
        });
      }
    }
  );

  userApiRoutes.get(
    "/schedule",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      const token = getToken(req.headers);
      if (token) {
        let decoded = jwt.decode(token, config.secret);
        Recycler.findOne(
          {
            recycler_phone: decoded.otp_number
          },
          (err, recycler) => {
            if (err) throw err;

            if (!recycler) {
              return res.status(403).send({
                success: false,
                msg: "Authentication failed. Wrong user."
              });
            } else {
              // User authenticated, get the list of all the recyclers.

              Schedule.find((err, schedule) => {
                if (err) throw err;

                if (!schedule) {
                  return res.status(403).send({
                    success: false,
                    msg: "No Schedules Found."
                  });
                } else {
                  res.json({
                    success: true,
                    msg: schedule
                  });
                }
              });
            }
          }
        );
      } else {
        return res.status(403).send({
          success: false,
          msg: "No token provided."
        });
      }
    }
  );

  //**********************************************************
  // Pickup

  // create a new user account (POST http://localhost:8080/api/signup)
  userApiRoutes.post(
    "/pickup",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      const token = getToken(req.headers);
      if (token) {
        let decoded = jwt.decode(token, config.secret);
        Recycler.findOne(
          {
            recycler_phone: decoded.otp_number
          },
          (err, recycler) => {
            if (err) throw err;

            if (!recycler) {
              return res.status(403).send({
                success: false,
                msg: "Authentication failed. Wrong user."
              });
            } else {
              if (!req.body.schedule_id) {
                res.json({
                  success: false,
                  msg: "User or schedule time missing."
                });
              } else {
                let newPickup = new Pickup({
                  schedule_id: req.body.schedule_id,
                  total_points: req.body.total_points,
                  details_id: req.body.details_id
                });
                // save the Recycler
                newPickup.save(err => {
                  if (err) {
                    throw err;
                  }
                  res.json({
                    success: true,
                    msg: "Successfully added the new Pickup Details."
                  });
                });
              }
            }
          }
        );
      } else {
        return res.status(403).send({
          success: false,
          msg: "No token provided."
        });
      }
    }
  );

  userApiRoutes.get(
    "/pickup",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      const token = getToken(req.headers);
      if (token) {
        let decoded = jwt.decode(token, config.secret);
        Recycler.findOne(
          {
            recycler_phone: decoded.otp_number
          },
          (err, recycler) => {
            if (err) throw err;

            if (!recycler) {
              return res.status(403).send({
                success: false,
                msg: "Authentication failed. Wrong user."
              });
            } else {
              // User authenticated, get the list of all the Pickup.

              Pickup.find((err, pickup) => {
                if (err) throw err;

                if (!pickup) {
                  return res.status(403).send({
                    success: false,
                    msg: "No Schedules Found."
                  });
                } else {
                  res.json({
                    success: true,
                    msg: pickup
                  });
                }
              });
            }
          }
        );
      } else {
        return res.status(403).send({
          success: false,
          msg: "No token provided."
        });
      }
    }
  );

  userApiRoutes.post(
    "/donation_list",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      const token = getToken(req.headers);
      if (token) {
        let decoded = jwt.decode(token, config.secret);
        Recycler.findOne(
          {
            recycler_phone: decoded.otp_number
          },
          (err, recycler) => {
            if (err) throw err;

            if (!recycler) {
              return res.status(403).send({
                success: false,
                msg: "Authentication failed. Wrong user."
              });
            } else {
              if (!req.body.organization_name) {
                res.json({
                  success: false,
                  msg: "User or schedule time missing."
                });
              } else {
                let newDonation_list = new Donation_list({
                  organization_name: req.body.organization_name,
                  description: req.body.description,
                  image: req.body.image,
                  goal: req.body.goal,
                  current_status: req.body.current_status
                });

                // save the Recycler
                newDonation_list.save(err => {
                  if (err) {
                    throw err;
                  }
                  res.json({
                    success: true,
                    msg: "Successfully added the new Donation Organization."
                  });
                });
              }
            }
          }
        );
      } else {
        return res.status(403).send({
          success: false,
          msg: "No token provided."
        });
      }
    }
  );

  userApiRoutes.get(
    "/donation_list",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      const token = getToken(req.headers);
      if (token) {
        let decoded = jwt.decode(token, config.secret);
        Recycler.findOne(
          {
            recycler_phone: decoded.otp_number
          },
          (err, recycler) => {
            if (err) throw err;

            if (!recycler) {
              return res.status(403).send({
                success: false,
                msg: "Authentication failed. Wrong user."
              });
            } else {
              // User authenticated, get the list of all the Pickup.

              Donation_list.find((err, donation_list) => {
                if (err) throw err;

                if (!donation_list) {
                  return res.status(403).send({
                    success: false,
                    msg: "No Schedules Found."
                  });
                } else {
                  res.json({
                    success: true,
                    msg: donation_list
                  });
                }
              });
            }
          }
        );
      } else {
        return res.status(403).send({
          success: false,
          msg: "No token provided."
        });
      }
    }
  );
};
