import axios from 'axios'
function upload(path,userForm) {
    const params = new FormData()
    // 循环变成FormData格式
    for(let i in userForm){
        params.append(i,userForm[i])
    }
    console.log("这是params",params)
    //post请求，我post的是多部分的表单数据
    return axios.post(path,params,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }).then(res=>res.data)    
}
export default upload