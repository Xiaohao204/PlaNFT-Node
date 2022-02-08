// const Constants = require('../../config/constants');
// const plaNFTDB = require('../db/plaNFT')
// const eth = require('../../utils/eth')
// const telegram = require('../network/telegram')
// const eventFilter = {
//     topics: [Constants.event_topics.Exchange.SetStartTime]
// }

// const plaExchangeStartTime = {}

// plaExchangeStartTime.startScan = async function (provider, contractAddressList, chain_symbol, type) {
//     const chainBlockNumber = await provider.getBlockNumber();
//     await scanAtomicMatch(contractAddressList, chainBlockNumber, chain_symbol, type);
// };

// async function scanAtomicMatch(contractAddressList, chainBlockNumber, chain_symbol, type) {
//     await Promise.all(contractAddressList.map(async (exchangeAddr) => {
//         try {
//             const contract = await eth.instanceExchangeContracts(exchangeAddr);

//             // calc scan scope
//             const startBlock = await plaNFTDB.contractTrade.getLastNumber([exchangeAddr, chain_symbol, type]);
//             const endBlock = chainBlockNumber - startBlock > Constants.max_scan ? startBlock + Constants.max_scan : chainBlockNumber;

//             // listening transfer event
//             const scanResult = await contract.queryFilter(eventFilter, startBlock, endBlock);
//             // resolve scanResult
//             await Promise.all(scanResult.map(async (value) => {
//                 try {
//                     const owner = value.args['owner'].toString();
//                     const startTime = value.args['startTime'];
//                     //todo 删除所有过期订单
//                 } catch (error) {
//                     telegram.warningNews(Constants.telegram.userName, new Date() + ' ' + chain_symbol + ' scan AtomicMatch error', error.toString())
//                 }
//             }));
//             await plaNFTDB.contractTrade.setLastNumber([endBlock, exchangeAddr, startBlock, chain_symbol, type]);
//             console.log('%s AtomicMatch %s %s %d %d count:%d \n', new Date(), chain_symbol, exchangeAddr, startBlock, endBlock, scanResult.length);
//         } catch (error) {
//             telegram.warningNews(Constants.telegram.userName, new Date() + ' ' + chain_symbol + ' scan AtomicMatch error', error.toString())
//         }
//     }));
// }

// module.exports = plaExchangeStartTime;