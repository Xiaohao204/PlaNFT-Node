let configs = require('../config/constants');

//插入nft信息
function newNFTInfo(sales_id, collectionId, tokenId, contract_adr, userAddress, description, properties, image_url, title, is_frozen, tokenURI, metadata) {
    return new Promise(function (resolve, reject) {
        configs.dbpool.getConnection(function (err, connection) {
            var array = 0;
            var query = 'INSERT into nft_info (sales_id,collection_id,token_id,contract_address,user_address,description,properties,image_url,title,is_frozen,token_uri,metadata) Values (?,?,?,?,?,?,?,?,?,?,?,?)';
            var params = [sales_id, collectionId, tokenId, contract_adr, userAddress, description, properties, image_url, title, is_frozen, tokenURI, metadata];
            connection.query(query, params, function (err, rows, fields) {
                if (err) throw err;
                array = rows;
                resolve(array);
            });
            connection.release();
        })
    })
}

const actionNewNFTInfo = async (sales_id, collectionId, tokenId, contract_adr, userAddress, description, properties, image_url, title, is_frozen, tokenURI, metadata) => {
    const array = await newNFTInfo(sales_id, collectionId, tokenId, contract_adr, userAddress, description, properties, image_url, title, is_frozen, tokenURI, metadata);
    return array;
}

//修改nft信息
function updateNFTInfo(contract_adr, toAdr, tokenId) {
    return new Promise(function (resolve, reject) {
        configs.dbpool.getConnection(function (err, connection) {
            var array = 0;
            var query = 'UPDATE nft_info SET user_address = ?,updated_at = NOW() WHERE contract_address = ? and token_id =?';
            var params = [toAdr, contract_adr, tokenId];
            connection.query(query, params, function (err, rows, fields) {
                if (err) throw err;
                array = rows;
                resolve(array);
            });
            connection.release();
        })
    })
}

const actionUpdateNFTInfo = async (contract_adr, toAdr, tokenId) => {
    const array = await updateNFTInfo(contract_adr, toAdr, tokenId);
    return array;
}

//插入Sale信息
function insertSale(user_Address, type, status, collect_num, viewed_num) {
    return new Promise(function (resolve, reject) {
        configs.dbpool.getConnection(function (err, connection) {
            var array = 0;
            const query = 'INSERT into sales_info (user_Address,type,status,collect_num,viewed_num,created_at) Values (?,?,?,?,?,NOW())';
            const params = [user_Address, type, status, collect_num, viewed_num];
            connection.query(query, params, function (err, rows, fields) {
                if (err) throw err;
                else {
                    connection.query("SELECT LAST_INSERT_ID();",
                        function (err, data) {
                            if (err) {
                                res.status(200).json({ ok: 0, id: 0 }).end();
                            } else {
                                resolve(data[0]['LAST_INSERT_ID()']);
                            }
                        });
                }
            });
            connection.release();
        })
    })
}

const actionInsertSale = async (user_Address, type, status, collect_num, viewed_num) => {
    const array = await insertSale(user_Address, type, status, collect_num, viewed_num);
    return array;
}


//修改Sale信息
function updateSale(contract_adr, toAdr, tokenId) {
    return new Promise(function (resolve, reject) {
        configs.dbpool.getConnection(function (err, connection) {
            var array = 0;
            const query = 'update sales_info set user_address = ?, status = 0, sale_method = null, price_starts = null, current_price = null, reserve_price = null, last_traded = now(), updated_at = now() where id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?)';
            const params = [toAdr, contract_adr, tokenId];
            connection.query(query, params, function (err, rows, fields) {
                if (err) throw err;
                array = rows;
                resolve(array);
            });
            connection.release();
        })
    })
}

const actionUpdateSale = async (contract_adr, toAdr, tokenId) => {
    const array = await updateSale(contract_adr, toAdr, tokenId);
    return array;
}

// 删除订单数据
function delListing(contract_adr, tokenId) {
    return new Promise(function (resolve, reject) {
        configs.dbpool.getConnection(function (err, connection) {
            var array = 0;
            const query = 'delete from listing where sales_id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?)';
            const params = [contract_adr, tokenId];
            connection.query(query, params, function (err, rows, fields) {
                if (err) throw err;
                array = rows;
                resolve(array);
            });
            connection.release();
        })
    })
}

const actionDelListing = async (contract_adr, tokenId) => {
    const array = await delListing(contract_adr, tokenId);
    return array;
}

// 删除offer数据
function delOffer(contract_adr, toAdr, tokenId) {
    return new Promise(function (resolve, reject) {
        configs.dbpool.getConnection(function (err, connection) {
            var array = 0;
            const query = 'delete from offer where sales_id = (SELECT sales_id FROM nft_info where contract_address = ? and token_id =?) and from_address = ?';
            const params = [contract_adr, tokenId, toAdr];
            connection.query(query, params, function (err, rows, fields) {
                if (err) throw err;
                array = rows;
                resolve(array);
            });
            connection.release();
        })
    })
}

const actionDelOffer = async (contract_adr, toAdr, tokenId) => {
    const array = await delOffer(contract_adr, toAdr, tokenId);
    return array;
}

// 查询NFT的合约地址信息
function getNFTInfo() {
    return new Promise(function (resolve, reject) {
        configs.dbpool.getConnection(function (err, connection) {
            var array = new Array();
            const sql = "SELECT contract_address from scan_block";
            const params = [];
            connection.query(sql, params, function (err, rows, fields) {
                if (err) throw err;
                array = [];
                for (var i = 0; i < rows.length; i++) {
                    array.push(rows[i].contract_address);
                }
                resolve(array);
            });
            connection.release();
        })
    })
}


const actionGetNFTInfo = async () => {
    const array = await getNFTInfo();
    return array;
}



// 查询NFT的合约地址信息
function getNFTCount(contract_adr, tokenId) {
    return new Promise(function (resolve, reject) {
        configs.dbpool.getConnection(function (err, connection) {
            const sql = "SELECT count(1) from nft_info where contract_address = ? and token_id =?";
            const params = [contract_adr, tokenId];
            connection.query(sql, params, function (err, rows, fields) {
                if (err) throw err;
                resolve(rows);
            });
            connection.release();
        })
    })
}


const actionNFTCount = async (contract_adr, tokenId) => {
    const array = await getNFTCount(contract_adr, tokenId);
    return array;
}


module.exports = {
    actionGetNFTInfo,
    actionUpdateNFTInfo,
    actionInsertSale,
    actionUpdateSale,
    actionDelListing,
    actionDelOffer,
    actionNewNFTInfo,
    actionNFTCount
};

