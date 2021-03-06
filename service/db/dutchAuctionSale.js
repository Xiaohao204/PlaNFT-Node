const mysql = require('../../config/mysql');

const datchAuctionSale = {}

datchAuctionSale.delSale = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'DELETE from dutch_auction_sale where dutch_auction_sale.nft_id = ? ';
        connection.query(sql, params.id, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    })
}

module.exports = datchAuctionSale
