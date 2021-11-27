const mysql = require('../../config/mysql');

const salesInfo = {}

salesInfo.updateSaleInfo = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'update sales_info set user_address = ?, status = 0, sale_method = null, price_starts = null, current_price = null, reserve_price = null, last_traded = now() where id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?)';
        connection.query(sql, [params.toAddr, params.contractAddr, params.tokenId], function (err, result) {
            if (err) throw err;
            resolve(result.changedRows === 1);
        });
    })
}

salesInfo.insertSaleInfo = async (connection, params) => {
    return new Promise(function (resolve, reject) {
        const sql = 'INSERT into sales_info (user_Address,type,status,collect_num,viewed_num) Values (?,?,?,?,?)';
        connection.query(sql, [params.toAddr, params.type, params.status, params.collectNum, params.viewedNum], function (err, result) {
            connection.query("SELECT LAST_INSERT_ID();", function (err, data) {
                if (err) throw err;
                resolve(data[0]['LAST_INSERT_ID()']);
            });
        });
    })
}

// salesInfo.insertSaleInfo = function (params) {
//     return new Promise(function (resolve, reject) {
//         mysql.getConnection(function (err, connection) {
//             if (err) throw err;
//             const query = 'INSERT into sales_info (user_Address,type,status,collect_num,viewed_num,created_at) Values (?,?,?,?,?,NOW())';
//             connection.query(query, [user_Address, type, status, collect_num, viewed_num], function (err, rows, fields) {
//                 if (err) throw err;
//                 connection.query("SELECT LAST_INSERT_ID();", function (err, data) {
//                     if (err) throw err;
//                     resolve(data[0]['LAST_INSERT_ID()']);
//                 });
//             });
//             connection.release();
//         })
//     })
// }

// salesInfo.updateSaleInfo = function (params) {
//     return new Promise(function (resolve, reject) {
//         mysql.getConnection(function (err, connection) {
//             const query = 'update sales_info set user_address = ?, status = 0, sale_method = null, price_starts = null, current_price = null, reserve_price = null, last_traded = now(), updated_at = now() where id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?)';
//             connection.query(query, [params.toAddr, params.contractAddr, params.tokenId], function (err, result) {
//                 if (err) throw err;
//                 console.log('======', result)
//                 resolve(result);
//             });
//             connection.release();
//         })
//     })
// }

module.exports = salesInfo