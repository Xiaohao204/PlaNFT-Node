let getConn = require('../config/dbconn');


//修改區塊信息
function updateBlock(contract_adr, lastScanNumber, endBlockId) {
    const connection = getConn();
    return new Promise(function (resolve, reject) {
        var array = 0;
        const sql = "UPDATE scan_block set endBlockId= ?,update_at = NOW() where contract_address = ? and endBlockId = ?";
        const params = [endBlockId, contract_adr, lastScanNumber];
        connection.query(sql, params, function (err, rows, fields) {
            if (err) throw err;
            array = rows.changedRows;
            resolve(array);
        });
        connection.end();
    })
}

const actionUpdateLastScan = async (contract_adr, lastScanNumber, endBlockId) => {
    var array = await updateBlock(contract_adr, lastScanNumber, endBlockId);
    return array;
}


//查詢區塊信息
function myQuery(contract_adr) {
    const connection = getConn();
    return new Promise(function (resolve, reject) {
        var array = 0;
        const sql = "SELECT endBlockId FROM scan_block where contract_address = ?";
        const params = [contract_adr];
        connection.query(sql, params, function (err, rows, fields) {
            if (err) throw err;
            if (rows.length > 0)
                array = rows[0].endBlockId;
            resolve(array);
        });
        connection.end();
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