const mysql = require('../../config/mysql');

const contractInfo = {}

contractInfo.getContractList = function () {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT address from contract_info";
            connection.query(sql, function (err, result) {
                if (err) throw err;
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
            const sql = "SELECT end_block_id,collection_id,contract_name,type FROM contract_info where address = ?";
            connection.query(sql, params, function (err, result) {
                if (err) throw err;
                resolve(result[0]);
            });
            connection.release();
        })
    })
}

contractInfo.getLastNumber = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT end_block_id from contract_info where address=?";
            connection.query(sql, params, function (err, result) {
                if (err) throw err;
                resolve(result[0].end_block_id);
            });
            connection.release();
        })
    })
}

contractInfo.setLastNumber = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "UPDATE contract_info set end_block_id= ? where address = ? and end_block_id = ?";
            connection.query(sql, params, function (err, result) {
                if (err) throw err;
                resolve(result.changedRows === 1);
            });
            connection.release();
        })
    })
}
module.exports = contractInfo

