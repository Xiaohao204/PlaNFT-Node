let getConn = require('../config/dbconn');

// 定义数据插入数据库函数
async function actionInsertUsers(nickname, address,image_url,tele_username,created_at) {
    var connection = getConn();
    connection.connect();
    const query = `INSERT into user (nickname, address,image_url,tele_username,created_at
    ) Values (?,?,?,?,NOW())`;
    const params = [nickname, address,image_url,tele_username,created_at];
    connection.query(query, params, function (error, results) {
        if (error) throw error;
    });
    connection.end();
}

// 通过一个回调函数把结果返回出去
async function actionGetUsers(callback) {
    var connection = getConn();
    connection.connect();
    const query = `SELECT nickname, address,image_url,tele_username from user`;
    const params = [];
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

