const pool = require('../../config/db.config')
const UserService = {
    login:async(req)=>{
        var username = req.body.username;//获取前台请求的参数
        // 从连接池中获取一个连接并执行查询
      //   pool.getConnection((err, connection) => {
      //       //先判断账号是否存在
      //       var sql = "select * from users where username=?"
      //       if (err) {
      //           console.error('Error getting MySQL connection:', err);
      //           return
      //       }
      //       // 执行数据库查询
      //       // [username] 是一个包含实际用户名值的数组，它会被传递给查询中的 ?
      //       connection.query(sql, [username],(queryErr, result) => {
      //           if (queryErr) {
      //               console.error('Error querying the database:', queryErr);
      //           } 
      //           var resultJson = result;
      //           console.log("resultjson",resultJson)
      //           // console.log(resultJson.length);
      //           if (resultJson.length === 0) {
      //               result = {
      //                 code: 300,
      //                 msg: '该账号不存在'
      //               };
      //               res.json(result);
      //               connection.release();
      //           }else{//账号存在，可以登录，进行密码判断
      //               var sql1 = "select password from users where username=?";
      //               connection.query(sql1, [username], function (err, result) {
      //                   var temp = result[0].password;  //取得数据库查询字段值
      //                   // console.log(temp);
      //                   if (temp == password) {
      //                     result = {
      //                       code: 200,
      //                       msg: '密码正确'
      //                     };
      //                   //   console.log(req.session)
      //                     req.session.name=req.body
      //                     req.session.islogin=true
      //                   //   console.log(req.session)
      //                   }else {
      //                       result = {
      //                         code: 400,
      //                         msg: '密码错误'
      //                       };
      //                       req.session.islogin=false
      //                   }
      //                   res.json(result); // 以json形式，把操作结果返回给前台页面
      //                   connection.release();// 释放连接
      //                   console.log('找到了')        
                        
      //               });
      //           } 
      //     });
      // })
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
    }
}
module.exports = UserService