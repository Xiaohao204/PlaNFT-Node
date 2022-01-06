const Constants = require('../../config/constants');
const plaNFTDB = require('../db/plaNFT')
const ipfs = require('../network/ipfs')
const ethers = require("ethers")
const telegram = require('../network/telegram')
const eventFilter = {
    topics: [Constants.event_topics.ERC721.Transfer]
}
const dataUtils = {}

dataUtils.dataParse = async function (contract, contractAddr, blockNumber, txHash, contractName, collection_id, owner, chain_symbol, type) {
    const scanResult = await contract.queryFilter(eventFilter, blockNumber, blockNumber);
    await Promise.all(scanResult.map(async (value) => {
        try {
            const toAddr = value.args['to'];
            const tokenId = value.args['tokenId'].toString();
            const updateParams = { contractAddr, toAddr, tokenId, blockNumber, chain_symbol, txHash }
            const nftInfoDetails = await plaNFTDB.nftInfo.getNFTInfoDetails(updateParams);
            if (nftInfoDetails !== null) {
                if (blockNumber > nftInfoDetails.end_block_id) {
                    console.log("%d %s %s", blockNumber, contractAddr, tokenId)
                    toAddr === ethers.constants.AddressZero
                        ? await plaNFTDB.deleteTransaction(nftInfoDetails, updateParams)
                        : await plaNFTDB.updateTransaction(nftInfoDetails, updateParams);
                }
            } else if (toAddr !== ethers.constants.AddressZero) {
                if (type === Constants.sourceType.chain) {
                    const collectionParams = {
                        contractName,
                        collection_id,
                        collectionName: contractName + '-' + contractAddr,
                        owner,
                        contractAddr,
                        chain_symbol,
                        blockNumber
                    };
                    await plaNFTDB.insertCollectionTransaction(collectionParams)
                    collection_id = await plaNFTDB.collection.getCollectionInfo(collectionParams)
                }
                let nftInfoData = {
                    salesId: 0,
                    blockNumber,
                    collection_id,
                    tokenId,
                    contractAddr,
                    toAddr,
                    description: null,
                    properties: null,
                    imageUrl: null,
                    animationUrl: null,
                    title: null,
                    is_frozen: 1,
                    tokenURI: null,
                    type: 3,
                    chain_symbol
                }
                try {
                    let tokenURI = await contract.tokenURI(tokenId);
                    if (tokenURI !== '') {
                        // const url = tokenURI.replace("ipfs://", Constants.ipfs.main).trim();
                        const url = tokenURI.replace("ipfs://", Constants.ipfs.test).trim();
                        ipfs.getMetaData(url, async (err, data) => {
                            if (err === null) {
                                let metadata = null;
                                try {
                                    metadata = JSON.parse(data);
                                } catch (error) {
                                    try {
                                        metadata = JSON.parse(data.body);
                                    } catch (error) {
                                        telegram.warningNews(Constants.telegram.userName, blockNumber + ' ' + chain_symbol + ' metadata to json error', error.toString())
                                    }
                                }
                                if (metadata != null) {
                                    nftInfoData.description = (metadata.description !== undefined && metadata.description !== null) ? metadata.description : null;
                                    nftInfoData.properties = (metadata.attributes !== undefined && metadata.attributes !== null) ? JSON.stringify(metadata.attributes) : null;
                                    nftInfoData.imageUrl = (metadata.image !== undefined && metadata.image !== null) ? metadata.image.toString().replace("ipfs://", Constants.ipfs.main) : null;
                                    nftInfoData.animationUrl = (metadata.animation_url !== undefined && metadata.animation_url !== null) ? metadata.animation_url.toString().replace("ipfs://", Constants.ipfs.main) : null;
                                    nftInfoData.title = (metadata.name !== undefined && metadata.name !== null) ? metadata.name : contractName + " #" + tokenId;
                                    nftInfoData.tokenURI = tokenURI;
                                    if (nftInfoData.animationUrl !== null) nftInfoData.type = 4;
                                }
                            }
                            console.log("%d %s %s", blockNumber, contractAddr, tokenId)
                            await plaNFTDB.insertNftTransaction(nftInfoData);
                        })
                    } else {
                        console.log("%d %s %s", blockNumber, contractAddr, tokenId)
                        await plaNFTDB.insertNftTransaction(nftInfoData);
                    }
                } catch (error) {
                    console.log("%d %s %s", blockNumber, contractAddr, tokenId)
                    await plaNFTDB.insertNftTransaction(nftInfoData);
                };
            }
        } catch (error) {
            telegram.warningNews(Constants.telegram.userName, blockNumber + ' ' + chain_symbol + ' dataParse error', error.toString())
        }
    }))
}

module.exports = dataUtils;