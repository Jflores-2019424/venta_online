'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriasModel = Schema({
    nameCategory: {
        type: String,
        required: true
    },
    product :[{
        productName: String,
        Stock: String,
        productPrice: String
    }]
})

module.exports = mongoose.module("Categorias", categoriasModel)