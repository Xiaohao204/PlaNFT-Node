const express = require('express')
const app = express()
let users = require('./db/user');
//获取交易记录接口
let oauth = require('./action/aouth');
const solidityMoni = require("./action/solidityMonitor");

app.get('/', (req, res) => res.send('welcome to plaNFT!'))
app.listen(3000, () => console.log('Start Server, listening on port 3000!'))

// get joins info
app.get('/users', (req, res) => {
    users.actionGetUsers( rows=> {
      //  设置允许跨域访问
      res.set({'Access-Control-Allow-Origin': '*'})
      .send(rows)
    });
  });

  //得到合约交易记录信息
// app.get('/solidity/startScan',solidityMoni.startScan);

const startScan = () => {
  solidityMoni.startScan()
}

startScan();

//   //执行定时任务  2021-11-12 
// var schedule = require('node-schedule');
// var request = require('request');
// var rule = new schedule.RecurrenceRule();
// var times = [1,6,11,16,21,26,31,36,41,46,51,56];
// rule.second = times;//秒
// // rule.minute = times;
// var monitors = schedule.scheduleJob(rule, function () {
//     console.log('startScan at time: ', new Date())
//     solidityMoni.startScan()
// });
