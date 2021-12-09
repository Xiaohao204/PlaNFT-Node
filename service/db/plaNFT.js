const contractInfo = require('../db/contractInfo');
const contractPlatform = require('../db/contractPlatform');
const nftInfo = require('../db/nftInfo');
const salesInfo = require('../db/salesInfo');
const listing = require('../db/listing');
const offer = require('../db/offer');
const mysql = require('../../config/mysql');
const listingExpiration = require('../db/listingExpiration');
const dutchAuctionSale = require('../db/dutchAuctionSale');

const updateTransaction = function (params) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            connection.beginTransaction();
            try {
                nftInfo.updateNFTInfo(connection, params);
                salesInfo.updateSaleInfo(connection, params);
                listing.delListing(connection, params);
                offer.delOffer(connection, params);
                listingExpiration.delSale(connection, params);
                dutchAuctionSale.delSdale(connection, params);
                connection.commit();
            } catch (error) {
                console.log('updateTransaction error:%s \n', error)
                connection.rollback();
            } finally {
                connection.release();
            }
        })
    });
}

const insertTransaction = async (nftInfoData) => {
    mysql.getConnection(async function (err, connection) {
        connection.beginTransaction();
        try {
            const salesId = await salesInfo.insertSaleInfo(connection, nftInfoData.toAddr);
            nftInfoData.salesId = salesId;
            nftInfo.insertNFTInfo(connection, nftInfoData);
            connection.commit();
        } catch (error) {
            console.log('updateTransaction error:%s \n', error)
            connection.rollback();
        } finally {
            connection.release();
        }
    })
}

const plaNFTDB = {
    contractInfo,
    contractPlatform,
    nftInfo,
    salesInfo,
    listing,
    offer,
    updateTransaction,
    insertTransaction
}



module.exports = plaNFTDB