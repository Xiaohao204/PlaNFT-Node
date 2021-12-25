const listingExpiration = {}

listingExpiration.delSale = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'DELETE from listing_expiration where listing_expiration.sales_id = ?';
        connection.query(sql, params.sales_id, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    })
}

module.exports = listingExpiration


