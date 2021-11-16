var mysql = require('mysql');

const host = 'localhost';
const user= 'root';
const password= 'bitoffer123';
const port= '3306';
const database= 'test';



// const host = '10.0.0.18';
// const user= 'bitoffer_db-test';
// const password= 'BitOffer-test!@#';
// const port= '3306';
// const database= 'planft';

// connect mysql
function getConn() {
    return mysql.createConnection({
        host: host,
        user: user,
        password: password,
        port: port,
        database: database
    });
}

module.exports = getConn