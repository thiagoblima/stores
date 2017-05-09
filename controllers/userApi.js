const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/database'); // get db config file
const User = require('../models/user'); // get the mongoose model
const Recycler = require('../models/recycler'); // get the mongoose model
const otpDB = require('../models/otpdb'); // get the mongoose model
const Schedule = require('../models/schedule'); // get the mongoose model
const Pickup = require('../models/pickup'); // get the mongoose model
const Donation_list = require('../models/donation_list'); // get the mongoose model
const jwt = require('jwt-simple');

// Use the passport package
app.use(passport.initialize());

require('../config/passport')(passport);

// bundle our routes

module.exports = (app) => {

    const apiRoutes = express.Router();

    // connect the api routes under /api/*
    app.use('/api', apiRoutes);

    // create a new user account (POST http://localhost:8080/api/signup)
    apiRoutes.post('/signup', (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.status(401).json({ success: false, msg: 'Please fill out the complete form.' });
        } else {
            let newUser = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age
            });

            // save the user
            newUser.save((err) => {
                if (err) {
                    return res.status(401).json({ success: false, msg: 'Username already exists.' });
                }
                res.status(200).json({ success: true, msg: 'Successful created new user.' });
            });
        }
    });


    // route to authenticate a user (POST /api/authenticate)
    apiRoutes.post('/authenticate', (req, res) => {
        User.findOne({
            username: req.body.username
        }, (err, user) => {
            if (err) throw err;

            if (!user) {
                res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                // check if password matches
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.encode(user, config.secret);
                        // return the information including token as JSON
                        res.status(200).json({ success: true, token: 'JWT ' + token });
                    } else {
                        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });
    });

    // getToken for autorization into the platform
    getToken = (headers) => {
        if (headers && headers.authorization) {
            let parted = headers.authorization.split(' ');
            if (parted.length === 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    // route to a restricted info (GET /api/memberinfo)
    apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false }), (req, res) => {
        let token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);
            User.findOne({
                username: decoded.username
            }, (err, user) => {
                if (err) throw err;

                if (!user) {
                    return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
                } else {
                    res.json({ success: true, msg: 'Welcome in the member area ' + user.username + '!' });
                }
            });
        } else {
            return res.status(401).send({ success: false, msg: 'No token provided.' });
        }
    });

    // Get the list of all the users. (only for authenticated users.)
    apiRoutes.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);
            User.findOne({
                username: decoded.username
            }, (err, user) => {
                if (err) throw err;

                if (!user) {
                    return res.status(401).send({ success: false, msg: 'Authentication failed. Wrong user.' });
                } else {


                    // User authenticated, get the list of all the users.
                    User.find((err, user) => {
                        if (err) throw err;

                        if (!user) {
                            return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
                        } else {
                            res.status(200).json({ success: true, msg: user });
                        }
                    });

                }
            });
        } else {
            return res.status(401).send({ success: false, msg: 'No token provided.' });
        }
    });

    // find user by id (only for authenticated users)
    apiRoutes.get('/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);

            // find user by id and get it
            User.findById(req.params.id,
                {}, (err, user) => {
                    if (!user) {
                        return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
                    } else {
                        res.status(200).json({ success: true, msg: 'User was successfully found', data: user });
                    }
                });

        } else {

            return res.status(401).send({ success: false, msg: 'No token provided.' });

        }

    });


    // Delete user by id (only for authenticated users)
    apiRoutes.delete('/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);

            // find user by id and remove it
            User.findByIdAndRemove(req.params.id,
                { _id: req.params.id }, (err, user) => {
                    if (!user) {
                        return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
                    } else {
                        res.status(200).send({ success: true, msg: 'User was successfully deleted' });
                    }
                });

        } else {

            return res.status(401).send({ success: false, msg: 'No token provided.' });

        }
    });

    // update user by id (only for authenticated users)
    apiRoutes.put('/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);

            // find user by id and update it
            User.findByIdAndUpdate(req.params.id,
                {
                    _id: req.params.id,
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    age: req.body.age

                }, (err, user) => {
                    user.save((err) => {
                        if (!user) {
                            return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
                        } else {
                            res.status(200).send({ success: true, msg: 'User was successfully updated' });
                        }
                    });

                });
           }
    });

    // create a new user account (POST /api/signup)
    apiRoutes.post('/recycler', passport.authenticate('jwt', { session: false }), (req, res) => {

        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);
            User.findOne({
                username: decoded.username
            }, (err, user) => {
                if (err) throw err;

                if (!user) {
                    return res.status(403).send({ success: false, msg: 'Authentication failed. Wrong user.' });
                } else {

                    if (!req.body.recycler_name || !req.body.recycler_phone) {
                        res.json({ success: false, msg: 'Name or phone number missing.' });
                    } else {
                        let newRecycler = new Recycler({

                            recycler_name: req.body.recycler_name,
                            recycler_image: req.body.recycler_image,
                            recycler_phone: req.body.recycler_phone,
                            recycler_dob: req.body.recycler_dob,
                            recycler_address: req.body.recycler_address

                        });
                        // save the Recycler
                        newRecycler.save((err) => {
                            if (err) {
                                throw err;
                            }
                            res.json({ success: true, msg: 'Successfully added the new Recycler.' });
                        });

                    }


                }
            });
        } else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }

    });


    // Get the list of all the users. (only for authenticated users.)
    apiRoutes.get('/recycler', passport.authenticate('jwt', { session: false }), (req, res) => {
        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);
            User.findOne({
                username: decoded.username
            }, (err, user) => {
                if (err) throw err;

                if (!user) {
                    return res.status(403).send({ success: false, msg: 'Authentication failed. Wrong user.' });
                } else {

                    // User authenticated, get the list of all the recyclers.
                    Recycler.find((err, recycler) => {
                        if (err) throw err;

                        if (!recycler) {
                            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
                        } else {
                            res.json({ success: true, msg: recycler });
                        }
                    });

                }
            });
        } else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }
    });


    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
    apiRoutes.post('/sendotp', (req, res) => {
        Recycler.findOne({
            recycler_phone: req.body.phone
        }, (err, recycler) => {
            if (err) throw err;

            if (!recycler) {
                res.send({ success: false, msg: 'Authentication failed. Recycler not found, please contact Shankrit' });
            } else {

                // we found the user in the database. please send OTP, and save it in our database too.


                // Generate a Randome Number
                let OTP_num = Math.floor((Math.random() * 99999) + 9999);

                const http = require('http');
                const urlencode = require('urlencode');
                const msg = urlencode('OTP for Recycle Impact Login: ' + OTP_num);
                const number = req.body.phone;
                const username = 'thiagolimasp@live.com';
                const hash = '53ghsmKpgDWC3qYRrUmTAcQ3i';

                const sender = 'txtlcl';
                let data = 'username=' + username + '&hash=' + hash + '&sender=' + sender + '&numbers=' + number + '&message=' + msg
                let options = {

                    host: 'api.textlocal.in',
                    path: '/send?' + data
                };

                callback = (response) => {
                    var str = '';

                    //another chunk of data has been recieved, so append it to `str`
                    response.on('data', (chunk) => {
                        str += chunk;
                    });

                    //the whole response has been recieved, so we just print it out here
                    response.on('end', () => {
                        console.log(str);
                    });
                }

                //console.log('hello js'))
                http.request(options, callback).end();

                // Save the below OTP only when SMS is sent. For authinticateOTP

                let otp_DB = new otpDB({

                    otp: OTP_num,
                    otp_number: req.body.phone

                });
                // save the Recycler
                otp_DB.save((err) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ success: true, msg: 'Successfully Saved and sent (Number ' + req.body.phone + ') the OTP. Its ' + OTP_num });
                });

            }
        });
    });


    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
    apiRoutes.post('/authenticateotp', (req, res) => {
        otpDB.findOne({

            otp: req.body.otp
            //otp_number: req.body.numbers

        }, (err, otpDB) => {
            if (err) throw err;

            if (!otpDB) {
                res.send({ success: false, msg: 'Authentication failed. OTP is wrong.' });
            } else {

                let token = jwt.encode(otpDB, config.secret);
                // return the information including token as JSON
                res.json({ success: true, token: 'JWT ' + token });

                // Delete the otp database once token is sent. will do if required.
            }
        });
    });


    ///*****************************************
    // Schedule


    // create a new user account (POST http://localhost:8080/api/signup)
    apiRoutes.post('/schedule', passport.authenticate('jwt', { session: false }), (req, res) => {


        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);
            Recycler.findOne({
                recycler_phone: decoded.otp_number
            }, (err, recycler) => {
                if (err) throw err;

                if (!recycler) {
                    return res.status(403).send({ success: false, msg: 'Authentication failed. Wrong user.' });
                } else {



                    if (!req.body.schedule_time || !req.body.user) {
                        res.json({ success: false, msg: 'User or schedule time missing.' });
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
                        newSchedule.save((err) => {
                            if (err) {
                                throw err;
                            }
                            res.json({ success: true, msg: 'Successfully added the new Schedule.' });
                        });

                    }


                }
            });
        } else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }


    });


    apiRoutes.get('/schedule', passport.authenticate('jwt', { session: false }), (req, res) => {


        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);
            Recycler.findOne({
                recycler_phone: decoded.otp_number
            }, (err, recycler) => {
                if (err) throw err;

                if (!recycler) {
                    return res.status(403).send({ success: false, msg: 'Authentication failed. Wrong user.' });
                } else {


                    // User authenticated, get the list of all the recyclers.

                    Schedule.find((err, schedule) => {
                        if (err) throw err;

                        if (!schedule) {
                            return res.status(403).send({ success: false, msg: 'No Schedules Found.' });
                        } else {
                            res.json({ success: true, msg: schedule });
                        }
                    });

                }
            });
        } else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }
    });




    //**********************************************************
    // Pickup

    // create a new user account (POST http://localhost:8080/api/signup)
    apiRoutes.post('/pickup', passport.authenticate('jwt', { session: false }), (req, res) => {


        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);
            Recycler.findOne({
                recycler_phone: decoded.otp_number
            }, (err, recycler) => {
                if (err) throw err;

                if (!recycler) {
                    return res.status(403).send({ success: false, msg: 'Authentication failed. Wrong user.' });
                } else {



                    if (!req.body.schedule_id) {
                        res.json({ success: false, msg: 'User or schedule time missing.' });
                    } else {
                        let newPickup = new Pickup({

                            schedule_id: req.body.schedule_id,
                            total_points: req.body.total_points,
                            details_id: req.body.details_id

                        });
                        // save the Recycler
                        newPickup.save((err) => {
                            if (err) {
                                throw err;
                            }
                            res.json({ success: true, msg: 'Successfully added the new Pickup Details.' });
                        });

                    }


                }
            });
        } else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }


    });


    apiRoutes.get('/pickup', passport.authenticate('jwt', { session: false }), (req, res) => {


        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);
            Recycler.findOne({
                recycler_phone: decoded.otp_number
            }, (err, recycler) => {
                if (err) throw err;

                if (!recycler) {
                    return res.status(403).send({ success: false, msg: 'Authentication failed. Wrong user.' });
                } else {


                    // User authenticated, get the list of all the Pickup.

                    Pickup.find((err, pickup) => {
                        if (err) throw err;

                        if (!pickup) {
                            return res.status(403).send({ success: false, msg: 'No Schedules Found.' });
                        } else {
                            res.json({ success: true, msg: pickup });
                        }
                    });

                }
            });
        } else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }
    });


    apiRoutes.post('/donation_list', passport.authenticate('jwt', { session: false }), (req, res) => {


        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);
            Recycler.findOne({
                recycler_phone: decoded.otp_number
            }, (err, recycler) => {
                if (err) throw err;

                if (!recycler) {
                    return res.status(403).send({ success: false, msg: 'Authentication failed. Wrong user.' });
                } else {



                    if (!req.body.organization_name) {
                        res.json({ success: false, msg: 'User or schedule time missing.' });
                    } else {
                        let newDonation_list = new Donation_list({

                            organization_name: req.body.organization_name,
                            description: req.body.description,
                            image: req.body.image,
                            goal: req.body.goal,
                            current_status: req.body.current_status,

                        });

                        // save the Recycler
                        newDonation_list.save((err) => {
                            if (err) {
                                throw err;
                            }
                            res.json({ success: true, msg: 'Successfully added the new Donation Organization.' });
                        });

                    }


                }
            });
        } else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }


    });



    apiRoutes.get('/donation_list', passport.authenticate('jwt', { session: false }), (req, res) => {


        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);
            Recycler.findOne({
                recycler_phone: decoded.otp_number
            }, (err, recycler) => {
                if (err) throw err;

                if (!recycler) {
                    return res.status(403).send({ success: false, msg: 'Authentication failed. Wrong user.' });
                } else {


                    // User authenticated, get the list of all the Pickup.

                    Donation_list.find((err, donation_list) => {
                        if (err) throw err;

                        if (!donation_list) {
                            return res.status(403).send({ success: false, msg: 'No Schedules Found.' });
                        } else {
                            res.json({ success: true, msg: donation_list });
                        }
                    });

                }
            });
        } else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }
    });

};
