const pool = require('../../config/db.config')
const productsService = {
    add:async( title,introduction,detail,cover,editTime)=>{
        return new Promise((resolve, reject) => {
            // 从连接池中获取一个连接并执行查询
            pool.getConnection((err, connection) => {            
                if (err) {
                    console.error('Error getting MySQL connection:', err);
                    reject(err); // 返回 Promise 的 reject 部分
                    return;
                }
                var  sql = 'INSERT INTO products(title,introduction,detail,cover,editTime) VALUES(?,?,?,?,?)';
                connection.query(sql, [title,introduction,detail,cover,editTime], (queryErr, result) => {                   
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
    updateList:async({ pid,title,introduction,detail,cover,editTime})=>{
        return new Promise((resolve, reject) => {
            // 从连接池中获取一个连接并执行查询
            pool.getConnection((err, connection) => {            
                if (err) {
                    console.error('Error getting MySQL connection:', err);
                    reject(err); // 返回 Promise 的 reject 部分
                    return;
                }
                if(cover){
                    var  sql = 'update products set title=?,introduction=?,detail=?,cover=?,editTime=? where pid=?';
                    connection.query(sql, [title,introduction,detail,cover,editTime, pid], (queryErr, result) => {                   
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
                    var  sql = 'update products set title=?,introduction=?,detail=?,editTime=? where pid=?';
                    connection.query(sql, [title,introduction,detail,editTime, pid], (queryErr, result) => {                   
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
    getList:async(pid)=>{
        return new Promise((resolve, reject) => {
            // 从连接池中获取一个连接并执行查询
            pool.getConnection((err, connection) => {            
                if (err) {
                    console.error('Error getting MySQL connection:', err);
                    reject(err); // 返回 Promise 的 reject 部分
                    return;
                }
                if(pid){
                    var  sql = 'SELECT * FROM products where pid=?';
                    connection.query(sql,pid, (queryErr, result) => {
                        
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
                    var  sql = 'SELECT * FROM products';
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
                
                var  sql = 'update products set isPublish=?, editTime=? where num=?';
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
    delList:async(pid)=>{
        return new Promise((resolve, reject) => {
            // 从连接池中获取一个连接并执行查询
            pool.getConnection((err, connection) => {            
                if (err) {
                    console.error('Error getting MySQL connection:', err);
                    reject(err); // 返回 Promise 的 reject 部分
                    return;
                }
                
                var  sql =  'DELETE FROM products WHERE pid=?';
                connection.query(sql ,pid,(queryErr, result) => {
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
module.exports = productsService