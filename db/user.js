

let getConn = require('../config/dbconn');

// 定义数据插入数据库函数
async function actionInsertUsers(nickname, address,image_url,tele_username,created_at) {
    // 获取数据库链接
    var connection = getConn();
    connection.connect();
    // 构建插入语句
    const query = `INSERT into user (nickname, address,image_url,tele_username,created_at
    ) Values (?,?,?,?,NOW())`;
    const params = [nickname, address,image_url,tele_username,created_at];
    // 执行插入操作
    connection.query(query, params, function (error, results) {
        if (error) throw error;
    });

    connection.end();
}

// 通过一个回调函数把结果返回出去
async function actionGetUsers(callback) {
    // 获取数据库链接
    var connection = getConn();
    connection.connect();

    // 查询 SQL
    const query = `SELECT nickname, address,image_url,tele_username from user`;
    const params = [];
    // 查询数据库
    connection.query(query, params, (err, rows) => {
        if (err) {
            return callback(err);
        }
        console.log(`result=>`, rows);
        return callback(rows);
    });
    connection.end();
}


module.exports = {
    actionGetUsers,
    actionInsertUsers,
};

