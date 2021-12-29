const mysql = require('../../config/mysql');

const scanNumber = {}

scanNumber.getBlockInfo = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT startBlock,currentBlock,endBlock FROM scanNumber where chain_symbol=? and type = ?";
            connection.query(sql, params, function (err, result) {
                if (err) reject(err);
                resolve(result.length === 0 ? null : result[0]);
            });
            connection.release();
        })
    })
}

collection.setBlockInfo = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "update scanNumber set currentBlock=? where type = ? and chain_symbol=?";
            connection.query(sql, [params.currentBlock, params.type, params.chain_symbol], function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
            connection.release();
        })
    })
}

module.exports = scanNumber

