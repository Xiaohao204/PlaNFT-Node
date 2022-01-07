const scanTask = require("./service/scan/scanTask");
const Constants = require("./config/constants");
const chainConstants = Constants.POLYGON;
const telegram = require('./service/network/telegram')
const eth = require("./utils/eth");

async function startScan() {
  try {
    const provider = await eth.getProvider(chainConstants.network);
    await scanTask.startScan(provider, chainConstants.chain_symbol, 0);
  } catch (error) {
    telegram.warningNews(Constants.telegram.userName, chainConstants.chain_symbol + " scanTask error", error.toString())
  }
}

startScan();
