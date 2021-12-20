const http = require('http')
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
        hostname: '10.0.0.18',
        port: 6699,
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

module.exports = telegram