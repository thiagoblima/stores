/**
 * @author: Thiago Lima
 * @description: Stores Case User REST API
 * @module: App - Adding Seed Data
 */


const Users = require('../models/userModel');
const bodyParser = require('body-parser');

module.exports = (app) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    /**
     * Find and retrieves an username
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */

    let findUserName = (req, res) => {

        console.log("GET - /api/users/:username");

        Users.find({ username: req.params.username }, (err, users) => {

            if (err) throw err;

            res.send(users);


        });

    };

    /**
     * Find and retrieves all users
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */

    let findAllUsers = (req, res) => {

        console.log("GET - /api/users");

        Users.find({}, (err, users) => {

            if (err) throw err;

            res.send(users);

        });

    };

    /**
     * Find and retrieves the given id
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */

    let findUserById = (req, res) => {

        console.log("GET - /api/user/:id");

        Users.findById({ _id: req.params.id }, (err, user) => {

            if (err) throw err;

            res.send(user);

        });

    };

    /**
     * Find and updates the given id
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */

    let findByIdAndUpdate = (req, res) => {

        console.log("UPDATE - /api/user/:id");

        if (req.body.id) {

            Users.findByIdAndUpdate(req.body.id,

                {

                    username: req.body.username,
                    lastname: req.body.lastname,
                    photo: req.body.photo,
                    isAdmin: req.body.isAdmin,
                    hasAttachment: req.body.hasAttachment

                }, (err, user) => {

                    if (err) throw err;

                    res.send('Success');

                });

        } else {

            console.log("POST - /api/user/:id");

            let newUser = Users({
                username: req.body.username,
                lastname: req.body.lastname,
                photo: req.body.photo,
                isAdmin: req.body.isAdmin,
                hasAttachment: req.body.hasAttachment
            });

            newUser.save((err) => {

                if (err) throw err;

                res.send('Success');

            });

        }

    };

    /**
     * Find and deletes the given id.
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */

     findAndDeleteById = (req, res) => {

        console.log("DELETE - /api/user/:id");

        Users.findByIdAndRemove(req.body.id, (err) => {

            if (err) throw err;

            res.send('Success');

        });

    };

    app.get('/api/users/:username', findUserName);
    app.get('/api/users', findAllUsers);
    app.get('/api/user/:id', findUserById);
    app.post('/api/user', findByIdAndUpdate);
    app.delete('/api/user', findAndDeleteById);

}