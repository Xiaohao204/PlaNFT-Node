const plaNFtSetTokenURI = require("../../service/scan/plaNFtSetTokenURI");
const plaExchangeMatch = require("../../service/scan/plaExchangeMatch");
const Constants = require("../../config/constants");
const chainConstants = Constants.AVAX;
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
      telegram.warningNews(Constants.telegram.userName, chainConstants.chain_symbol + " setTokenURIList error", error.toString())
    }
  });

  // Scan every ten seconds
  schedule.scheduleJob('*/10 * * * * *', async () => {
    try {
      const provider = await eth.getProvider(chainConstants.network);
      const exchangeList = await plaNFT.contractTrade.getContractList([chainConstants.chain_symbol, 1]);
      if (exchangeList.length !== 0) {
        plaExchangeMatch.startScan(provider, exchangeList, chainConstants.chain_symbol);
      }
    } catch (error) {
      telegram.warningNews(Constants.telegram.userName, chainConstants.chain_symbol + " exchange match error", error.toString())
    }
  });

}

startScan();