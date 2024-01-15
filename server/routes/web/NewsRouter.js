var express = require('express');

var NewsRouter = express.Router();

const NewsController = require("../../controllers/web/NewsControllers")


NewsRouter.get("/webapi/news/list",NewsController.getList)
NewsRouter.get("/webapi/news/list/:num",NewsController.getList)
NewsRouter.get("/webapi/news/toplist",NewsController.getTopList)

module.exports = NewsRouter