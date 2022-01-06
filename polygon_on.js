const subscribe = require("./service/scan/subscribe");
const chainConstants = require("./config/constants").POLYGON;
const telegram = require('./service/network/telegram')
const eth = require("./utils/eth");

async function startScan() {
  try {
    const provider = await eth.getProvider(chainConstants.network);
    await subscribe.startScan(provider, chainConstants.chain_symbol);
  } catch (error) {
    telegram.warningNews(Constants.telegram.userName, chainConstants.chain_symbol + " subscribe error", error.toString())
  }
}

startScan();
