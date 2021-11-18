/**
 * Created by b.jiang on 2021/11/10.
 */
'use strict';
const { json } = require('body-parser');
var express = require('express');
var request = require('request');
const https = require('https')

// exports.ethercanLog = function (req, res) {    //获取ethercan上交易记录信息
async function actionEthercanLog(req, res, callback) {
    const address = req.query.address;
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const sort = req.query.sort;
    request.get(
        {
            url: 'https://jsonplaceholder.typicode.com/todos/1'
            // url: 'http://api.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999&page=' + pageIndex + '&offset=' + pageSize + '&sort=' + sort + ''
        },
        function (error, response, body) {
            try {
                if (response.statusCode == 200) {
                    // 第三步：拉取交易记录
                    var data = JSON.parse(body);
                    console.log('获取交易记录信息成功！' + data);

                    // 返回交易记录
                    res.send(data);
                } else {
                    console.log(response.statusCode);
                }
            } catch (error) {
                if (error.code === 'ETIMEDOUT') {
                    res.json({
                        successful: false,
                        msg: error.code,
                        data: []
                    });
                }
                else
                    res.json({
                        successful: false,
                        data: []
                    });
            }
        }
    );
};


module.exports = {
    actionEthercanLog
};