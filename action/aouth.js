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
async function getmateData(req, res, callback) {
    request.get(
        {
            // url: 'https://jsonplaceholder.typicode.com/todos/1'
            // url: 'https://dweb.link/ipfs/bafyreifyzpzwt5lvz2d47h3ite7hqzfleke4ctlrdo2r4rcksflw4nsc4e/metadata.json'
            url: 'https://ipfs.io/ipfs/bafyreifyzpzwt5lvz2d47h3ite7hqzfleke4ctlrdo2r4rcksflw4nsc4e/metadata.json'
            // url: 'http://api.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999&page=' + pageIndex + '&offset=' + pageSize + '&sort=' + sort + ''
        },
        function (error, response, body) {
            console.log(response);
            console.log(body);
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
                console.log(error);
            }
        }
    );
};


module.exports = {
    getmateData
};