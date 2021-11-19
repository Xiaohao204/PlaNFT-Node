let configs = require('../config/constants');

// 定义数据插入数据库函数
async function actionInsertUsers(nickname, address, image_url, tele_username, created_at) {
    configs.dbpool.getConnection(function (err, connection) {
        const query = `INSERT into user (nickname, address,image_url,tele_username,created_at
    ) Values (?,?,?,?,NOW())`;
        const params = [nickname, address, image_url, tele_username, created_at];
        connection.query(query, params, function (error, results) {
            if (error) throw error;
        });
        connection.release();
    });
}

// 通过一个回调函数把结果返回出去
async function userDataBySQL(callback) {
    configs.dbpool.getConnection(function (err, connection) {
        const query = `SELECT nickname, address,image_url,tele_username from user`;
        const params = [];
        connection.query(query, params, (err, rows) => {
            if (err) {
                return callback(err);
            }
            console.log(`result=>`, rows);
            return callback(rows);
        });
        connection.release();
    });
}

//callback为回调方法
async function actionGetUsers(callback) {
    configs.dbpool.getConnection(function (err, connection) {
        const query = `SELECT nickname, address,image_url,tele_username from user`;
        connection.query(query, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("result: =>" + result);
                return callback(result);
            }
        });
        connection.release();
    });
};


module.exports = {
    actionGetUsers,
    actionInsertUsers,
    userDataBySQL
};

