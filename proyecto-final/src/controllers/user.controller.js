'use strict'

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {generateJWT} = require("../helpers/create-jwt");


const adminApp = async(req,res) =>{ 
    try{
        let user = new User();
        user.name = "Administrador";
        user.password = "123456";
        user.email = "df132@gmail.com";
        user.rol = "ADMIN";
        const userEncontrado = await User.findOne({email: user.email});
        if(userEncontrado) return console.log("El administrador esta listo");
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
        user = user.save();
        if (!user) return console.log("El administrador no esta listo");
        return console.log("El admin esta listo")
    }catch(err){
        throw new Error(err);
    }
};

const createUser = async(req,res) =>{
    if(req.user.rol === "ADMIN"){
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email});
        if(user){
            res.status(400).send({
                message:"Un usuario ya existe con este correo",
                ok: false,
                user: user,
            });
        }
        user = new User(req.body);

        const saltos = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, saltos);

        user = await user.save();

        const token = await generateJWT(user.id, user.name, user.email);
        res.status(200).send({
            message:`Usuario ${user.name} creado correctamente`,
            ok: true,
            user,
            token: token
        });
    }catch(err){
        throw new Error(err);
    }
}else{
    return res.status(500).send({
        message:"Este usuario no esta autorizado para crear mas usuarios"
    })
}
};

const listUser = async(req,res) =>{
    try{
        const user = await User.find();

        if(!user){
            res.status(404).send({
                message:"Usuarios inexsistentes",
                ok:false
            })
        }else{
            res.status(200).json({Usuarios_Encontrados: user});
        }
    }catch(err){
        throw new Error(err);
    }
};

const updateUser = async(req,res) =>{
    if (req.user.rol === "ADMIN"){
        try{
            const id = req.params.id
            const userEdit = {...req.body};

            userEdit.password = userEdit.password
            ? bcrypt.hashSync(userEdit.password, bcrypt.genSaltSync())
            : userEdit.password;
            const userComplete = await User.findByIdAndUpdate(id, userEdit, {new: true});
            if(userComplete){
                const token = await generateJWT(
                    userComplete.id,
                    userComplete.name,
                    userComplete.email
                );
                return res.status(200).send({
                    message:"Usuario actualizado correctamente",
                    userComplete,
                    token
                });
            }else{
                res.status(400).send({
                    message:"Este usuario no existe"
                });
            }
        }catch(err){
            throw new Error(err);
        }
    }else{
        return res.status(500).send({
            message:"Este usuario no tiene permisos para actualizar datos"
        })
    }
};

const deleteUser = async(req,res) =>{
    if (req.user.rol === "ADMIN"){
        try{
            const id = req.params.id;
            const userDelete = await User.findByIdAndDelete(id);
            return res.status(200).send({
                message:"Usuario eliminado correctamente",
                userDelete
            })
        }catch(err){
            throw new Error(err);
        }
    }else{
        return res.status(500).send({
            message:"Este usuario no tiene permisos para eliminar"
        })
    }
};

const loginUser = async(req,res) =>{
    const { email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({
                ok: false,
                message:"El usuario no existe"
            })
        }
        const validPassword = bcrypt.compareSync(
            password,
            user.password
        );
        if(!validPassword){
            return res.status(400).send({
                ok: false,
                message:"Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id, user.name, user.email);
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        });
    }catch(err){
        throw new Error(err);
    }
};

module.exports = (adminApp, createUser, listUser, updateUser, deleteUser, loginUser);