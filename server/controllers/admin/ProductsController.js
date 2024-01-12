const ProductsService = require("../../services/admin/ProductsService")

const ProductsController = {
    add:async(req,res)=>{
        // console.log(req.body)
        const cover = req.file?`/Productsuploads/${req.file.filename}`:""
        console.log(cover)
        const {title,introduction,detail} = req.body
        editTime=new Date()
        await ProductsService.add(
            title,introduction,
            detail,
            cover,
            editTime,
        )
        .then(result=>{
            if(result.affectedRows===1){
                res.send({
                    code: 200,
                })
            }
        })
       
    },
    updateList:async(req,res)=>{
        const cover = req.file?`/Productsuploads/${req.file.filename}`:""
        const {pid,title,introduction,detail} = req.body
        await ProductsService.updateList({
            pid,
            title,
            introduction,detail,
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

        const result = await ProductsService.getList(req.params.pid)
            res.send({
                code:200,
                data:result
            })
    },
    publish:async(req,res)=>{
        const { num,isPublish } = req.body
        editTime = new Date()
        await ProductsService.publish(
            num,isPublish,
            editTime
        )
        .then(result=>{
            res.send({
                code:200,
            })
        })
        
    },
    delList:async(req,res)=>{
        console.log(req.params)
        const result = await ProductsService.delList(req.params.pid)
        res.send({
            code:200,
        })
    },
    
}

module.exports = ProductsController