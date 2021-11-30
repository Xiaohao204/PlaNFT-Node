const listingExpiration = {}

listingExpiration.delSale = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'DELETE from listing_expiration where listing_expiration.sales_id = (select sales_id from nft_info where nft_info.contract_address=? and nft_info.token_id=?)';
        connection.query(sql, [params.contractAddr, params.tokenId], function (err, result) {
            if (err) throw err;
            resolve(result.changedRows === 1);
        });
    })
}

module.exports = listingExpiration


