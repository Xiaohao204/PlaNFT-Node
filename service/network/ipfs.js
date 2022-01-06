
const request = require('request');
const telegram = require('./telegram')
const Constants = require('../../config/constants');

const ipfs = {}

ipfs.getMetaData = function (url, callback) {
    request({ url, timeout: 120000 }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(error, body)
        } else {
            if (error != null) {
                const msg = error.toString();
                if (!msg.startsWith('Error: Invalid URI ') && !msg.startsWith('Error: connect ECONNREFUSED') && !msg.startsWith('Error: socket hang up')) {
                    telegram.warningNews(Constants.telegram.userName, url + " ipfs error", msg)
                }
            }
        }
    })
};

module.exports = ipfs