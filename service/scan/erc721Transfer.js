const Constants = require('../../config/constants');
const { contractInfo, nftInfo, updateTransaction, insertTransaction } = require('../db/plaNFT')
const ipfs = require('../network/ipfs')
const eventFilter = {
    topics: [Constants.event_topics.ERC721.Transfer]
}

const erc721Transfer = {}

erc721Transfer.startScan = async function (provider, contracts) {
    const chainBlockNumber = await provider.getBlockNumber();
    await scanTransfer(contracts, chainBlockNumber);
};

async function scanTransfer(contracts, chainBlockNumber) {
    await Promise.all(contracts.map(async (contract) => {
        try {
            // contract address
            const contractAddr = contract.address;

            // calc scan scope
            // const lastScanNumber = await contractInfo.getLastNumber(contractAddr);
            const { end_block_id, collection_id, contract_name, type } = await contractInfo.getContractInfo(contractAddr);
            const startBlock = end_block_id;
            const endBlock = chainBlockNumber - startBlock > Constants.max_scan ? startBlock + Constants.max_scan : chainBlockNumber;

            // listening transfer event
            const scanResult = await contract.queryFilter(eventFilter, startBlock, endBlock);
            // resolve scanResult
            await Promise.all(scanResult.map(async (value) => {
                const toAddr = value.args['to'];
                const tokenId = parseInt(value.args['tokenId']._hex);
                const eventBlockNumber = value.blockNumber;
                const updateParams = { contractAddr, toAddr, tokenId, eventBlockNumber }
                const nftBlockNumber = await nftInfo.getNFTInfoBlockNumber(updateParams);

                if (nftBlockNumber !== 0) {
                    if (eventBlockNumber > nftBlockNumber) await updateTransaction(updateParams);
                } else {
                    if (type === 1) {
                        const tokenURI = await contract.tokenURI(tokenId);
                        if (tokenURI !== '') {
                            const url = tokenURI.replace("ipfs://", Constants.ipfs.main);
                            // const url = tokenURI.replace("ipfs://", Constants.ipfs.test);
                            ipfs.getMetaData(url, async (err, data) => {
                                if (err) throw err;
                                const saleInfo = {
                                    toAddr,
                                    type,
                                    status: 0,
                                    collectNum: 0,
                                    viewedNum: 0
                                }
                                const metadata = JSON.parse(data);
                                const nftInfoData = {
                                    salesId: 0,
                                    blockNumber: eventBlockNumber,
                                    collection_id,
                                    tokenId,
                                    contractAddr,
                                    toAddr,
                                    description: metadata.description !== undefined ? metadata.description.toString() : NULL,
                                    properties: metadata.attributes !== undefined ? JSON.stringify(metadata.attributes) : NULL,
                                    imageUrl: metadata.image !== undefined ? metadata.image.toString().replace("ipfs://", Constants.ipfs.main) : NULL,
                                    title: metadata.name !== undefined ? metadata.name : contract_name + " #" + tokenId,
                                    is_frozen: 1,
                                    tokenURI,
                                    data
                                }
                                await insertTransaction(saleInfo, nftInfoData);
                            })
                        }
                    }
                }
            }));
            await contractInfo.setLastNumber([endBlock, contractAddr, end_block_id]);
            console.log('contractAddr:%s startBlockId:%d endBlockId:%d success count:%d \n', contractAddr, startBlock, endBlock, scanResult.length);
        } catch (error) {
            console.log('scanTransfer error:%s \n', error)
        }
    }));
}

module.exports = erc721Transfer;
