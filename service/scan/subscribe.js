const Constants = require('../../config/constants');
const { collection, nftInfo, updateTransaction, insertTransaction, deleteTransaction } = require('../db/plaNFT')
const eth = require('../../utils/eth')
const ipfs = require('../network/ipfs')
const ethers = require("ethers")
const eventFilter = {
    topics: [Constants.event_topics.ERC721.Transfer]
}
const interfaceId_erc721 = '0x80ac58cd';
const subscribe = {}

subscribe.startScan = async function (provider, chain_symbol) {
    provider.on(eventFilter, async (result) => {
        try {
            const contractAddr = result.address;
            const blockNumber = result.blockNumber;
            const txHash = result.transactionHash;
            const contract = await eth.connContract(contractAddr);
            const isErc721 = await contract.supportsInterface(interfaceId_erc721).then(res => { return res });
            if (isErc721) {
                const scanResult = await contract.queryFilter(eventFilter, blockNumber, blockNumber);
                const contractName = await contract.name().then(res => { return res });
                const owner = await contract.owner().then(res => { return res });
                await Promise.all(scanResult.map(async (value) => {
                    try {
                        const toAddr = value.args['to'];
                        const tokenId = value.args['tokenId'].toString();
                        const updateParams = { contractAddr, toAddr, tokenId, blockNumber, chain_symbol, txHash }
                        const nftInfoDetails = await nftInfo.getNFTInfoDetails(updateParams);
                        if (nftInfoDetails !== null) {
                            if (blockNumber > nftInfoDetails.end_block_id) {
                                toAddr === ethers.constants.AddressZero
                                    ? await deleteTransaction(nftInfoDetails, updateParams)
                                    : await updateTransaction(nftInfoDetails, updateParams);
                            }
                        } else {
                            const collectionParams = {
                                contractName,
                                collectionName: contractName + '-' + contractAddr,
                                owner,
                                contractAddr,
                                chain_symbol,
                                blockNumber
                            };
                            let collection_id = await collection.getCollectionInfo(collectionParams);
                            if (collection_id === null) {
                                collection_id = await collection.insertNewCollection(collectionParams);
                                console.log('insert newCollection:%s success!', collectionParams)
                            }
                            if (toAddr !== ethers.constants.AddressZero) {
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
                                    data: null,
                                    type: 3,
                                    chain_symbol
                                }
                                let tokenURI = await contract.tokenURI(tokenId);
                                if (tokenURI !== '') {
                                    try {
                                        // const url = tokenURI.replace("ipfs://", Constants.ipfs.main).trim();
                                        const url = tokenURI.replace("ipfs://", Constants.ipfs.test).trim();
                                        ipfs.getMetaData(url, async (err, data) => {
                                            if (err === null) {
                                                try {
                                                    metadata = JSON.parse(data);
                                                } catch (error) {
                                                    try {
                                                        metadata = JSON.parse(data.body);
                                                    } catch (error) {
                                                        console.log('parse data error!');
                                                    }
                                                }
                                                nftInfoData.description = metadata.description !== undefined ? metadata.description.toString() : null;
                                                nftInfoData.properties = metadata.attributes !== undefined ? JSON.stringify(metadata.attributes) : null;
                                                nftInfoData.imageUrl = metadata.image !== undefined ? metadata.image.toString().replace("ipfs://", Constants.ipfs.main) : null;
                                                nftInfoData.animationUrl = metadata.animation_url !== undefined ? metadata.animation_url.toString().replace("ipfs://", Constants.ipfs.main) : null;
                                                nftInfoData.title = metadata.name !== undefined ? metadata.name : contract_name + " #" + tokenId;
                                                nftInfoData.tokenURI = tokenURI;
                                                nftInfoData.data = metadata.toString();
                                                if (nftInfoData.animationUrl !== null) {
                                                    nftInfoData.type = 4;
                                                }
                                                await insertTransaction(nftInfoData);
                                                console.log('insert newNftInfo:%s success!', nftInfoData)
                                            }
                                        })
                                    } catch (error) {
                                        console.log('tokenURI:%s call error!', tokenURI)
                                    };
                                } else {
                                    await insertTransaction(nftInfoData);
                                    console.log('insert newNftInfo:%s success!', nftInfoData)
                                }
                            }
                        }
                    } catch (error) {
                        console.log('value:%s parse error!', value)
                    }
                }))
            }
        } catch (error) {
            console.log('contractAddr:%s not erc721!', result.address)
        }
    })
};

module.exports = subscribe;
