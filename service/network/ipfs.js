
var request = require('request');

const ipfs = {}

ipfs.getMetaData = function (url, callback) {
    return request(url, function (error, response, body) {
        if (error !== null) console.log('getMetaData error:', error)
        callback(error !== null, body);
    });
};

module.exports = ipfs