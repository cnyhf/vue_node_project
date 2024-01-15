const pool = require('../../config/db.config')
const ProductService = {
    getList:async(num)=>{
        return new Promise((resolve, reject) => {
            // 从连接池中获取一个连接并执行查询
            pool.getConnection((err, connection) => {            
                if (err) {
                    console.error('Error getting MySQL connection:', err);
                    reject(err); // 返回 Promise 的 reject 部分
                    return;
                }
                if(num){
                    var  sql = 'SELECT * FROM products where num=?;'
                    connection.query(sql,[num], (queryErr, result) => {
                        
                        if (queryErr) {
                            console.error('Error querying the database:', queryErr);
                            reject(queryErr); // 返回 Promise 的 reject 部分
                            return;
                        }
                        resolve(result);
                        connection.release();                      
                    });     
                } else{{
                    var  sql = 'SELECT * FROM products';
                    connection.query(sql, (queryErr, result) => {                   
                        if (queryErr) {
                            console.error('Error querying the database:', queryErr);
                            reject(queryErr); // 返回 Promise 的 reject 部分
                            return;
                        }
                        resolve(result);
                        connection.release();                      
                    });         
                }}
            });
        });   
    },  
}
module.exports = ProductService