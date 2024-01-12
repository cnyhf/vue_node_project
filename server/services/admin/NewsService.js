const pool = require('../../config/db.config')
const NewsService = {
    add:async({ title,content,category,isPublish,cover,editTime})=>{
        return new Promise((resolve, reject) => {
            // 从连接池中获取一个连接并执行查询
            pool.getConnection((err, connection) => {            
                if (err) {
                    console.error('Error getting MySQL connection:', err);
                    reject(err); // 返回 Promise 的 reject 部分
                    return;
                }
                var  sql = 'INSERT INTO news(title,content,category,isPublish,cover,editTime) VALUES(?,?,?,?,?,?)';
                connection.query(sql, [title,content,category,isPublish,cover,editTime], (queryErr, result) => {                   
                    if (queryErr) {
                        console.error('Error querying the database:', queryErr);
                        reject(queryErr); // 返回 Promise 的 reject 部分
                        return;
                    }
                    console.log("reslut:",result)
                    resolve(result);
                    connection.release();                      
                });         
            });
        });      
    },
    updateList:async({ num,title,content,category,isPublish,cover,editTime})=>{
        return new Promise((resolve, reject) => {
            // 从连接池中获取一个连接并执行查询
            pool.getConnection((err, connection) => {            
                if (err) {
                    console.error('Error getting MySQL connection:', err);
                    reject(err); // 返回 Promise 的 reject 部分
                    return;
                }
                if(cover){
                    var  sql = 'update news set title=?,content=?,category=?,isPublish=?,cover=?,editTime=? where num=?';
                    connection.query(sql, [title,content,category,isPublish,cover,editTime,num], (queryErr, result) => {                   
                        if (queryErr) {
                            console.error('Error querying the database:', queryErr);
                            reject(queryErr); // 返回 Promise 的 reject 部分
                            return;
                        }
                        console.log("reslut:",result)
                        resolve(result);
                        connection.release();                      
                    });         
                }else{{
                    var  sql = 'update news set title=?,content=?,category=?,isPublish=?,editTime=? where num=?';
                    connection.query(sql, [title,content,category,isPublish,editTime,num], (queryErr, result) => {                   
                        if (queryErr) {
                            console.error('Error querying the database:', queryErr);
                            reject(queryErr); // 返回 Promise 的 reject 部分
                            return;
                        }
                        console.log("reslut:",result)
                        resolve(result);
                        connection.release();                      
                    });         
                }}
               
            });
        });      
    },
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
                    var  sql = 'SELECT * FROM news where num=?';
                    connection.query(sql,num, (queryErr, result) => {
                        
                        if (queryErr) {
                            console.error('Error querying the database:', queryErr);
                            reject(queryErr); // 返回 Promise 的 reject 部分
                            return;
                        }
                        // console.log("reslut:",result)
                        resolve(result);
                        connection.release();                      
                    });     
                }else{
                    var  sql = 'SELECT * FROM news';
                    connection.query(sql, (queryErr, result) => {
                        
                        if (queryErr) {
                            console.error('Error querying the database:', queryErr);
                            reject(queryErr); // 返回 Promise 的 reject 部分
                            return;
                        }
                        // console.log("reslut:",result)
                        resolve(result);
                        connection.release();                      
                    });     
                }
                
                
                   
            });
        });   
    },
    publish:async(num,isPublish,editTime)=>{
        return new Promise((resolve, reject) => {
            // 从连接池中获取一个连接并执行查询
            pool.getConnection((err, connection) => {            
                if (err) {
                    console.error('Error getting MySQL connection:', err);
                    reject(err); // 返回 Promise 的 reject 部分
                    return;
                }
                
                var  sql = 'update news set isPublish=?, editTime=? where num=?';
                connection.query(sql,[isPublish,editTime,num] ,(queryErr, result) => {
                    
                    if (queryErr) {
                        console.error('Error querying the database:', queryErr);
                        reject(queryErr); // 返回 Promise 的 reject 部分
                        return;
                    }
                    // console.log("reslut:",result)
                    resolve(result);
                    connection.release();                      
                });                   
            });
        });  
    },
    delList:async({num})=>{
        return new Promise((resolve, reject) => {
            // 从连接池中获取一个连接并执行查询
            pool.getConnection((err, connection) => {            
                if (err) {
                    console.error('Error getting MySQL connection:', err);
                    reject(err); // 返回 Promise 的 reject 部分
                    return;
                }
                
                var  sql =  'DELETE FROM news WHERE num = ?';
                connection.query(sql ,num,(queryErr, result) => {
                    if (queryErr) {
                        console.error('Error querying the database:', queryErr);
                        reject(queryErr); // 返回 Promise 的 reject 部分
                        return;
                    }
                    console.log("reslut:",result)
                    resolve(result);
                    connection.release();                                                   
                });                   
            });
        });  
    }
}
module.exports = NewsService