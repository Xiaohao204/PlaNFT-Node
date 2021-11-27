const mysql = require('mysql');

// const config = {
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     port: '3306',
//     database: 'Pla_NFT'
// }

const config = {
    host: '10.0.0.18',
    user: 'bitoffer_db-test',
    password: 'BitOffer-test!@#',
    port: '3306',
    database: 'planft'
}
module.exports = mysql.createPool(config);