const express = require('express')
const app = express()
let users = require('./action/user');
//获取交易记录接口
let oauth = require('./action/aouth');

app.get('/', (req, res) => res.send('welcome to plaNFT!'))
app.listen(3000, () => console.log('Start Server, listening on port 3000!'))

// get joins info
app.get('/user/joins', (req, res) => {
    users.actionGetJoins( rows=> {
      //  设置允许跨域访问
      res.set({'Access-Control-Allow-Origin': '*'})
      .send(rows)
    });
  });


  //得到合约交易记录信息
app.get('/oauth/ethercanInfo',oauth.actionEthercanLog);

  //执行定时任务  2021-11-12 
var schedule = require('node-schedule');
var request = require('request');
var rule = new schedule.RecurrenceRule();
var times = [0, 10, 20, 30, 40, 50];
// rule.second = times;//秒
rule.minute = times;
var monitors = schedule.scheduleJob(rule, function () {
    //发送统一消息
    request.get(
        {
            url: 'http://localhost:3000/user/joins',
        },
        function (error, response, body) {
            if (response.statusCode != undefined)
                if (response.statusCode == 200) {
                    console.log("add contractInfo success！");
                }
        }
    );
});

// // 引入web库
// const Web3 = require('web3');
// // 使用WebSocket协议 连接节点
// let web3 = new Web3(new Web3.providers.WebsocketProvider('https://rinkeby.infura.io/'));


// // 获取合约实例
// var CyberBlock = require('./contracts/exchange.json');
// var address = '0x8b0f857a8a3D855FaBD7e1fDaCBcc48642d9213d';
// const cyberFund = new web3.eth.Contract(
//     CyberBlock.abi,
//     address
// );

// //  监听Join 事件
// cyberFund.events.Join(function (error, event) {
//     if (error) {
//         console.log(error);
//     }

//     // 打印出交易hash 及区块号
//     console.log("交易hash:" + event.transactionHash);
//     console.log("区块高度:" + event.blockNumber);

//     //   获得监听到的数据：
//     console.log("from:" + event.returnValues.user);
//     console.log("money:" + event.returnValues.price);
// });
