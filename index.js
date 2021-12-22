const erc721Transfer = require("./service/scan/erc721Transfer");
const plaNFtSetTokenURI = require("./service/scan/plaNFtSetTokenURI");
const chain_symbol = require("./config/constants").chain_symbol.ETH;
const eth = require("./utils/eth");
const { contractInfo, contractPlatform } = require('./service/db/plaNFT');
const schedule = require('node-schedule');

async function startScan() {

  // Scan every ten seconds
  schedule.scheduleJob('*/10 * * * * *', async () => {
    try {
      console.log('start Scan at time: ', new Date())
      const provider = await eth.getProvider();
      const transferList = await contractInfo.getTransferList(chain_symbol);
      const setTokenURIList = await contractPlatform.getSetTokenURIList(chain_symbol);
      erc721Transfer.startScan(provider, transferList, chain_symbol);
      plaNFtSetTokenURI.startScan(provider, setTokenURIList, chain_symbol);
    } catch (error) {
      console.log('startScan error:%s \n', error)
    }
  });

  // Scan every ten seconds
  schedule.scheduleJob('* */5 * * * *', async () => {
    try {
      console.log('delete provider cache: ', new Date())
      await eth.deleteProvider();
    } catch (error) {
      console.log('delete provider cache:%s \n', error)
    }
  });
}

startScan();
