const bcrypt = require('bcrypt');
const express = require("express");
require('dotenv').config()
require("../db/config");
const Usuario = require("../db/usuarios")
const JsonWebTokenSign = require("../WebToken/jwt");


const register = new express.Router();

register.post("/auth/new", async (req,res) =>{
    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});

        if (usuario) {
            return res.status(400).json({
                status: false,
                msg: 'El usuario ya existe'
            })
        }

        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await JsonWebTokenSign(usuario._id, usuario.name);

        res.status(201).json({
            status: true,
            uid: usuario._id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: 'Por favor hable con el administrador'
        });
    } 
})

module.exports = register;