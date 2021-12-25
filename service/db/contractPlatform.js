const mysql = require('../../config/mysql');

const contractPlatform = {}

contractPlatform.getSetTokenURIList = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT address from contract_platform where chain_symbol=? order by end_block_id";
            connection.query(sql, params, function (err, result) {
                if (err) throw err;
                result = result.map(obj => obj.address);
                resolve(result);
            });
            connection.release();
        })
    })
}

contractPlatform.getLastNumber = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT end_block_id from contract_platform where address=? and chain_symbol=?";
            connection.query(sql, params, function (err, result) {
                if (err) throw err;
                resolve(result[0].end_block_id);
            });
            connection.release();
        })
    })
}

contractPlatform.setLastNumber = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "UPDATE contract_platform set end_block_id= ? where address = ? and end_block_id = ? and chain_symbol=?";
            connection.query(sql, params, function (err, result) {
                if (err) throw err;
                resolve(result.changedRows === 1);
            });
            connection.release();
        })
    })
}
module.exports = contractPlatform

