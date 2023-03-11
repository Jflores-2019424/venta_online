'use strict'

const express = require("express")
const {Router} = require("express")
const {createCart, deleteCart, agregarProducto, eliminarProducto} = require("../controllers/shopCart.controller")

const api = Router();

api.post("/create-cart", createCart);

api.delete("/delete-cart", deleteCart);

api.put("/agregar-producto/:id", agregarProducto);

api.delete("/eliminar-producto/:id", eliminarProducto)