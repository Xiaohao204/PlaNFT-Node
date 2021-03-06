const Constants = require('../../config/constants');
const { contractPlatform, nftInfo } = require('../db/plaNFT')
const ipfs = require('../network/ipfs')
const eth = require('../../utils/eth')
const eventFilter = {
    topics: [Constants.event_topics.ERC721.SetTokenURI]
}

const plaNFtSetTokenURI = {}

plaNFtSetTokenURI.startScan = async function (provider, contractAddressList, chain_symbol) {
    const chainBlockNumber = await provider.getBlockNumber();
    await scanSetTokenURI(contractAddressList, chainBlockNumber, chain_symbol);
};

async function scanSetTokenURI(contractAddressList, chainBlockNumber, chain_symbol) {
    await Promise.all(contractAddressList.map(async (contractAddr) => {
        try {
            const contract = await eth.instanceContracts(contractAddr);

            // calc scan scope
            const startBlock = await contractPlatform.getLastNumber([contractAddr, chain_symbol]);
            const endBlock = chainBlockNumber - startBlock > Constants.max_scan ? startBlock + Constants.max_scan : chainBlockNumber;

            // listening transfer event
            const scanResult = await contract.queryFilter(eventFilter, startBlock, endBlock);
            // resolve scanResult
            await Promise.all(scanResult.map(async (value) => {
                try {
                    const tokenId = value.args['tokenId'].toString();
                    const tokenURI = value.args['tokenURI'];
                    if (tokenURI !== '') {
                        const url = tokenURI.replace("ipfs://", Constants.ipfs.main).trim();
                        // const url = tokenURI.replace("ipfs://", Constants.ipfs.test).trim();
                        ipfs.getMetaData(url, async (err, data) => {
                            if (err === null) {
                                try {
                                    metadata = JSON.parse(data);
                                } catch (error) {
                                    metadata = JSON.parse(data.body);
                                }
                                const nftInfoData = {
                                    contractAddr,
                                    tokenId,
                                    description: (metadata.description !== undefined && metadata.description !== null) ? metadata.description.toString() : null,
                                    properties: (metadata.attributes !== undefined && metadata.attributes !== null) ? JSON.stringify(metadata.attributes) : null,
                                    imageUrl: (metadata.image !== undefined && metadata.image !== null) ? metadata.image.toString().replace("ipfs://", Constants.ipfs.main) : null,
                                    animationUrl: (metadata.animation_url !== undefined && metadata.animation_url !== null) ? metadata.animation_url.toString().replace("ipfs://", Constants.ipfs.main) : null,
                                    title: (metadata.name !== undefined && metadata.name !== null) ? metadata.name : contract_name + " #" + tokenId,
                                    tokenURI,
                                    is_frozen: 1,
                                    chain_symbol
                                }
                                console.log(nftInfoData)
                                await nftInfo.updateNFTInfoBySetTokenURI(nftInfoData);
                            } else {
                                console.log(err)
                            }
                        });
                    }
                } catch (error) {
                    console.log('chainSymbol:%s SetTokenUri error:%s', chain_symbol, error)
                }
            }));
            await contractPlatform.setLastNumber([endBlock, contractAddr, startBlock, chain_symbol]);
            console.log('SetTokenUri chainSymbol:%s contractAddr:%s startBlockId:%d endBlockId:%d success count:%d \n', chain_symbol, contractAddr, startBlock, endBlock, scanResult.length);
        } catch (error) {
            console.log('scanTransfer error:%s \n', error)
        }
    }));
}

module.exports = plaNFtSetTokenURI;
