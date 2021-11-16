
let getConn = require('../config/dbconn');

// // 修改nft的ower信息
// async function actionUpdateLastScan(contract_adr, lastScanNumber, endBlockId) {
//     const connection = getConn();
//     connection.connect();
//     const query = 'UPDATE scan_block set endBlockId= ?,updated_at = NOW() where contract_address = ? and endBlockId = ?';
//     const params = [endBlockId, contract_adr, lastScanNumber];
//     // const query = `INSERT into transfer (fromAdr,toAdr,tokenId,createTime) Values (?,?,?,NOW())`;
//     // const params = [fromAdr, toAdr, tokenId, createTime];
//     // 执行修改操作
//     connection.query(query, params, function (error, results) {
//         if (error) throw error;
//     });
//     connection.end();
// }


//修改區塊信息
function updateBlock(contract_adr, lastScanNumber, endBlockId) {
    const connection = getConn();
    return new Promise(function (resolve, reject) {
        var array = 0;
        const sql = "UPDATE scan_block set endBlockId= ?,update_at = NOW() where contract_address = ? and endBlockId = ?";
        const params = [endBlockId, contract_adr, lastScanNumber];
        connection.query(sql, params, function (err, rows, fields) {
            if (err) throw err;
            array = rows;
            resolve(array);
        });
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
            array = rows[0].endBlockId;
            resolve(array);
        });
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