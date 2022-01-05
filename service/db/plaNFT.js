const mysql = require('../../config/mysql');
const scanNumber = require('../db/scanNumber');
const collection = require('../db/collection');
const contractInfo = require('../db/contractInfo');
const contractCache = require('../db/contractCache');
const contractPlatform = require('../db/contractPlatform');
const nftInfo = require('../db/nftInfo');
const salesInfo = require('../db/salesInfo');
const listing = require('../db/listing');
const offer = require('../db/offer');
const listingExpiration = require('../db/listingExpiration');
const dutchAuctionSale = require('../db/dutchAuctionSale');
const illegalErc721 = require('../db/illegalErc721');
const erc721Transfer = require('../db/erc721Transfer');

const deleteTransaction = function (nftInfoDetails, deleteParams) {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(function (err, connection) {
            try {
                connection.beginTransaction();
                nftInfo.deleteNFTInfo(connection, deleteParams);
                salesInfo.deleteSaleInfo(connection, nftInfoDetails, deleteParams);
                listing.delListing(connection, nftInfoDetails);
                offer.delOffer(connection, nftInfoDetails, deleteParams);
                listingExpiration.delSale(connection, nftInfoDetails);
                dutchAuctionSale.delSale(connection, nftInfoDetails);
                connection.commit();
            } catch (error) {
                connection.rollback();
                // console.log('deleteTransaction:', error)
            } finally {
                connection.release();
            }
        })
    });
}

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
                connection.rollback();
                // console.log('updateTransaction:', error)
            } finally {
                connection.release();
            }
        })
    });
}

const insertNftTransaction = async (nftInfoData) => {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(async function (err, connection) {
            try {
                connection.beginTransaction();
                nftInfoData.salesId = await salesInfo.insertSaleInfo(connection, nftInfoData);
                await nftInfo.insertNFTInfo(connection, nftInfoData);
                connection.commit();
            } catch (error) {
                connection.rollback();
                // console.log('insertNftTransaction:', error)
            } finally {
                connection.release();
            }
        })
    })
}

const insertCollectionTransaction = async (insertParams) => {
    return new Promise(function (resolve, reject) {
        mysql.getConnection(async function (err, connection) {
            try {
                connection.beginTransaction();
                insertParams.collection_id = await collection.insertNewCollection(connection, insertParams);
                await contractInfo.insertNewContract(connection, insertParams);
                connection.commit();
            } catch (error) {
                connection.rollback();
                // console.log('insertCollectionTransaction:', error)
            } finally {
                connection.release();
            }
        })
    })
}

const plaNFTDB = {
    scanNumber,
    collection,
    contractInfo,
    contractCache,
    contractPlatform,
    nftInfo,
    salesInfo,
    listing,
    offer,
    erc721Transfer,
    illegalErc721,
    updateTransaction,
    insertNftTransaction,
    insertCollectionTransaction,
    deleteTransaction
}



module.exports = plaNFTDB