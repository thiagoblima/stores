/**
 * @author: Thiago Lima
 * @description: MongoDB Config
 * @module: App - Adding Seed Data
 */


const configValues = require('./config');

module.exports = {
    
    getDbConnectionString: () => 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds031995.mlab.com:31995/susers'
    
}