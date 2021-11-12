
var mysql = require('mysql');
let config = require('../config');

// connect mysql
function getConn() {
    return mysql.createConnection({
        host: config.server.host,
        user: config.server.user,
        password: config.server.password,
        port: config.server.port,
        database: config.server.database
    });
}

// 定义数据插入数据库函数
async function actionInsertJoins(address, price, tx, blockNo) {
    // 获取数据库链接
    var connection = getConn();
    connection.connect();
    // 构建插入语句
    const query = `INSERT into joins (
        address,
        price,
        tx,
        block_no,
        created_at
    ) Values (?,?,?,?,NOW())`;
    const params = [address, price, tx, blockNo];
    // 执行插入操作
    connection.query(query, params, function (error, results) {
        if (error) throw error;
    });

    connection.end();
}

// 通过一个回调函数把结果返回出去
async function actionGetJoins(callback) {
    // 获取数据库链接
    var connection = getConn();
    connection.connect();

    // 查询 SQL
    const query = `SELECT address, price from joins`;
    const params = [];
    // 查询数据库
    connection.query(query, params, (err, rows) => {
        if (err) {
            return callback(err);
        }
        console.log(`result=>`, rows);
        callback(rows);
    });
    connection.end();
}


module.exports = {
    actionGetJoins,
    actionInsertJoins,
};

