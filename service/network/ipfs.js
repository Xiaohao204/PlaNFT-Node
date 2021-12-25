
const request = require('request');

const ipfs = {}

ipfs.getMetaData = function (url, callback) {
    return request(url, function (error, body) {
        callback(error, body);
    });
};

module.exports = ipfs