const jsonwebtoken = require("jsonwebtoken")
//密钥
const secret = "zt"
const JWT = {
    //生成token
    //expires是过期时间
    generate(value,expires){
        return jsonwebtoken.sign(value,secret,{expiresIn:expires})
    },
    //验证token
    //verify方法校验的同时也会校验时间是否过期，缺点是过期了会直接报错
    //所以需要try-catch去捕获一下
    verify(token){
        try{
            return jsonwebtoken.verify(token,secret)
        }
        catch(e){
            return false
        }
    }
}
// const token = JWT.generate({name:"zt"},"10s")
// console.log(JWT.verify(token))
// setTimeout(() => {
//     console.log(JWT.verify(token))
// }, 11000);
module.exports = JWT