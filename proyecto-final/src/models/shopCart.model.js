'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopCartSchema = Schema({
    cartCode:{
        type: String,
        required: true
    },
    product:[{
        productName: String,
        Stock: String,
        productPrice: String,
        amountSold: String,
    }]
})