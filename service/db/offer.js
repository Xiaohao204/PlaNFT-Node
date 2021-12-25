const offer = {}

offer.delOffer = function (connection, nftInfoDetails, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'delete from offer where sales_id = ? and from_address = ?';
        connection.query(sql, [nftInfoDetails.sales_id, params.toAddr], function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    })
}

module.exports = offer


