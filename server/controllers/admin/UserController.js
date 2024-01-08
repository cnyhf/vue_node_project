const UserService = require('../../services/admin/UserService');
const JWT = require("../../util/JWT")
const UserController = {
    
    login:async (req,res)=>{
        await UserService.login(req) 
        
        //拿到数据库返回的数据后，进行业务判断
        .then(result=>{
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
                            msg: '密码正确',
                            data:{
                                username: result[0].username,
                                gender:result[0].gender?result[0].gender:0,
                                introduction:result[0].introduction,
                                avatar:result[0].avatar,
                                role:result[0].role                       
                            }
                        }
                        //生成token
                        const token = JWT.generate({
                            id:result[0].id,
                            username:result[0].username
                        },"1d")
                        res.header("Authorization",token)
                    }else {
                        response = {
                            code: 400,
                            msg: '密码错误'
                        };                      
                    }
                    res.json(response); // 以json形式，把操作结果返回给前台页面
                    console.log('找到了')              
            } 
        })       
    },
    upload:async(req,res)=>{
        // 解构出来
        const {username,introduction,gender} = req.body
        const avatar = req.file?`/avataruploads/${req.file.filename}`:""
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)
        console.log("body:",req.body,"file:",req.file)
        console.log("payload:",payload)
        // 调用Service模块更新数据
        await UserService.upload({id:payload.id,username,
            introduction,gender:Number(gender),avatar})
            .then(result=>{
                if(result.affectedRows == 1){
                    if(avatar){
                        res.send({
                            code:200,
                            data:{
                                username,introduction,
                                gender:Number(gender),
                                avatar
                            }
                        })
                    }else{
                        res.send({
                            code:200,
                            data:{
                                username,introduction,
                                gender:Number(gender),
                            }
                        })
                    }            
                }
            })          
    },
    add:async(req,res)=>{
        // 解构出来
        const {username,introduction,gender,role,password} = req.body
        const avatar = req.file?`/avataruploads/${req.file.filename}`:""
        // 调用Service模块更新数据
        await UserService.add({username,introduction,gender:Number(gender),
                             avatar,role,password})
        .then(result=>{
            if (result.affectedRows == 1) {
                res.send({
                    code: 200,
                })
            }        
        })
            
    },
    getList:async(req,res)=>{
       const result =  await UserService.getList(req.params.id)    
       res.send({
        code:200,
        data:result
       })
    },
    delList:async(req,res)=>{
        // console.log(req.params.id)
        const result =  await UserService.delList(req.params.id)         
            res.send({
                code: 200,
            })
    },
    putList:async(req,res)=>{

        const { id,username,password, introduction, role } = req.body
        const result =  await UserService.putList( id,username,password, introduction, role )  
        .then(result=>{
            if(result.affectedRows==1){
                res.send({
                    code:200,
                   })
            }
        })        
     },
}
module.exports = UserController