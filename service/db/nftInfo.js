const mysql = require('../../config/mysql');
const telegram = require('../network/telegram')

const nftInfo = {}

nftInfo.deleteNFTInfo = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'delete from nft_info WHERE contract_address = ? and token_id =? and chain_symbol=?';
        connection.query(sql, [params.contractAddr, params.tokenId, params.chain_symbol], function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    })
}

nftInfo.updateNFTInfo = function (connection, params, nftInfoDetails) {
    return new Promise(function (resolve, reject) {
        const sql = 'UPDATE nft_info SET end_block_id=?,user_address = ? WHERE contract_address = ? and token_id =? and chain_symbol=?';
        connection.query(sql, [params.blockNumber, params.toAddr, params.contractAddr, params.tokenId, params.chain_symbol], function (err, result) {
            if (err) reject(err);
            telegram.changeOwnerNews(params, nftInfoDetails)
            resolve(result);
        });
    })
}

nftInfo.updateNFTInfoBySetTokenURI = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = 'UPDATE nft_info SET description = ?,properties=?,image_url=?,title=?,token_uri=?,is_frozen=?,metadata=? WHERE contract_address = ? and token_id =? and chain_symbol=?';
            connection.query(sql, [params.description, params.properties, params.imageUrl, params.title, params.tokenURI, params.is_frozen, params.data, params.contractAddr, params.tokenId, params.chain_symbol], function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
            connection.release();
        })
    })
}

nftInfo.insertNFTInfo = function (connection, params) {
    return new Promise(function (resolve, reject) {
        const sql = 'INSERT into nft_info (sales_id,end_block_id,collection_id,token_id,contract_address,user_address,description,properties,image_url,animation_url,title,is_frozen,token_uri,chain_symbol) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        connection.query(sql, [params.salesId, params.blockNumber, params.collection_id, params.tokenId, params.contractAddr, params.toAddr,
        params.description, params.properties, params.imageUrl, params.animationUrl, params.title, params.is_frozen, params.tokenURI, params.chain_symbol], function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    })
}

nftInfo.getNFTInfoDetails = async (params) => {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            const sql = "SELECT id,sales_id,user_address,end_block_id from nft_info where contract_address = ? and token_id =? and chain_symbol=?";
            connection.query(sql, [params.contractAddr, params.tokenId, params.chain_symbol], function (err, result) {
                if (err) reject(err);
                resolve(result.length === 0 ? null : result[0]);
            });
            connection.release();
        })
    })
}

module.exports = nftInfo


