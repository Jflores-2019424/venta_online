'use strict'

const express = require("express");
const {Router} = require("express");
const {createUser, listUser, updateUser, deleteUser, loginUser} = require("../controllers/user.controller");
const {check} = require("express-validator");
const {validateParams} = require("../middlewares/validate-params")
const {validateJWT} = require("../middlewares/validate-jwt");

const api = Router();

api.post("/create-user",createUser);

api.put("/update-user", updateUser);

api.get("/list-user", listUser);

api.delete("/delete-user", deleteUser);

module.exports = api;