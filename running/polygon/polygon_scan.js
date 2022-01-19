const erc721Transfer = require("../../service/scan/erc721Transfer");
const Constants = require("../../config/constants");
const chainConstants = Constants.POLYGON;
const eth = require("../../utils/eth");
const telegram = require('../../service/network/telegram')
const { contractInfo } = require('../../service/db/plaNFT');
const schedule = require('node-schedule');

async function startScan() {

  // Scan every ten seconds
  schedule.scheduleJob('*/10 * * * * *', async () => {
    try {
      const provider = await eth.getProvider(chainConstants.network);
      const transferList = await contractInfo.getTransferList(chainConstants.chain_symbol);
      if (transferList.length !== 0) {
        erc721Transfer.startScan(provider, transferList, chainConstants);
      }
    } catch (error) {
      telegram.warningNews(Constants.telegram.userName, chainConstants.chain_symbol + " transferList error", error.toString())
    }
  });
}

startScan();