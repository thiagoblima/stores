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

    app.get('/api/users/:username', (req, res) => {

        Todos.find({ username: req.params.username }, (err, users) => {
            if (err) throw err;

            res.send(users);
        });

    });

    app.get('/api/user/:id', (req, res) => {

        Todos.findById({ _id: req.params.id }, (err, user) => {
            if (err) throw err;

            res.send(user);
        });

    });

    app.post('/api/user', (req, res) => {

        if (req.body.id) {
            Users.findByIdAndUpdate(req.body.id,
                {
                    username: req.body.username,
                    lastname: req.body.lastname,
                    photo: req.body.photo,
                    isAdmin: req.body.isAdmin,
                    hasAttachment: req.body.hasAttachment

                }, (err, todo) => {
                    if (err) throw err;

                    res.send('Success');
                });
        }

        else {

            let newUser = Todos({
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

    });

    app.delete('/api/user', (req, res) => {

        Todos.findByIdAndRemove(req.body.id, (err) => {
            if (err) throw err;
            res.send('Success');
        })

    });

}