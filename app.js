/**
 * @author: Thiago Lima
 * @description: Stores Case App Server.
 * @module: App { server }
 */

const app = require('./server');

console.log('server working on port', app.listen());