const express = require('express')
const app = express()
let users = require('./db/user');
//获取交易记录接口
// let oauth = require('./action/aouth');
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
  // Scan every six seconds
  const nftAddress = await transfer.actionGetNFTInfo();
  const contracts = await eth.all_contracts(nftAddress);
  schedule.scheduleJob('*/6 * * * * *', () => {
    console.log('startScan at time: ', new Date())
    try {
      solidityMoni.startScan(contracts);
    } catch (e) {
      console.log('there has some error:\n', e)
    }
  });
}

startScan();
