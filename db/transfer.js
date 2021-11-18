let getConn = require('../config/dbconn');

//修改nft信息
function updateNFTInfo(contract_adr, toAdr, tokenId) {
    const connection = getConn();
    return new Promise(function (resolve, reject) {
        var array = 0;
        var query = 'UPDATE nft_info SET user_address = ?,updated_at = NOW() WHERE contract_address = ? and token_id =?';
        var params = [toAdr, contract_adr, tokenId];
        connection.query(query, params, function (err, rows, fields) {
            if (err) throw err;
            array = rows;
            resolve(array);
        });
        connection.end();
    })
}

const actionUpdateNFTInfo = async (contract_adr, toAdr, tokenId) => {
    var array = await updateNFTInfo(contract_adr, toAdr, tokenId);
    return array;
}

//修改Sale信息
function updateSale(contract_adr, toAdr, tokenId) {
    const connection = getConn();
    return new Promise(function (resolve, reject) {
        var array = 0;
        const query = 'update sales_info set user_address = ?, status = 0, sale_method = null, price_starts = null, current_price = null, reserve_price = null, last_traded = now(), updated_at = now() where id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?)';
        const params = [toAdr, contract_adr, tokenId];
        connection.query(query, params, function (err, rows, fields) {
            if (err) throw err;
            array = rows;
            resolve(array);
        });
        connection.end();
    })
}

const actionUpdateSale = async (contract_adr, toAdr, tokenId) => {
    var array = await updateSale(contract_adr, toAdr, tokenId);
    return array;
}

// 删除订单数据
function delListing(contract_adr, tokenId) {
    const connection = getConn();
    return new Promise(function (resolve, reject) {
        var array = 0;
        const query = 'delete from listing where sales_id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?)';
        const params = [contract_adr, tokenId];
        connection.query(query, params, function (err, rows, fields) {
            if (err) throw err;
            array = rows;
            resolve(array);
        });
        connection.end();
    })
}

const actionDelListing = async (contract_adr, tokenId) => {
    var array = await delListing(contract_adr, tokenId);
    return array;
}

// 删除offer数据
function delOffer(contract_adr, toAdr, tokenId) {
    const connection = getConn();
    return new Promise(function (resolve, reject) {
        var array = 0;
        const query = 'delete from offer where sales_id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?) and from_address = ?';
        const params = [contract_adr, tokenId, toAdr];
        connection.query(query, params, function (err, rows, fields) {
            if (err) throw err;
            array = rows;
            resolve(array);
        });
        connection.end();
    })
}

const actionDelOffer = async (contract_adr, toAdr, tokenId) => {
    var array = await delOffer(contract_adr, toAdr, tokenId);
    return array;
}

// 查询NFT的合约地址信息
function getNFTInfo() {
    const connection = getConn();
    return new Promise(function (resolve, reject) {
        var array = new Array();;
        const sql = "SELECT contract_address from scan_block";
        const params = [];
        connection.query(sql, params, function (err, rows, fields) {
            if (err) throw err;
            // array = rows[0].contract_address;
            array = [];
            for (var i = 0; i < rows.length; i++) {
                array.push(rows[i].contract_address);
            }
            resolve(array);
        });
        connection.end();
    })
}


const actionGetNFTInfo = async () => {
    var array = await getNFTInfo();
    return array;
}


module.exports = {
    actionGetNFTInfo,
    actionUpdateNFTInfo,
    actionUpdateSale,
    actionDelListing,
    actionDelOffer
};

