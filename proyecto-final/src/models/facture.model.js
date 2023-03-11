'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billModel = Schema({
    nit: {
        type: String,
        required: true
    },
    NoFactura: {
        type: String,
        required: true
    },
    SumaTotal: {
        type: String,
        required: true
    },
    product:[{
        productName: String,
        Stock: String,
        productPrice: String
    }]
})

module.exports = mongoose.module("Bill", billModel);