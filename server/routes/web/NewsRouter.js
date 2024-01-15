var express = require('express');

var NewsRouter = express.Router();

const NewsController = require("../../controllers/web/NewsControllers")


NewsRouter.get("/webapi/news/list",NewsController.getList)

module.exports = NewsRouter