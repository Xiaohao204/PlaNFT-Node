const erc721Transfer = require("./service/scan/erc721Transfer");
const plaNFtSetTokenURI = require("./service/scan/plaNFtSetTokenURI");
const chain_symbol = require("./config/constants").chain_symbol.ETH;
const eth = require("./utils/eth");
const { contractInfo, contractPlatform } = require('./service/db/plaNFT');
const schedule = require('node-schedule');

async function startScan() {

  // contract list for transfer scan
  let transferList = await contractInfo.getTransferList(chain_symbol);
  // contract list for setTokenURI scan
  let setTokenURIList = await contractPlatform.getSetTokenURIList(chain_symbol);

  //获取provider
  let provider = await eth.getProvider();

  // Scan every ten seconds
  schedule.scheduleJob('*/10 * * * * *', async () => {
    try {
      console.log('start Transfer Scan at time: ', new Date())
      erc721Transfer.startScan(provider, transferList, chain_symbol);
    } catch (error) {
      console.log('startScan error:%s \n', error)
    }
  });

  // Scan every ten seconds
  schedule.scheduleJob('*/12 * * * * *', async () => {
    try {
      console.log('start SetTokenURI Scan at time: ', new Date())
      plaNFtSetTokenURI.startScan(provider, setTokenURIList, chain_symbol);
    } catch (error) {
      console.log('startScan error:%s \n', error)
    }
  });

  // update infura apiKey
  schedule.scheduleJob('3 0 */6 * * *', async () => {
    try {
      console.log('update infura key: ', new Date())
      provider = await eth.updateProvider();
    } catch (error) {
      console.log('update infura key error:%s \n', error)
    }
  });

  // update transferList
  schedule.scheduleJob('0 * * * * *', async () => {
    try {
      console.log('update transferList: ', new Date())
      transferList = await contractInfo.getTransferList(chain_symbol);

      console.log('update setTokenList: ', new Date())
      setTokenURIList = await contractPlatform.getSetTokenURIList(chain_symbol);
    } catch (error) {
      console.log('updateTransferList error:%s \n', error)
    }
  });
}

startScan();
