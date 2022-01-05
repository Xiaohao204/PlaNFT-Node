const mysql = require('../../config/mysql');

const contractCache = {}

contractCache.getContractInfo = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT * FROM contract_cache where address = ? and chain_symbol=?";
            connection.query(sql, [params.contractAddr, params.chain_symbol], function (err, result) {
                if (err) reject(err);
                resolve(result.length === 0 ? null : result[0]);
            });
            connection.release();
        })
    })
}

contractCache.insertNewContract = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "INSERT INTO contract_cache(address,chain_symbol) values(?,?) ON DUPLICATE KEY UPDATE updated_at=now()";
            connection.query(sql, [params.contractAddr, params.chain_symbol], function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
            connection.release();
        })
    })
}

contractCache.deleteContract = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "delete from contract_cache where chain_symbol=?";
            connection.query(sql, params, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
            connection.release();
        })
    })
}
module.exports = contractCache