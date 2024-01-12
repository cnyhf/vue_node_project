var express = require('express');

var ProductsRouter = express.Router();
//图片上传
const multer = require('multer')
//放在静态资源文件夹下
const upload = multer({dest:'public/Productsuploads/'})
const ProductsController = require("../../controllers/admin/ProductsController")

//涉及文件上传，普通的post不行，需要加上multer中间件
ProductsRouter.post("/adminapi/products/add",upload.single("file"),ProductsController.add)
ProductsRouter.get("/adminapi/products/list",ProductsController.getList)
ProductsRouter.delete("/adminapi/products/list/:pid",ProductsController.delList)
ProductsRouter.post("/adminapi/products/list",upload.single("file"),ProductsController.updateList)
ProductsRouter.get("/adminapi/products/list/:pid",ProductsController.getList)


module.exports = ProductsRouter