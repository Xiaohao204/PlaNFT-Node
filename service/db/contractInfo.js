const mysql = require('../../config/mysql');

const contractInfo = {}

contractInfo.getContractInfo = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT collection_id,contract_name,owner FROM contract_info where address = ? and chain_symbol=?";
            connection.query(sql, [params.contractAddr, params.chain_symbol], function (err, result) {
                if (err) reject(err);
                resolve(result.length === 0 ? null : result[0]);
            });
            connection.release();
        })
    })
}

contractInfo.insertNewContract = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = "INSERT INTO contract_info(address,collection_id,contract_name,owner,type,chain_symbol,end_block_id) values(?,?,?,?,1,?,?) ON DUPLICATE KEY UPDATE updated_at=now()";
        connection.query(sql, [params.contractAddr, params.collection_id, params.contractName, params.owner, params.chain_symbol, params.blockNumber], function (err, result) {
            if (err) reject(err);
            resolve(result.changedRows === 1);
        });
    })
}

contractInfo.insertNewContract_2 = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "INSERT INTO contract_info(address,collection_id,contract_name,owner,type,chain_symbol,end_block_id) values(?,?,?,?,1,?,?) ON DUPLICATE KEY UPDATE updated_at=now()";
            connection.query(sql, params, function (err, result) {
                if (err) reject(err);
                resolve(result.changedRows === 1);
            });
            connection.release();
        })
    })
}

module.exports = contractInfo