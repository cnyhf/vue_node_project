const NewsService = require("../../services/admin/NewsService")

const NewsController = {
    add:async(req,res)=>{
        // console.log(req.body)
        const cover = req.file?`/newsuploads/${req.file.filename}`:""
        console.log(cover)
        const {title,content,category,isPublish} = req.body
        await NewsService.add({
            title,content,
            category:Number(category),
            isPublish:Number(isPublish),
            // isPublish,
            cover,
            editTime:new Date()
        })
        .then(result=>{
            if(result.affectedRows===1){
                res.send({
                    code: 200,
                })
            }
        })
       
    },
    updateList:async(req,res)=>{
        const cover = req.file?`/newsuploads/${req.file.filename}`:""
        console.log(cover)
        const {title,content,category,isPublish,num} = req.body
        await NewsService.updateList({
            num,
            title,content,
            category:Number(category),
            isPublish:Number(isPublish),
            // isPublish,
            cover,
            editTime:new Date()
        })
        .then(result=>{
            if(result.affectedRows===1){
                res.send({
                    code: 200,
                })
            }
        })
    },
    getList:async(req,res)=>{

        const result = await NewsService.getList(req.params.num)
            res.send({
                code:200,
                data:result
            })
    },
    publish:async(req,res)=>{
        const { num,isPublish } = req.body
        console.log("这是更新",isPublish)
        editTime = new Date()
        const result=await NewsService.publish(
            num,isPublish,
            editTime
        )
        .then(result=>{
            res.send({
                code:200,
                data:result
            })
        })
        
    },
    delList:async(req,res)=>{
        const result = await NewsService.delList({num:req.params.num})
        res.send({
            code:200,
        })
    },
    
}

module.exports = NewsController