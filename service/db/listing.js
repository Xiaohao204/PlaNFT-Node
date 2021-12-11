const listing = {}

listing.delListing = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'delete from listing where sales_id = ?';
        connection.query(sql, params.sales_id, function (err, result) {
            if (err) throw err;
            resolve(result.changedRows === 1);
        });
    })
}

module.exports = listing


