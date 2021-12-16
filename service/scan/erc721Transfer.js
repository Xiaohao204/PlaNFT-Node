const Constants = require('../../config/constants');
const { contractInfo, nftInfo, updateTransaction, insertTransaction } = require('../db/plaNFT')
const ipfs = require('../network/ipfs')
const eventFilter = {
    topics: [Constants.event_topics.ERC721.Transfer]
}

const erc721Transfer = {}

erc721Transfer.startScan = async function (provider, contracts, chain_symbol) {
    const chainBlockNumber = await provider.getBlockNumber();
    await scanTransfer(contracts, chainBlockNumber, chain_symbol);
};

async function scanTransfer(contracts, chainBlockNumber, chain_symbol) {
    await Promise.all(contracts.map(async (contract) => {
        try {
            // contract address
            const contractAddr = contract.address;

            // calc scan scope
            const { end_block_id, collection_id, contract_name } = await contractInfo.getContractInfo({ contractAddr, chain_symbol });
            const startBlock = end_block_id;
            const endBlock = chainBlockNumber - startBlock > Constants.max_scan ? startBlock + Constants.max_scan : chainBlockNumber;

            // listening transfer event
            const scanResult = await contract.queryFilter(eventFilter, startBlock, endBlock);
            // resolve scanResult
            await Promise.all(scanResult.map(async (value) => {
                const toAddr = value.args['to'];
                const tokenId = value.args['tokenId'].toNumber();
                const eventBlockNumber = value.blockNumber;
                const updateParams = { contractAddr, toAddr, tokenId, eventBlockNumber, chain_symbol }
                const nftInfoDetails = await nftInfo.getNFTInfoDetails(updateParams);

                if (nftInfoDetails !== null) {
                    if (eventBlockNumber > nftInfoDetails.end_block_id) await updateTransaction(nftInfoDetails, updateParams);
                } else {
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
                        title: null,
                        is_frozen: 1,
                        tokenURI: null,
                        data: null,
                        chain_symbol
                    }
                    let tokenURI = '';
                    try {
                        tokenURI = await contract.tokenURI(tokenId);
                    } catch (err) {
                        console.log('chain_symbol:%s contractAddress:%s tokenID:%d URI query for nonexistent token!', chain_symbol, contractAddr, tokenId)
                    }

                    if (tokenURI !== '') {
                        const url = tokenURI.replace("ipfs://", Constants.ipfs.main);
                        // const url = tokenURI.replace("ipfs://", Constants.ipfs.test);
                        ipfs.getMetaData(url, async (err, data) => {
                            if (!err) {
                                metadata = JSON.parse(data);
                                nftInfoData.description = metadata.description !== undefined ? metadata.description.toString() : null;
                                nftInfoData.properties = metadata.attributes !== undefined ? JSON.stringify(metadata.attributes) : null;
                                nftInfoData.imageUrl = metadata.image !== undefined ? metadata.image.toString().replace("ipfs://", Constants.ipfs.main) : null;
                                nftInfoData.title = metadata.name !== undefined ? metadata.name : contract_name + " #" + tokenId;
                                nftInfoData.tokenURI = tokenURI;
                                nftInfoData.data = data;
                                await insertTransaction(nftInfoData);
                            }
                        });
                    } else {
                        await insertTransaction(nftInfoData);
                    }
                }
            }));
            await contractInfo.setLastNumber([endBlock, contractAddr, end_block_id, chain_symbol]);
            console.log('chainSymbol:%s contractAddr:%s startBlockId:%d endBlockId:%d success count:%d \n', chain_symbol, contractAddr, startBlock, endBlock, scanResult.length);
        } catch (error) {
            console.log('scanTransfer error:%s \n', error)
        }
    }));
}

module.exports = erc721Transfer;
