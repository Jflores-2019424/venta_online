'use strict'

const Product = require("../models/product.model");

const createProduct = async(req, res) =>{
    const {productName, Stock} = req.body;
    try{
        let product = await Product.findOne({productName: productName});
        if(product){
            return res.status(400).send({
                ok: false,
                message: "Este producto ya existe",
                product: product})
        }
        product = new Product(req.body);

        product = await product.save();

        res.status(200).send({
            message: `Producto ${productName} ha sido creado correctmente con un stock de ${Stock}`,
            ok: true,
            product: product})
    }catch(err){
        throw new Error(err);
        }
};

const updateProduct = async(req,res) =>{
    try{
        const id = req.params.id;
        const productEdit = {...req.body};

        const productComplete = await Product.findByIdAndUpdate(id, productEdit, {new:true,});
        if(productEdit){
            return res.status(200).send({message: "Producto actualizado", productComplete});
        }else{
            res.status(400).send({message: "Error al actualizar"});
        }
    }catch(err){
        throw new Error(err);
    }
};

const listProduct = async(req,res) =>{
    try{
        const product = await Product.find();
        if(!product){
            res.status(404).send({message: "No hay productos"})
        }else{
            res.status(200).send({productos_existentes: product})
        }
    }catch(err){
        throw new Error(err);
    }
};

const searchProduct = async(req,res) =>{
    const {productName} = req.body;
    try{
        const product = await Product.find({productName:productName});
        if(!product){
            res.status(404).send({message:"Producto no encontrado"})
        }else{
            res.status(200).send({producto:product})
        }
    }catch(err){
        throw new Error(err);
    }
};

const outOfStock = async(req,res) =>{
    const {Stock} = req.body;
    try{
        const product = await Product.find({Stock: "0"})
        if(!product){
            res.status(404).send({message:"Todos los productos tienen inventario"})
        }else{
            res.status(200).send({product:product})
        }
    }catch(err){
        throw new (err)
    }
};

const deleteProduct = async(req,res) =>{
    try{
        const id = req.params.id;
        const result = await Product.findByIdAndDelete(id);
        res.status(200).send({message:"Producto eliminado correctamente", result})
    }catch(err){
        res.status(500).send({message:"Error al eliminar"})
        throw new Error(err);
    }
};

module.exports = {createProduct, updateProduct, listProduct, deleteProduct, searchProduct, outOfStock};