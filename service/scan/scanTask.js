const Constants = require('../../config/constants');
const dataUtils = require('./dataUtils');
// const { contractInfo, collection, nftInfo, updateTransaction, insertTransaction, deleteTransaction } = require('../db/plaNFT')
const plaNFTDB = require('../db/plaNFT')
const eth = require('../../utils/eth')

const interfaceId_erc721 = '0x80ac58cd';
const scanTask = {}

scanTask.startScan = async function (provider, chain_symbol, type) {
    const blockInfo = await plaNFTDB.scanNumber.getBlockInfo([chain_symbol, type]);
    for (let fromBlock = blockInfo.currentBlock; fromBlock < blockInfo.endBlock; fromBlock += Constants.max_scan) {
        const toBlock = fromBlock + Constants.max_scan;
        await provider.getLogs({
            fromBlock,
            toBlock,
            topics: [Constants.event_topics.ERC721.Transfer]
        }).then(async (res) => {
            await Promise.all(res.map(async (result) => {
                try {
                    const contractAddr = result.address;
                    const blockNumber = result.blockNumber;
                    const txHash = result.transactionHash;
                    const contract = await eth.connContract(contractAddr);
                    const contractDetails = await plaNFTDB.contractInfo.getContractInfo({ contractAddr, chain_symbol });
                    if (contractDetails != null) {
                        await dataUtils.dataParse(contract, contractAddr, blockNumber, txHash,
                            contractDetails.contract_name, contractDetails.collection_id, contractDetails.owner, chain_symbol, Constants.sourceType.database);
                    } else {
                        const illegalFlag = await plaNFTDB.illegalErc721.getAddress({ contractAddr, chain_symbol });
                        if (!illegalFlag) {
                            try {
                                const isErc721 = await contract.supportsInterface(interfaceId_erc721).then(res => { return res });
                                if (isErc721) {
                                    const contractName = await contract.name().then(res => { return res });
                                    const owner = await contract.owner().then(res => { return res });
                                    await dataUtils.dataParse(contract, contractAddr, blockNumber, txHash, contractName, 0, owner, chain_symbol, Constants.sourceType.chain)
                                }
                            } catch (error) {
                                if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
                                    await plaNFTDB.illegalErc721.insertNewAddress({ contractAddr, chain_symbol });
                                } else {
                                    console.log(JSON.stringify(error))
                                }
                            }
                        } else {
                            console.log('contractAddr:%s is illegal erc721!', contractAddr)
                        }
                    }
                } catch (error) {
                    console.log('startScan error:%s!', error)
                }
            }))
        })
        await plaNFTDB.scanNumber.setBlockInfo([toBlock, chain_symbol, type, fromBlock]);
    }
};

module.exports = scanTask;
