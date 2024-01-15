const NewsService = require("../../services/web/NewsService")

const NewsController = {
    getList:async(req,res)=>{
        const result = await NewsService.getList(req.params.num)
        // console.log(result)
        res.send({
            code:200,
            data:result
        })
    },   
    getTopList:async(req,res)=>{
        const result = await NewsService.getTopList(req.query.limit)
        // console.log(result)
        res.send({
            code:200,
            data:result
        })
    },  
}

module.exports = NewsController