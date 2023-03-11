'use strict'

const express = require("express")
const {Router} = require("express")
const {createProduct, updateProduct, deleteProduct, listProduct, searchProduct} = require("../controllers/product.controller");
const {check} = require("express-validator");
const {validateParams} = require("../middlewares/validate-params");

const api = Router();

api.post("/create-product",[
    check("productName", "El nombre es obligatorio").not().isEmpty(),
    check("Stock", "El stock es obligatorio").not().isEmpty(),
    check("productPrice", "El precio es obligatorio").not().isEmpty(),
    validateParams,
], createProduct);

api.put("/update-product/:id", updateProduct);

api.get("/list-product", listProduct);

api.get("/search-product/:productName", searchProduct)

api.delete("/delete-product/:id", deleteProduct)

module.exports = api;