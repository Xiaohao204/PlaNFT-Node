

let getConn = require('../config/dbconn');

// 修改nft的ower信息
async function actionUpdateNFTInfo(contract_adr, toAdr, tokenId) {
    const connection = getConn();
    connection.connect();
    var query = 'UPDATE nft_info SET user_address = ?,updated_at = NOW() WHERE contract_address = ? and token_id =?';
    var params = [toAdr, contract_adr, tokenId];
    connection.query(query, params, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
        console.log('----------UPDATE-------------');
        console.log('UPDATE affectedRows', result.affectedRows);
    });
    connection.end();
}


// 修改销售订单数据
async function actionUpdateSale(contract_adr, toAdr, tokenId) {
    const connection = getConn();
    connection.connect();
    const query = 'update sales_info set user_address = ?, status = 0, sale_method = null, price_starts = null, current_price = null, reserve_price = null, last_traded = now(), updated_at = now() where id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?)';
    const params = [toAdr, contract_adr, tokenId];
    connection.query(query, params, function (error, results) {
        console.log('to: \n tokenId: \n', toAdr, tokenId)
        if (error) throw error;
    });
    connection.end();
}

// 删除订单数据
async function actionDelListing(contract_adr, tokenId) {
    const connection = getConn();
    connection.connect();
    const query = 'delete from listing where sales_id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?)';
    const params = [contract_adr, tokenId];
    connection.query(query, params, function (error, results) {
        if (error) throw error;
    });
    connection.end();
}


// 删除offer数据
async function actionDelOffer(contract_adr, toAdr, tokenId) {
    const connection = getConn();
    connection.connect();
    const query = 'delete from offer where sales_id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?) and from_address = ?';
    const params = [contract_adr, tokenId, toAdr];
    connection.query(query, params, function (error, results) {
        if (error) throw error;
    });
    connection.end();
}

// 查询NFT的合约返回出去
async function actionGetNFTInfo(callback) {
    const connection = getConn();
    connection.connect();
    // 查询 SQL
    const query = `SELECT contract_address from nft_info group by contract_address`;
    const params = [];
    connection.query(query, params, (err, rows) => {
        if (err) {
            return { msg: err };
        }
        // console.log(`result=>`, JSON.stringify(rows));
        callback(rows);
    });
    connection.end();
}


module.exports = {
    actionGetNFTInfo,
    actionUpdateNFTInfo,
    actionUpdateSale,
    actionDelListing,
    actionDelOffer
};

