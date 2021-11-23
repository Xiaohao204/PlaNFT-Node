
var request = require('request');

exports.getHttpData = function (url, callback) {
    return request(url, function (error, response, body){
        callback(error, body);
    });
};