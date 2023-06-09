'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    rol:{
        type: String,
        required: true,
        default: "CLIENTE"
    }
})

module.exports = mongoose.module("User", userModel)