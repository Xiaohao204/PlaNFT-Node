const salesInfo = {}

salesInfo.deleteSaleInfo = function (connection, nftInfoDetails, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'delete from sales_info where id = ? and chain_symbol=?';
        connection.query(sql, [nftInfoDetails.sales_id, params.chain_symbol], function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    })
}

salesInfo.updateSaleInfo = function (connection, nftInfoDetails, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'update sales_info set user_address = ?, status = 0, sale_method = null, price_starts = null, current_price = null, reserve_price = null, last_traded = now() where id = ? and chain_symbol=?';
        connection.query(sql, [params.toAddr, nftInfoDetails.sales_id, params.chain_symbol], function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    })
}

salesInfo.insertSaleInfo = async (connection, params) => {
    return new Promise(function (resolve, reject) {
        const sql = 'INSERT into sales_info (user_Address,type,status,is_bundle,last_traded,chain_symbol,collection_id) Values (?,?,0,0,now(),?,?)';
        connection.query(sql, [params.toAddr, params.type, params.chain_symbol,params.collection_id], function (err, result) {
            connection.query("SELECT LAST_INSERT_ID();", function (err, data) {
                if (err) reject(err);
                resolve(data[0]['LAST_INSERT_ID()']);
            });
        });
    })
}

module.exports = salesInfo