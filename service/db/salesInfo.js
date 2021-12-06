const salesInfo = {}

salesInfo.updateSaleInfo = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'update sales_info set user_address = ?, status = 0, sale_method = null, price_starts = null, current_price = null, reserve_price = null, last_traded = now() where id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?)';
        connection.query(sql, [params.toAddr, params.contractAddr, params.tokenId], function (err, result) {
            if (err) throw err;
            resolve(result.changedRows === 1);
        });
    })
}

salesInfo.insertSaleInfo = async (connection, params) => {
    return new Promise(function (resolve, reject) {
        const sql = 'INSERT into sales_info (user_Address,type,status,collect_num,viewed_num,is_bundle) Values (?,?,?,?,?,?)';
        connection.query(sql, [params.toAddr, params.type, params.status, params.collectNum, params.viewedNum, params.is_bundle], function (err, result) {
            connection.query("SELECT LAST_INSERT_ID();", function (err, data) {
                if (err) throw err;
                resolve(data[0]['LAST_INSERT_ID()']);
            });
        });
    })
}

module.exports = salesInfo