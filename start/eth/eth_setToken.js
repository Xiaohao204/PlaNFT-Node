const plaNFtSetTokenURI = require("../../service/scan/plaNFtSetTokenURI");
const Constants = require("../../config/constants");
const chainConstants = Constants.ETH;
const eth = require("../../utils/eth");
const telegram = require('../../service/network/telegram')
const { contractPlatform } = require('../../service/db/plaNFT');
const schedule = require('node-schedule');

async function startScan() {

  // Scan every ten seconds
  schedule.scheduleJob('*/10 * * * * *', async () => {
    try {
      const provider = await eth.getProvider(chainConstants.network);
      const setTokenURIList = await contractPlatform.getSetTokenURIList(chainConstants.chain_symbol);
      if (setTokenURIList.length !== 0) {
        plaNFtSetTokenURI.startScan(provider, setTokenURIList, chainConstants.chain_symbol);
      }
    } catch (error) {
      telegram.warningNews(Constants.telegram.userName, chainConstants.chain_symbol + " setTokenURIList error", error.toString())
    }
  });
}

startScan();