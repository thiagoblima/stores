/**
 * @author     : <thiagolimasp@live.com> Thiago Lima
 * @module     : App { server }
 * @description: Main Server Node Application.
 */

const config = require('./config/database'); 
const utilApiRoutes = require('./controllers/utilApi');
const authApiRoutes = require('./controllers/authApi');
const userApiRoutes = require('./controllers/userApi');
const storesApiRoutes = require('./controllers/storesApi');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use('/', express.static(__dirname + '/public/dist'));

app.get('/', (req, res) => {
    res.send('The API is at http://localhost:' + port + '/api');
});

app.use(morgan('dev'));

app.listen(port);
console.log('App running at: http://localhost:' + port);

mongoose.connect(config.database, {useMongoClient: true});

/**
 * @function: utilApiRoutes, authApiRoutes, userApiRoutes, storesApiRoutes
 * @param: { app }
 */

utilApiRoutes(app);
authApiRoutes(app);
userApiRoutes(app);
storesApiRoutes(app);

module.exports = app;
 