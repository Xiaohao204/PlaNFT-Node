
let getConn = require('../config/dbconn');

// 修改nft的ower信息
async function actionUpdateLastScan(contract_adr, lastScanNumber, endBlockId) {
    const connection = getConn();
    connection.connect();
    const query = 'UPDATE scan_block set lastScanNumber= ?, endBlockId= ?,updated_at = NOW() where contract_address = ?';
    const params = [lastScanNumber, endBlockId, contract_adr];
    // const query = `INSERT into transfer (fromAdr,toAdr,tokenId,createTime) Values (?,?,?,NOW())`;
    // const params = [fromAdr, toAdr, tokenId, createTime];
    // 执行修改操作
    connection.query(query, params, function (error, results) {
        if (error) throw error;
    });
    connection.end();
}