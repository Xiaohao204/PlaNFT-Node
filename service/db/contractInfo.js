const mysql = require('../../config/mysql');

const contractInfo = {}

contractInfo.getTransferList = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT address from contract_info where chain_symbol=? order by end_block_id";
            connection.query(sql, params, function (err, result) {
                if (err) reject(err);
                result = result.map(obj => obj.address);
                resolve(result);
            });
            connection.release();
        })
    })
}

contractInfo.getContractInfo = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT end_block_id,collection_id,contract_name FROM contract_info where address = ? and chain_symbol=?";
            connection.query(sql, [params.contractAddr, params.chain_symbol], function (err, result) {
                if (err) reject(err);
                resolve(result[0]);
            });
            connection.release();
        })
    })
}

contractInfo.setLastNumber = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "UPDATE contract_info set end_block_id= ? where address = ? and end_block_id = ? and chain_symbol=?";
            connection.query(sql, params, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
            connection.release();
        })
    })
}
module.exports = contractInfo

