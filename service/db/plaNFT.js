const contractInfo = require('../db/contractInfo');
const contractPlatform = require('../db/contractPlatform');
const nftInfo = require('../db/nftInfo');
const salesInfo = require('../db/salesInfo');
const listing = require('../db/listing');
const offer = require('../db/offer');
const mysql = require('../../config/mysql');
const listingExpiration = require('../db/listingExpiration');
const dutchAuctionSale = require('../db/dutchAuctionSale');

const updateTransaction = function (nftInfoDetails, updateParams) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            try {
                connection.beginTransaction();
                nftInfo.updateNFTInfo(connection, updateParams, nftInfoDetails);
                salesInfo.updateSaleInfo(connection, nftInfoDetails, updateParams);
                listing.delListing(connection, nftInfoDetails);
                offer.delOffer(connection, nftInfoDetails, updateParams);
                listingExpiration.delSale(connection, nftInfoDetails);
                dutchAuctionSale.delSale(connection, nftInfoDetails);
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
        try {
            connection.beginTransaction();
            const salesId = await salesInfo.insertSaleInfo(connection, nftInfoData);
            nftInfoData.salesId = salesId;
            await nftInfo.insertNFTInfo(connection, nftInfoData);
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