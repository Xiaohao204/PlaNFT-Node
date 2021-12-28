const mysql = require('../../config/mysql');

const collection = {}

collection.getCollectionInfo = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT id FROM collection where collection_name = ? and chain_symbol=?";
            connection.query(sql, [params.collectionName, params.chain_symbol], function (err, result) {
                if (err) reject(err);
                resolve(result.length === 0 ? null : result[0].id);
            });
            connection.release();
        })
    })
}

collection.insertNewCollection = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = "INSERT INTO collection(original_name,collection_name,user_address,contract_address,source,type,chain_symbol) values(?,?,?,?,2,3,?) ON DUPLICATE KEY UPDATE updated_at=now()";
        connection.query(sql, [params.contractName, params.collectionName, params.owner, params.contractAddr, params.chain_symbol], function (err, result) {
            if (err) reject(err);
            connection.query("SELECT LAST_INSERT_ID();", function (err, data) {
                if (err) reject(err);
                resolve(data[0]['LAST_INSERT_ID()']);
            });
        });
    })
}

module.exports = collection

