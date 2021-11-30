const offer = {}

offer.delOffer = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'delete from offer where sales_id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?) and from_address = ?';
        connection.query(sql, [params.contractAddr, params.tokenId, params.toAddr], function (err, result) {
            if (err) throw err;
            resolve(result.changedRows === 1);
        });
    })
}

module.exports = offer


