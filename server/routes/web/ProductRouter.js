var express = require('express');

var ProductRouter = express.Router();

const ProductController = require("../../controllers/web/ProductControllers")


ProductRouter.get("/webapi/product/list",ProductController.getList)

module.exports = ProductRouter