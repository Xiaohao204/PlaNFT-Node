const mysql = require('../../config/mysql');

const listing = {}

listing.delListing = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'delete from listing where sales_id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?)';
        connection.query(sql, [params.contractAddr, params.tokenId], function (err, result) {
            if (err) throw err;
            resolve(result.changedRows === 1);
        });
    })
}

// listing.delListing = function (params) {
//     return new Promise(function (resolve, reject) {
//         mysql.getConnection(function (err, connection) {
//             const sql = 'delete from listing where sales_id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?)';
//             connection.query(sql, [params.contractAddr, params.tokenId], function (err, result) {
//                 if (err) throw err;
//                 console.log('delListing===', result)
//                 resolve(result);
//             });
//             connection.release();
//         })
//     })
// }

module.exports = listing


