'use strict'

const ShopCart = require("../models/shopCart.model")

const createCart = async(req,res) =>{
    const {cartCode} = req.body;
    try{
        let shopCart = await ShopCart.findOne({cartCode:cartCode})
        if(shopCart){
            return res.status(400).send({message:"Carrito en uso", ok: false, shopCart:shopCart})
        }
        shopCart = new ShopCart(req.body);

        shopCart = await shopCart.save();

        res.status(200).send({message:"Carrito creado correctamente"})
    }catch(err){
        throw new Error(err);
    }
};

const deleteCart = async(req,res) =>{
    try{
        const id = req.params.id;
        const cartDelete = await ShopCart.findByIdAndDelete(id)
        return res.status(200).send({
            message:"Carrito eliminado correctamente",
            cartDelete
        })
    }catch(err){
        throw new Error(err)
    }
}

const agregarProducto = async(req,res) =>{
    try{
        const id = req.params.id;
        const {productName, Stock, productPrice, amountSold} = req.body;
        
        const cartProduct = await ShopCart.findByIdAndUpdate(
            id,
            {
                $push: {
                    product: {
                        productName: productName,
                        Stock: Stock,
                        productPrice: productPrice,
                        amountSold: amountSold,
                    },
                },
            },
            {new: true}
        );
        if(!cartProduct){
            return res.status(404).send({message:"Carro de compras no encontrado"})
        }

        return res.status(200).send({cartProduct})
    }catch(err){
        throw new Error(err)
    }
};

const eliminarProducto = async(req,res) =>{
    const id = req.params.id;
    const {idProduct} = req.body;
    try{
        const deleteProduct = await ShopCart.updateOne(
            {id},
            {
                $pull: {product:{_id: idProduct}}
            },
            {new: true, multi: false}
        );

        if(!deleteProduct){
            return res.status(404).send({message:"Este producto no esta en el carrito"});
        }

        return res.status(200).send({deleteProduct})
    }catch(err){
        throw new Error(err)
    }
};

module.exports = {createCart, deleteCart, agregarProducto, eliminarProducto}