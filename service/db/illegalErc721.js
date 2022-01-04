const mysql = require('../../config/mysql');

const illegalErc721 = {}

illegalErc721.getAddress = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT * FROM illegalErc721 where address = ? and chain_symbol=?";
            connection.query(sql, [params.contractAddr, params.chain_symbol], function (err, result) {
                if (err) reject(err);
                resolve(result.length === 0 ? false : true);
            });
            connection.release();
        })
    })
}

illegalErc721.insertNewAddress = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "insert into illegalErc721(address,chain_symbol) values(?,?) ON DUPLICATE KEY UPDATE updated_at=now()";
            connection.query(sql, [params.contractAddr, params.chain_symbol], function (err, result) {
                if (err) reject(err);
                resolve(result.changedRows === 1);
            });
            connection.release();
        })
    })
}

module.exports = illegalErc721

