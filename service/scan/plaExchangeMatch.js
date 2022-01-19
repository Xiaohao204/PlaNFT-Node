const Constants = require('../../config/constants');
const plaNFTDB = require('../db/plaNFT')
const ipfs = require('../network/ipfs')
const eth = require('../../utils/eth')
const telegram = require('../network/telegram')
const eventFilter = {
    topics: [Constants.event_topics.Exchange.AtomicMatch]
}

const plaExchangeMatch = {}

plaExchangeMatch.startScan = async function (provider, contractAddressList, chain_symbol) {
    const chainBlockNumber = await provider.getBlockNumber();
    await scanAtomicMatch(contractAddressList, chainBlockNumber, chain_symbol);
};

async function scanAtomicMatch(contractAddressList, chainBlockNumber, chain_symbol) {
    await Promise.all(contractAddressList.map(async (exchangeAddr) => {
        try {
            const contract = await eth.instanceExchangeContracts(exchangeAddr);

            // calc scan scope
            const startBlock = await plaNFTDB.contractTrade.getLastNumber([exchangeAddr, chain_symbol]);
            const endBlock = chainBlockNumber - startBlock > Constants.max_scan ? startBlock + Constants.max_scan : chainBlockNumber;

            // listening transfer event
            const scanResult = await contract.queryFilter(eventFilter, startBlock, endBlock);
            // resolve scanResult
            await Promise.all(scanResult.map(async (value) => {
                try {
                    const tokenId = value.args['tokenId'].toString();
                    const contractAddr = value.args['target'];
                    const eventBlockNumber = value.blockNumber;
                    const updateParams = { contractAddr, tokenId, eventBlockNumber, chain_symbol }
                    let nftInfoDetails = await plaNFTDB.nftInfo.getNFTInfoDetails(updateParams);
                    if (nftInfoDetails !== null) {
                        if (nftInfoDetails.bundle_id == null) {
                            nftInfoDetails.bundle_id = 0;
                        }
                        const bundleCount = await plaNFTDB.nftInfo.getBundleCount(nftInfoDetails);
                        if (bundleCount === 1) {
                            await plaNFTDB.updateBundleTransaction(nftInfoDetails, updateParams);
                        } else {
                            await plaNFTDB.nftInfo.updateBundleId(nftInfoDetails);
                        }
                    }
                } catch (error) {
                    telegram.warningNews(Constants.telegram.userName, new Date() + ' ' + chain_symbol + ' scan AtomicMatch error', error.toString())
                }
            }));
            await plaNFTDB.contractTrade.setLastNumber([endBlock, exchangeAddr, startBlock, chain_symbol]);
            console.log('%s AtomicMatch %s %s %d %d count:%d \n', new Date(), chain_symbol, exchangeAddr, startBlock, endBlock, scanResult.length);
        } catch (error) {
            telegram.warningNews(Constants.telegram.userName, new Date() + ' ' + chain_symbol + ' scan AtomicMatch error', error.toString())
        }
    }));
}

module.exports = plaExchangeMatch;