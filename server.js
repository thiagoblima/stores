const config = require('./config/database'); 
const userApiRoutes = require('./controllers/userApi');
const storesApiRoutes = require('./controllers/storesApi');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public/dist'));

app.get('/', (req, res) => {
    res.send('The API is at http://localhost:' + port + '/api');
});

app.use(morgan('dev'));

app.listen(port);
console.log('App running at: http://localhost:' + port);

mongoose.connect(config.database);

userApiRoutes(app);
storesApiRoutes(app);

module.exports = app;
