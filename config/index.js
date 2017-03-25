/**
 * @author: Thiago Lima
 * @description: MongoDB Config
 * @module: Index { getDbConnectionString }
 */


const configValues = require('./config');

module.exports = {
    
    getDbConnectionString: () => 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds141450.mlab.com:41450/stores'
    
}