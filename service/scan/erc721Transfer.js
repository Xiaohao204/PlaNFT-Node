const Constants = require('../../config/constants');
const { contractInfo, nftInfo, updateTransaction, insertTransaction, deleteTransaction } = require('../db/plaNFT')
const eth = require('../../utils/eth')
const ipfs = require('../network/ipfs')
const ethers = require("ethers")
const eventFilter = {
    topics: [Constants.event_topics.ERC721.Transfer]
}

const erc721Transfer = {}

erc721Transfer.startScan = async function (provider, contractAddressList, chain_symbol) {
    const chainBlockNumber = await provider.getBlockNumber();
    scanTransfer(contractAddressList, chainBlockNumber, chain_symbol);
};

async function scanTransfer(contractAddressList, chainBlockNumber, chain_symbol) {
    contractAddressList.map(async (contractAddr) => {
        try {
            const contract = await eth.instanceContracts(contractAddr);
            // calc scan scope
            const { end_block_id, collection_id, contract_name } = await contractInfo.getContractInfo({ contractAddr, chain_symbol });
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
                    const nftInfoDetails = await nftInfo.getNFTInfoDetails(updateParams);
                    if (nftInfoDetails !== null) {
                        if (eventBlockNumber > nftInfoDetails.end_block_id) {
                            toAddr === ethers.constants.AddressZero
                                ? await deleteTransaction(nftInfoDetails, updateParams)
                                : await updateTransaction(nftInfoDetails, updateParams);;
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
                                data: null,
                                type: 3,
                                chain_symbol
                            }
                            let tokenURI = await contract.tokenURI(tokenId);
                            if (tokenURI !== '') {
                                try {
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
                                                nftInfoData.data = metadata.toString();
                                                if (nftInfoData.animationUrl !== null) nftInfoData.type = 4;
                                            }
                                            await insertTransaction(nftInfoData);
                                        }
                                    })
                                } catch (error) {
                                    console.log('getMetaData error:', error)
                                };
                            } else {
                                await insertTransaction(nftInfoData);
                            }
                        }
                    }
                } catch (error) {
                    console.log('parse data error:%s', error)
                }
            }));
            await contractInfo.setLastNumber([endBlock, contractAddr, end_block_id, chain_symbol]);
            console.log('Transfer chainSymbol:%s contractAddr:%s startBlockId:%d endBlockId:%d success count:%d \n', chain_symbol, contractAddr, startBlock, endBlock, scanResult.length);
        } catch (error) {
            console.log('listen transfer error:%s \n', error)
        }
    });
}

module.exports = erc721Transfer;
