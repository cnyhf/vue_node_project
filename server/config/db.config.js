let mysql = require("mysql")
const db_config = {
    host:"localhost",
    post:"3306",
    user:"root",
    password:"12345",
    database: 'enterpriseportal', // 数据库名称
}
let pool = mysql.createPool(db_config);
// 从连接池中获取一个连接并执行查询
// pool.getConnection((err, connection) => {
//     if (err) {
//         console.error('Error getting MySQL connection:', err);
//         return;
//     }

//     // 执行数据库查询
//     connection.query('SELECT * FROM users', (queryErr, results) => {
//         if (queryErr) {
//             console.error('Error querying the database:', queryErr);
//         } else {
//             console.log('Query results:', results);
//         }

//         // 释放连接回连接池
//         connection.release();

//         // 关闭连接池
//         pool.end((endErr) => {
//             if (endErr) {
//                 console.error('Error closing the connection pool:', endErr);
//             } else {
//                 console.log('Connection pool closed.');
//             }
//         });
//     });
// });

module.exports = pool
//这里只是创建连接池，并将这个模块暴露出去