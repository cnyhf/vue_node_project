const pool = require('../../config/db.config')
const NewsService = {
    getList:async(num)=>{
        return new Promise((resolve, reject) => {
            // 从连接池中获取一个连接并执行查询
            pool.getConnection((err, connection) => {            
                if (err) {
                    console.error('Error getting MySQL connection:', err);
                    reject(err); // 返回 Promise 的 reject 部分
                    return;
                }
                isPublish = '1'
                if(num){

                    var  sql = 'SELECT * FROM news where num=? and isPublish=? ORDER BY editTime DESC';
                    connection.query(sql,[num,isPublish], (queryErr, result) => {
                        
                        if (queryErr) {
                            console.error('Error querying the database:', queryErr);
                            reject(queryErr); // 返回 Promise 的 reject 部分
                            return;
                        }
                        // console.log("reslut:",result)
                        resolve(result);
                        connection.release();                      
                    });     
                } else{{
                    var  sql = 'SELECT * FROM news where isPublish=? ORDER BY editTime DESC';
                    connection.query(sql, [isPublish], (queryErr, result) => {                   
                        if (queryErr) {
                            console.error('Error querying the database:', queryErr);
                            reject(queryErr); // 返回 Promise 的 reject 部分
                            return;
                        }
                        // console.log("reslut:",result)
                        resolve(result);
                        connection.release();                      
                    });         
                }}
                
            });
        });   
    },  
    getTopList:async(limit)=>{
        return new Promise((resolve, reject) => {
            // 从连接池中获取一个连接并执行查询
            pool.getConnection((err, connection) => {            
                if (err) {
                    console.error('Error getting MySQL connection:', err);
                    reject(err); // 返回 Promise 的 reject 部分
                    return;
                }
                isPublish = '1'
               
                var  sql = 'SELECT * FROM news where isPublish=? ORDER BY editTime DESC LIMIT ?';
                connection.query(sql, [isPublish,Number(limit)], (queryErr, result) => {                   
                    if (queryErr) {
                        console.error('Error querying the database:', queryErr);
                        reject(queryErr); // 返回 Promise 的 reject 部分
                        return;
                    }
                    resolve(result);
                    connection.release();                      
                });         
                
                
            });
        });   
    }, 
}
module.exports = NewsService