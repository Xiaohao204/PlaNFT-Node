const Constants = require('../../config/constants');
const plaNFTDB = require('../db/plaNFT')
const eth = require('../../utils/eth')
const ipfs = require('../network/ipfs')
const telegram = require('../network/telegram')
const ethers = require("ethers")
const eventFilter = {
    topics: [Constants.event_topics.ERC721.Transfer]
}

const erc721Transfer = {}

erc721Transfer.startScan = async function (provider, contractAddressList, chainConstants) {
    const chainBlockNumber = await provider.getBlockNumber();
    await scanTransfer(contractAddressList, chainBlockNumber, chainConstants);
};

async function scanTransfer(contractAddressList, chainBlockNumber, chainConstants) {
    const chain_symbol = chainConstants.chain_symbol;
    const contractList = chainConstants.contractList;
    await Promise.all(contractAddressList.map(async (contractAddr) => {
        try {
            const contract = await eth.instanceContracts(contractAddr);
            // calc scan scope
            const { end_block_id, collection_id, contract_name } = await plaNFTDB.contractInfo.getContractInfo({ contractAddr, chain_symbol });
            const startBlock = end_block_id;
            const endBlock = chainBlockNumber - startBlock > Constants.max_scan ? startBlock + Constants.max_scan : chainBlockNumber;
            // listening transfer event
            const scanResult = await contract.queryFilter(eventFilter, startBlock, endBlock);
            // resolve scanResult
            await Promise.all(scanResult.map(async (value) => {
                try {
                    const toAddr = value.args['to'];
                    const tokenId = value.args['tokenId'].toString();
                    const eventBlockNumber = value.blockNumber;
                    const txHash = value.transactionHash;
                    const updateParams = { contractAddr, toAddr, tokenId, eventBlockNumber, chain_symbol, txHash }
                    const nftInfoDetails = await plaNFTDB.nftInfo.getNFTInfoDetails(updateParams);
                    if (nftInfoDetails !== null) {
                        if (eventBlockNumber > nftInfoDetails.end_block_id) {
                            toAddr === ethers.constants.AddressZero
                                ? await plaNFTDB.deleteTransaction(nftInfoDetails, updateParams)
                                : await plaNFTDB.updateTransaction(nftInfoDetails, updateParams, contractList);
                        }
                    } else {
                        if (toAddr !== ethers.constants.AddressZero) {
                            let nftInfoData = {
                                salesId: 0,
                                blockNumber: eventBlockNumber,
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
                                    const url = tokenURI.replace("ipfs://", Constants.ipfs.main).trim();
                                    // const url = tokenURI.replace("ipfs://", Constants.ipfs.test).trim();
                                    ipfs.getMetaData(url, async (err, data) => {
                                        if (err === null) {
                                            let metadata = null;
                                            try {
                                                metadata = JSON.parse(data);
                                            } catch (error) {
                                                try {
                                                    metadata = JSON.parse(data.body);
                                                } catch (error) {
                                                }
                                            }
                                            if (metadata != null) {
                                                nftInfoData.description = (metadata.description !== undefined && metadata.description !== null) ? metadata.description.toString() : null;
                                                nftInfoData.properties = (metadata.attributes !== undefined && metadata.attributes !== null) ? JSON.stringify(metadata.attributes) : null;
                                                nftInfoData.imageUrl = (metadata.image !== undefined && metadata.image !== null) ? metadata.image.toString().replace("ipfs://", Constants.ipfs.main) : null;
                                                nftInfoData.animationUrl = (metadata.animation_url !== undefined && metadata.animation_url !== null) ? metadata.animation_url.toString().replace("ipfs://", Constants.ipfs.main) : null;
                                                nftInfoData.title = (metadata.name !== undefined && metadata.name !== null) ? metadata.name : contract_name + " #" + tokenId;
                                                nftInfoData.tokenURI = tokenURI;
                                                if (nftInfoData.animationUrl !== null) nftInfoData.type = 4;
                                            }
                                        }
                                        await plaNFTDB.insertNftTransaction(nftInfoData);
                                    })
                                } else {
                                    await plaNFTDB.insertNftTransaction(nftInfoData);
                                }
                            } catch (error) {
                                await plaNFTDB.insertNftTransaction(nftInfoData);
                            }
                        }
                    }
                } catch (error) {
                    telegram.warningNews(Constants.telegram.userName, contractAddr + ' ' + chain_symbol + ' transfer parse error', error.toString())
                }
            }));
            await plaNFTDB.contractInfo.setLastNumber([endBlock, contractAddr, end_block_id, chain_symbol]);
            console.log('Transfer %s %s %d %d success count:%d \n', chain_symbol, contractAddr, startBlock, endBlock, scanResult.length);
        } catch (error) {
            if (!error.toString().startsWith('Error: Invalid JSON RPC response')) {
                telegram.warningNews(Constants.telegram.userName, contractAddr + ' ' + chain_symbol + ' listen transfer error', error.toString())
            }
        }
    }))
}

module.exports = erc721Transfer;