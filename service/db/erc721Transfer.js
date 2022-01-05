const mysql = require('../../config/mysql');

const erc721Transfer = {}

erc721Transfer.addNewData = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "insert into erc721Transfer(address,`from`,`to`,tokenId,chain_symbol,tx) values(?,?,?,?,?,?) ON DUPLICATE KEY UPDATE updated_at=now()";
            connection.query(sql, params, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
            connection.release();
        })
    })
}

module.exports = erc721Transfer

