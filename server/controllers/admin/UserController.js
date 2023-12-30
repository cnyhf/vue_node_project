
const UserService = require('../../services/admin/UserService');
const JWT = require("../../util/JWT")
const UserController = {
    
    login:async (req,res)=>{
        await UserService.login(req) 
        
        //拿到数据库返回的数据后，进行业务判断
        .then(result=>{
            console.log("result",result)
            var password = req.body.password//获取前台请求的参数
            if (result.length === 0) {
                response = {
                    code: 300,
                    msg: '该账号不存在'
                };
                res.json(response);
            }else{//账号存在，可以登录，进行密码判断
                    var temp = result[0].password;  //取得数据库查询字段值             
                    if (temp == password) {                 
                        response = {
                            code: 200,
                            msg: '密码正确'
                        };
                        //生成token
                        // const token = JWT.generate({
                        //     _id:result[0]._id,
                        //     username:result[0].username
                        // },"1d")
                        // console.log('这里是token刚生成',token)
                        // res.header("Authorization",token)
                    }else {
                        response = {
                            code: 400,
                            msg: '密码错误'
                        };                      
                    }
                    console.log(response)
                    res.json(response); // 以json形式，把操作结果返回给前台页面
                    console.log(res.statusCode)
                    console.log('找到了')              
            } 
        })       
    }
}
module.exports = UserController