'use strict'

const Category = require("../models/categorias.model");
const {model} = require("mongoose")

const createCategory = async(req,res) =>{
    const {nameCategory} = req.body;
    try{
        let category = await Category.findOne({nameCategory: nameCategory})
        if(category){
            return res.status(400).send({
                ok: false,
                message:"Categoria ya existente",
                category: category})
        }
        category = new Category(req.body);

        category = await Category.save();

        res.status(200).send({
            message: `Categoria ${nameCategory} creado correctamente`,
            ok: true,
        })
    }catch(err){
        throw new Error(err);
    }
};

const updateCategory = async(req,res) =>{
    try{
        const id = req.params.id;
        const categoryEdit = {...req.body};

        const categoryComplete = await Category.findByIdAndUpdate(id, categoryEdit, {new: true,});
        if(categoryEdit){
            return res.status(200).send({message:"Categoria actualizada", categoryComplete})
        }else{
            res.status(400).send({message:"Error al actulizar"})
        }
    }catch(err){
        throw new Error(err);
    }
};

const listCategory = async(req,res) =>{
    try{
        const category = await Category.find();
        if(!category){
            res.status(404).send({message:"No hay categorias existentes"})
        }else{
            res.status(200).send({"Categorias encontradas": category})
        }
    }catch(err){
        throw new Error(err);
    }
};

const deleteCategory = async(req,res) =>{
    try{
        const id = req.params.id;
        const categoryDelete = await Category.findByIdAndDelete(id);

        return res.status(200).send({message: "Categoria eliminada correctamente", categoryDelete})
    }catch(err){
        throw new Error(err)
    }
};

const searchCategory = async(req,res) =>{
    try{
        const id = req.params.id;
        const category = await Category.findOne(id)
        if(!category){
            res.status(404).send({message:"Categoria inexsistente"})
        }else{
            res.status(200).send({"Categoria encontrada": category})
        }
    }catch(err){
        throw new Error(err)
    }
}

module.exports = {createCategory, updateCategory, listCategory, deleteCategory, searchCategory};