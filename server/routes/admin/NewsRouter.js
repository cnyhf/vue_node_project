var express = require('express');

var NewsRouter = express.Router();
//图片上传
const multer = require('multer')
//放在静态资源文件夹下
const upload = multer({dest:'public/newsuploads/'})
const NewsController = require("../../controllers/admin/NewsController")

//涉及文件上传，普通的post不行，需要加上multer中间件
NewsRouter.post("/adminapi/news/add",upload.single("file"),NewsController.add)
NewsRouter.get("/adminapi/news/list",NewsController.getList)
NewsRouter.get("/adminapi/news/list/:num",NewsController.getList)
NewsRouter.put("/adminapi/news/publish",NewsController.publish)
NewsRouter.delete("/adminapi/news/list/:num",NewsController.delList)
NewsRouter.post("/adminapi/news/list",upload.single("file"),NewsController.updateList)
module.exports = NewsRouter