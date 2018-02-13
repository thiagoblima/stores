/**
 * @author     : Thiago Lima <thiagolimasp@live.com>
 * @module     : App { server }
 * @description: here we have the secret and the database instances
 * being exported to become available in other files.
 */

module.exports = {
  secret: "recycleapisecret",
  database: "mongodb://localhost/stores"
};
