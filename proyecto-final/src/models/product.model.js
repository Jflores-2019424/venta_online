'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = Schema({
    productName: {
        type: String,
        required: true
    },
    Stock: {
        type: String,
        required: true
    },
    productPrice:{
        type: String,
        required: true
    },
    amountSold:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Products", productsSchema)