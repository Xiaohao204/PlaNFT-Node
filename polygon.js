const subscribe = require("./service/scan/subscribe");
const scanTask = require("./service/scan/scanTask");
const chainConstants = require("./config/constants").POLYGON;
const eth = require("./utils/eth");

async function startScan() {
  const provider = await eth.getProvider(chainConstants.network);
  // await subscribe.startScan(provider, chainConstants.chain_symbol);
  await scanTask.startScan(provider, chainConstants.chain_symbol, 0);
}

startScan();
