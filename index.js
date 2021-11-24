const express = require('express')
const app = express()
let users = require('./db/user');
const solidityMoni = require("./action/solidityMonitor");
const eth = require("./contracts/eth");
let transfer = require('./db/transfer');

app.get('/', (req, res) => res.send('welcome to plaNFT!'))
app.listen(3000, () => console.log('Start Server, listening on port 3000!'))

// get user info
app.get('/users', (req, res) => {
  users.actionGetUsers(rows => {
    //  设置允许跨域访问
    res.set({ 'Access-Control-Allow-Origin': '*' })
      .send(rows)
  });
});


//得到合约交易记录信息
// app.get('/solidity/startScan',solidityMoni.startScan);

//执行定时任务  2021-11-12 
const schedule = require('node-schedule');
async function startScan() {
  //获取服务器中待扫块的合约地址
  const nftAddressList = await transfer.actionGetNFTInfo();
  //根据合约地址集合拿到合约对象列表
  let array = new Array();
  for (var i = 0; i < nftAddressList.length; i++) {
     array.push(nftAddressList[i].address);
  }
  const contracts = await eth.all_contracts(array);

  //  获取起始扫描区块
  const provider = await eth.getProvider();
  // Scan every six seconds
  schedule.scheduleJob('*/6 * * * * *', () => {
    console.log('startScan at time: ', new Date())
    try {
      solidityMoni.startScan(contracts, provider);
    } catch (e) {
      console.log('there has some error:\n', e)
    }
  });
}

startScan();
