const http = require('http')
const Constants = require('../../config/constants');
const telegram = {}

telegram.changeOwnerNews = function (params, nftInfoDetails) {

    const data = new TextEncoder().encode(
        JSON.stringify({
            id: nftInfoDetails.id,
            previousOwner: nftInfoDetails.user_address,
            latestOwner: params.toAddr,
            hash: params.txHash
        })
    )

    const options = {
        hostname: Constants.telegram.host,
        path: '/telegram/changeOwnerNews',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = http.request(options, res => {
        res.on('data', data => {
            process.stdout.write(data)
        })
    })
    req.on('error', error => {
        console.error(error)
    })
    req.write(data)
    req.end()
};

telegram.warningNews = function (userName, type, message) {

    const data = new TextEncoder().encode(
        JSON.stringify({
            userName,
            type,
            message
        })
    )

    const options = {
        hostname: Constants.telegram.host,
        path: '/telegram/warningNews',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = http.request(options, res => {
        res.on('data', data => {
            process.stdout.write(data)
        })
    })
    req.on('error', error => {
        console.error(error)
    })
    req.write(data)
    req.end()
};


module.exports = telegram