/**
 * @author     : <thiagolimasp@live.com> Thiago Lima
 * @module     : App { server }
 * @description: Main Server Node Application.
 */

const config = require("./config/database");
const utilApiRoutes = require("./routes/utilApi");
const authApiRoutes = require("./routes/authApi");
const userApiRoutes = require("./routes/userApi");
const storesApiRoutes = require("./routes/storesApi");
const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use("/", express.static(__dirname + "/public/dist"));

app.get("/", (req, res) => {
  res.send("The API is at http://localhost:" + port + "/api");
});

app.use(morgan("dev"));

app.listen(port);
console.log("App running at: http://localhost:" + port);

mongoose.Promise = global.Promise;
const promise = mongoose.connect(config.database);
promise.then(connect => connect).catch(err => err);

/**
 * @function: utilApiRoutes, authApiRoutes, userApiRoutes, storesApiRoutes
 * @param: { app }
 */

utilApiRoutes(app);
authApiRoutes(app);
userApiRoutes(app);
storesApiRoutes(app);

module.exports = app;
