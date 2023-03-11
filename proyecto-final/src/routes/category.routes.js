'use strict'

const express = require("express");
const {Router} = require("express");
const {createCategory, updateCategory, listCategory, deleteCategory, searchCategory} = require("../controllers/category.controller")
const {validateParams} = require("../middlewares/validate-params")

const api = Router();

api.post("/create-category", createCategory);

api.put("/update-category/:id", updateCategory);

api.get("/list-category", listCategory);

api.delete("/delete-category/:id", deleteCategory);

api.get("/search-category/:id", searchCategory)

module.exports = api;