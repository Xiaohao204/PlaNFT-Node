const Constants = require('../../config/constants');
const { contractPlatform, nftInfo, contractInfo } = require('../db/plaNFT')
const ipfs = require('../network/ipfs')
const eventFilter = {
    topics: [Constants.event_topics.ERC721.SetTokenURI]
}

const plaNFtSetTokenURI = {}

plaNFtSetTokenURI.startScan = async function (provider, contracts) {
    const chainBlockNumber = await provider.getBlockNumber();
    await scanSetTokenURI(contracts, chainBlockNumber);
};

async function scanSetTokenURI(contracts, chainBlockNumber) {
    await Promise.all(contracts.map(async (contract) => {
        try {
            // contract address
            const contractAddr = contract.address;
            // const { contract_name } = await contractInfo.getContractInfo(contractAddr);

            // calc scan scope
            const startBlock = await contractPlatform.getLastNumber(contractAddr);
            const endBlock = chainBlockNumber - startBlock > Constants.max_scan ? startBlock + Constants.max_scan : chainBlockNumber;

            // listening transfer event
            const scanResult = await contract.queryFilter(eventFilter, startBlock, endBlock);
            // resolve scanResult
            await Promise.all(scanResult.map(async (value) => {
                const tokenId = parseInt(value.args['tokenId']._hex);
                const tokenURI = value.args['tokenURI'];
                if (tokenURI !== '') {
                    const url = tokenURI.replace("ipfs://", Constants.ipfs.main);
                    // const url = tokenURI.replace("ipfs://", Constants.ipfs.test);
                    ipfs.getMetaData(url, async (err, data) => {
                        if (!err) {
                            metadata = JSON.parse(data);
                            const nftInfoData = {
                                contractAddr,
                                tokenId,
                                description: metadata.description !== undefined ? metadata.description.toString() : null,
                                properties: metadata.attributes !== undefined ? JSON.stringify(metadata.attributes) : null,
                                imageUrl: metadata.image !== undefined ? metadata.image.toString().replace("ipfs://", Constants.ipfs.main) : null,
                                title: metadata.name !== undefined ? metadata.name : contract_name + " #" + tokenId,
                                tokenURI,
                                is_frozen: 1,
                                data: data
                            }
                            await nftInfo.updateNFTInfoBySetTokenURI(nftInfoData);
                        }
                    });
                }
            }));
            await contractPlatform.setLastNumber([endBlock, contractAddr, startBlock]);
            console.log('contractAddr:%s startBlockId:%d endBlockId:%d success count:%d \n', contractAddr, startBlock, endBlock, scanResult.length);
        } catch (error) {
            console.log('scanTransfer error:%s \n', error)
        }
    }));
}

module.exports = plaNFtSetTokenURI;
