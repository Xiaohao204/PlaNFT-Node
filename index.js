// let users = require('./db/user');
const erc721Transfer = require("./service/scan/erc721Transfer");
const eth = require("./utils/eth");
const contractInfo = require('./service/db/contractInfo');
const schedule = require('node-schedule');

async function startScan() {
  //获取服务器中待扫块的合约地址
  let contractList = await contractInfo.getContractList();
  //获取合约实例
  let contracts = await eth.all_contracts(contractList);
  //获取provider
  let provider = await eth.getProvider();
  // Scan every six seconds
  schedule.scheduleJob('*/10 * * * * *', async () => {
    try {
      console.log('startScan at time: ', new Date())
      erc721Transfer.startScan(provider, contracts);
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

  // update contracts list
  schedule.scheduleJob('3 */10 * * * *', async () => {
    try {
      console.log('update contractList: ', new Date())
      contractList = await contractInfo.getContractList();
      contracts = await eth.all_contracts(contractList);
    } catch (error) {
      console.log('updatecontractList error:%s \n', error)
    }
  });
}

startScan();
