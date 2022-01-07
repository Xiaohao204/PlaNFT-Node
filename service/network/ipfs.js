
const request = require('request');

const ipfs = {}

ipfs.getMetaData = function (url, callback) {
    request({ url, timeout: 120000 }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(error, body)
        }
    })
};

module.exports = ipfs