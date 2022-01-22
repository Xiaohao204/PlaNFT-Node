const mysql = require('../../config/mysql');

const contractTrade = {}

contractTrade.getContractList = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "Select address from contract_trade where chain_symbol = ? and type = ?";
            connection.query(sql, params, function (err, result) {
                if (err) throw err;
                result = result.map(obj => obj.address);
                resolve(result);
            });
            connection.release();
        })
    })
}

contractTrade.getLastNumber = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT end_block_id from contract_trade where address=? and chain_symbol=?";
            connection.query(sql, params, function (err, result) {
                if (err) reject(err);
                resolve(result[0].end_block_id);
            });
            connection.release();
        })
    })
}

contractTrade.setLastNumber = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "UPDATE contract_trade set end_block_id= ? where address = ? and end_block_id = ? and chain_symbol=?";
            connection.query(sql, params, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
            connection.release();
        })
    })
}

module.exports = contractTrade

