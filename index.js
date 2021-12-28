const subscribe = require("./service/scan/subscribe");
const chainConstants = require("./config/constants").ETH;
const eth = require("./utils/eth");

async function startScan() {
  // Scan every ten seconds
  try {
    console.log('start Scan at time: ', new Date())
    eth.setNetwork(chainConstants.network)
    const provider = await eth.getProvider();
    await subscribe.startScan(provider, chainConstants.chain_symbol);
  } catch (error) {
    console.log('chainSymbol:%s subscribe erros:%s', chainConstants.chain_symbol, error)
  }
}

startScan();
