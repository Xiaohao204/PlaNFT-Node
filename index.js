const erc721Transfer = require("./service/scan/erc721Transfer");
const plaNFtSetTokenURI = require("./service/scan/plaNFtSetTokenURI");
const chain_symbol = require("./config/constants").chain_symbol.RINKEBY;
const eth = require("./utils/eth");
const { contractInfo, contractPlatform } = require('./service/db/plaNFT');
const schedule = require('node-schedule');

async function startScan() {

  // contract list for transfer scan
  let transferList = await contractInfo.getTransferList(chain_symbol);
  // contract list for setTokenURI scan
  let setTokenURIList = await contractPlatform.getSetTokenURIList(chain_symbol);

  //获取合约实例
  let transferContracts = await eth.instanceTransferContracts(transferList);
  //获取合约实例
  let setTokenURIContracts = await eth.instanceSetTokenURIContracts(setTokenURIList);

  //获取provider
  let provider = await eth.getProvider();

  // Scan every ten seconds
  schedule.scheduleJob('*/10 * * * * *', async () => {
    try {
      console.log('start Transfer Scan at time: ', new Date())
      erc721Transfer.startScan(provider, transferContracts, chain_symbol);
    } catch (error) {
      console.log('startScan error:%s \n', error)
    }
  });

  // Scan every ten seconds
  schedule.scheduleJob('*/12 * * * * *', async () => {
    try {
      console.log('start SetTokenURI Scan at time: ', new Date())
      plaNFtSetTokenURI.startScan(provider, setTokenURIContracts, chain_symbol);
    } catch (error) {
      console.log('startScan error:%s \n', error)
    }
  });

  // update infura apiKey
  schedule.scheduleJob('3 0 */8 * * *', async () => {
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
      transferContracts = await eth.instanceTransferContracts(transferList);

      console.log('update setTokenList: ', new Date())
      setTokenURIList = await contractPlatform.getSetTokenURIList(chain_symbol);
      setTokenURIContracts = await eth.instanceSetTokenURIContracts(setTokenURIList);
    } catch (error) {
      console.log('updateTransferList error:%s \n', error)
    }
  });
}

startScan();
