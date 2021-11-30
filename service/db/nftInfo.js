const mysql = require('../../config/mysql');

const nftInfo = {}

nftInfo.updateNFTInfo = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'UPDATE nft_info SET end_block_id=?,user_address = ? WHERE contract_address = ? and token_id =?';
        connection.query(sql, [params.eventBlockNumber, params.toAddr, params.contractAddr, params.tokenId], function (err, result) {
            if (err) throw err;
            resolve(result.changedRows === 1);
        });
    })
}

nftInfo.insertNFTInfo = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'INSERT into nft_info (sales_id,end_block_id,collection_id,token_id,contract_address,user_address,description,properties,image_url,title,is_frozen,token_uri,metadata) Values (?,?,?,?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE end_block_id=VALUES(end_block_id)';
        connection.query(sql, [params.salesId, params.blockNumber, params.collection_id, params.tokenId, params.contractAddr, params.toAddr,
        params.description, params.properties, params.imageUrl, params.title, params.is_frozen, params.tokenURI, params.data], function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    })
}

nftInfo.getNFTInfoBlockNumber = async (params) => {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT end_block_id from nft_info where contract_address = ? and token_id =?";
            connection.query(sql, [params.contractAddr, params.tokenId], function (err, result) {
                if (err) throw err;
                resolve(result.length === 0 ? 0 : result[0].end_block_id);
            });
            connection.release();
        })
    })
}

module.exports = nftInfo


