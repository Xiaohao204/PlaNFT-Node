
const mysql = require('mysql');
// const config = {
//     host: 'localhost',
//     user: 'root',
//     password: 'bitoffer123',
//     port: '3306',
//     database: 'test'
// }

const config = {
    host: '10.0.0.18',
    user: 'bitoffer_db-test',
    password: 'BitOffer-test!@#',
    port: '3306',
    database: 'planft'
}
const pool = mysql.createPool(config);
module.exports = {
    // network: "https://rinkeby.infura.io/v3/25b55e1839df4d1b977c62bf7b0f35ab",//xinpeng
    // network: "https://rinkeby.infura.io/v3/81f13e5096e4405892775775d811e984",//my
    network: "https://rinkeby.infura.io/v3/3d1c157ad26247b3bd2b9ae1762b7a05",//simin 
    // network: "http://10.0.0.89:18545",
    eth_contract: {
        Pla_TNFT: "0x3c4AbE3bF4b15046e5DaF238af0bc4d5B7E75463"
    },
    event_topics: {
        Pla_TNFT: {
            Transfer: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            TransferWithIndex: "0x1ff5c586b8a5bb886c69a192872e9ead049f086dc1a3700f1fb667c9f76d3c3d",
        }
    },
    startNumber: 9650000,
    max_scan: 2,
    dbpool: pool
}

