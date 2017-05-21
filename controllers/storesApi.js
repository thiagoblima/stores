const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/database');
const User = require('../models/user');
const Stores = require('../models/stores');
const otpDB = require('../models/otpdb');
const Schedule = require('../models/schedule');
const Pickup = require('../models/pickup');
const Donation_list = require('../models/donation_list');
const jwt = require('jwt-simple');

app.use(passport.initialize());

require('../config/passport')(passport);


module.exports = (app) => {

    const storesApiRoutes = express.Router();

    // connect the api routes under /api/*
    app.use('/api', storesApiRoutes);


    /**
     * @function: getToken()
     * @param: headers
     * @prop: authorization
     * @description: getting headers for JWT token
     */


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


    // create a new store (POST /api/stores)
    storesApiRoutes.post('/stores', passport.authenticate('jwt', { session: false }), (req, res) => {

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

                    if (!req.body.store_name || !req.body.store_phone) {
                        res.status(401).json({ success: false, msg: 'Name or phone number missing.' });
                    } else {
                        let newStore = new Stores({

                            store_name: req.body.store_name,
                            store_image: req.body.store_image,
                            store_phone: req.body.store_phone,
                            store_country: req.body.store_country,
                            store_city: req.body.store_city,
                            store_type: req.body.store_type,
                            store_address: req.body.store_address

                        });
                        // save the Store
                        newStore.save((err) => {
                            if (err) {
                                throw err;
                            }
                            res.status(200).json({ success: true, msg: 'Successfully added the new Store ' + user.username });
                        });

                    }


                }
            });
        } else {
            return res.status(401).send({ success: false, msg: 'No token provided.' });
        }

    });


    // Get the list of a specific user's stores. (only for authenticated users.)
    storesApiRoutes.get('/stores', passport.authenticate('jwt', { session: false }), (req, res) => {
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

                    // User authenticated, get the list of all the stores.
                    Stores.find((err, store) => {
                        if (err) throw err;

                        if (!store) {
                            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
                        } else {
                            res.status(200).json({ success: true, data: store });
                        }
                    });

                }
            });
        } else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }
    });

    // find store by id (only for authenticated users)
    storesApiRoutes.get('/store/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);

            // find store by id and get it
            Stores.findById(req.params.id,
                {}, (err, store) => {
                    if (!store) {
                        return res.status(401).send({ success: false, msg: 'Authentication failed. Store not found.' });
                    } else {
                        res.status(200).json({ success: true, msg: 'Store Successfully Found', data: store });
                    }
                });

        } else {

            return res.status(401).send({ success: false, msg: 'No token provided.' });

        }

    });

    // Delete store by id (only for authenticated users)
    storesApiRoutes.delete('/store/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);

            // find store by id and remove it
            Stores.findByIdAndRemove(req.params.id,
                { _id: req.params.id }, (err, store) => {
                    if (!store) {
                        return res.status(401).send({ success: false, msg: 'Authentication failed. Store not found.' });
                    } else {
                        res.status(200).send({ success: true, msg: 'Store was successfully deleted' });
                    }
                });

        } else {

            return res.status(401).send({ success: false, msg: 'No token provided.' });

        }
    });

    // update store by id (only for authenticated users)
    storesApiRoutes.put('/store/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        const token = getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, config.secret);

            // find store by id and update it
            Stores.update(req.params.id,
                {
                    _id: req.params.id,
                    store_image: req.body.store_image,
                    store_phone: req.body.store_phone,
                    store_country: req.body.store_country,
                    store_city: req.body.store_city,
                    store_type: req.body.store_type,
                    store_address: req.body.store_address

                }, (err, store) => {
                    if (!store) {
                        return res.status(401).send({ success: false, msg: 'Authentication failed. Store not found.' });
                    } else {
                        res.status(200).send({ success: true, msg: 'Store was successfully updated!' });
                    }
                });

        } else {

            return res.status(401).send({ success: false, msg: 'No token provided.' });

        }

    });

};