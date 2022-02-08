const plaNFtSetTokenURI = require("../../service/scan/plaNFtSetTokenURI");
const plaExchangeMatch = require("../../service/scan/plaExchangeMatch");
const plaExchangeStartTime = require("../../service/scan/plaExchangeStartTime");
const Constants = require("../../config/constants");
const chainConstants = Constants.POLYGON;
const eth = require("../../utils/eth");
const telegram = require('../../service/network/telegram')
const plaNFT = require('../../service/db/plaNFT');
const schedule = require('node-schedule');

async function startScan() {

  // Scan every ten seconds
  schedule.scheduleJob('*/10 * * * * *', async () => {
    try {
      const provider = await eth.getProvider(chainConstants.network);
      const setTokenURIList = await plaNFT.contractPlatform.getSetTokenURIList(chainConstants.chain_symbol);
      if (setTokenURIList.length !== 0) {
        plaNFtSetTokenURI.startScan(provider, setTokenURIList, chainConstants.chain_symbol);
      }
    } catch (error) {
      telegram.warningNews(Constants.telegram.userName, chainConstants.chain_symbol + " scan setTokenURIList error", error.toString())
    }
  });

  // Scan batch match
  schedule.scheduleJob('*/5 * * * * *', async () => {
    try {
      const provider = await eth.getProvider(chainConstants.network);
      const exchangeList = await plaNFT.contractTrade.getContractList([chainConstants.chain_symbol, Constants.exchangeType.batchMatch]);
      if (exchangeList.length !== 0) {
        plaExchangeMatch.startScan(provider, exchangeList, chainConstants.chain_symbol, Constants.exchangeType.batchMatch);
      }
    } catch (error) {
      telegram.warningNews(Constants.telegram.userName, chainConstants.chain_symbol + " scan exchange match error", error.toString())
    }
  });

  // // Scan set start time
  // // 删除所有过期订单
  // schedule.scheduleJob('*/10 * * * * *', async () => {
  //   try {
  //     const provider = await eth.getProvider(chainConstants.network);
  //     const exchangeList = await plaNFT.contractTrade.getContractList([chainConstants.chain_symbol, Constants.exchangeType.setStartTime]);
  //     if (exchangeList.length !== 0) {
  //       plaExchangeStartTime.startScan(provider, exchangeList, chainConstants.chain_symbol, Constants.exchangeType.setStartTime);
  //     }
  //   } catch (error) {
  //     telegram.warningNews(Constants.telegram.userName, chainConstants.chain_symbol + " scan exchange setStartTime error", error.toString())
  //   }
  // });

}

startScan();