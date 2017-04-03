const config = require('./config/database'); 
const apiRoutes = require('./controllers/userApi')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const port = process.env.PORT || 3000;


// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use our root directory to read index.html
app.use('/', express.static(__dirname + '/public/dist'));

// demo Route (GET http://localhost:8080)
app.get('/', (req, res) => {
    res.send('The API is at http://localhost:' + port + '/api');
});

// log to console
app.use(morgan('dev'));

// Start the server
app.listen(port);
console.log('App running at: http://localhost:' + port);


// connect to database
mongoose.connect(config.database);

// pass users' Api 
apiRoutes(app);

// exporting the app 
module.exports = app;
