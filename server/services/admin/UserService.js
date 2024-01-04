const pool = require('../../config/db.config')
const UserService = {
    login:async(req)=>{
        var username = req.body.username;//获取前台请求的参数
            // 返回一个 Promise 对象
        return new Promise((resolve, reject) => {
          // 从连接池中获取一个连接并执行查询
          pool.getConnection((err, connection) => {
              // 先判断账号是否存在
              var sql = "select * from users where username=?";
              if (err) {
                  console.error('Error getting MySQL connection:', err);
                  reject(err); // 返回 Promise 的 reject 部分
                  return;
              }
              // 执行数据库查询
              // [username] 是一个包含实际用户名值的数组，它会被传递给查询中的 ?
              connection.query(sql, [username], (queryErr, result) => {
                  connection.release(); // 释放连接
                  if (queryErr) {
                      console.error('Error querying the database:', queryErr);
                      reject(queryErr); // 返回 Promise 的 reject 部分
                      return;
                  }
                  // 返回 Promise 的 resolve 部分，并将查询结果传递给外部
                  resolve(result);
              });
          });
      });
    },
    upload:async({id,username,introduction,gender,avatar})=>{
        return new Promise((resolve, reject) => {
            // 从连接池中获取一个连接并执行查询
            pool.getConnection((err, connection) => {
                // 先判断账号是否存在               
                if (err) {
                    console.error('Error getting MySQL connection:', err);
                    reject(err); // 返回 Promise 的 reject 部分
                    return;
                }
                if(avatar){
                    var sql = "update users set username=?,gender=?,introduction=?,avatar=?where id=?";
                    connection.query(sql, [username,Number(gender),introduction,avatar,id], (queryErr, result) => {
                        
                        if (queryErr) {
                            console.error('Error querying the database:', queryErr);
                            reject(queryErr); // 返回 Promise 的 reject 部分
                            return;
                        }
                         //如果上传了新头像
                        console.log("reslut:",result)
                        resolve(result);
                        connection.release();
                        
                    });
                }else{
                    var sql = "update users set username=?,gender=?,introduction=?where id=?";
                    connection.query(sql, [username,Number(gender),introduction,id], (queryErr, result) => {
                        
                        if (queryErr) {
                            console.error('Error querying the database:', queryErr);
                            reject(queryErr); // 返回 Promise 的 reject 部分
                            return;
                        }
                        console.log("reslut:",result)
                        resolve(result);
                        connection.release();                
                    });
                }                             
            });
        });      
    }
}
module.exports = UserService