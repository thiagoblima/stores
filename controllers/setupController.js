/**
 * @author: Thiago Lima
 * @description: Stores Case - Seeding User Data.
 * @module: App - Adding Seed Data
 */

const Users = require('../models/userModel');

module.exports = (app) => {

    app.get('/api/userSeed', (req, res) => {

        // seed database
        let userSeed = [
            {
                username: "Thiago",
                lastname: "Lima",
                photo: "user1/photo/",
                isAdmin: true,
                hasAttachment: true
            },
            {
                username: "Nicolla",
                lastname: "Pacci",
                photo: "user2/photo/",
                isAdmin: true,
                hasAttachment: true
            },
            {
                username: "Bernard",
                lastname: "Mussoli",
                photo: "user3/photo/",
                isAdmin: true,
                hasAttachment: true
            }
        ];

        Users.create(userSeed, (err, results) => {
            res.send(results);
        });
    });

}