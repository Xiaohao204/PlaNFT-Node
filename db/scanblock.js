let configs = require('../config/constants');


//修改區塊信息
function updateBlock(contract_adr, lastScanNumber, endBlockId) {
    return new Promise(function (resolve, reject) {
        configs.dbpool.getConnection(function (err, connection) {
            var array = 0;
            const sql = "UPDATE contract_info set end_block_id= ?,updated_at = NOW() where address = ? and end_block_id = ?";
            const params = [endBlockId, contract_adr, lastScanNumber];
            connection.query(sql, params, function (err, rows, fields) {
                if (err) throw err;
                array = rows.changedRows;
                resolve(array);
            });
            connection.release();
        })
    })
}

const actionUpdateLastScan = async (contract_adr, lastScanNumber, endBlockId) => {
    var array = await updateBlock(contract_adr, lastScanNumber, endBlockId);
    return array;
}


//查詢區塊信息
function myQuery(contract_adr) {
    return new Promise(function (resolve, reject) {
        configs.dbpool.getConnection(function (err, connection) {
            var array = 0;
            const sql = "SELECT end_block_id,collection_id,contract_name,type FROM contract_info where address = ?";
            const params = [contract_adr];
            connection.query(sql, params, function (err, rows, fields) {
                if (err) throw err;
                if (rows.length > 0)
                    array = rows[0];
                resolve(array);
            });
            connection.release();
        })
    })
}

const actiongetLastScan = async (contract_adr) => {
    var array = await myQuery(contract_adr);
    return array;
}

module.exports = {
    actionUpdateLastScan,
    actiongetLastScan
};