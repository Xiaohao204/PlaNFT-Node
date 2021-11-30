const mysql = require('../../config/mysql');

const datchAuctionSale = {}

datchAuctionSale.delSale = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'DELETE from dutch_auction_sale where dutch_auction_sale.nft_id = (select id from nft_info where nft_info.contract_address=? and nft_info.token_id=?) ';
        connection.query(sql, [params.contractAddr, params.tokenId], function (err, result) {
            if (err) throw err;
            resolve(result.changedRows === 1);
        });
    })
}

module.exports = datchAuctionSale
