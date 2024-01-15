const ProductService = require("../../services/web/ProductService")

const ProductController = {
    getList:async(req,res)=>{
        const result = await ProductService.getList(req.params.num)
        // console.log(result)
        res.send({
            code:200,
            data:result
        })
    },    
}

module.exports = ProductController