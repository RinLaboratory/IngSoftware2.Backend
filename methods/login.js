const bcrypt = require('bcrypt');
const express = require("express");
const JsonWebTokenSign = require("../WebToken/jwt");
require("../db/config");
const Usuario = require("../db/usuarios")

const login = new express.Router();

login.post("/auth", async (req,res) =>{
    const { email, password } = req.body;
    console.log(email, password);

    try{
        const usuario = await Usuario.findOne({email});

        console.log(usuario)

        if(!usuario) {
            return res.status(400).json({
                status: false,
                msg: 'email y/o contraseña incorrecto'
            })
        }

        const validPassword = bcrypt.compareSync(password, usuario.password)

        console.log(validPassword);
        
        if (!validPassword) {
            return res.status(400).json({
                status: false,
                msg: "email y/o contraseña incorrecto"
            })
        }


        const token = await JsonWebTokenSign(usuario._id, usuario.name)
        
        if( validPassword ) {
            console.log('entra')
            return res.status(200).json({
                status: true, 
                token
            })
        }



    } catch(error) {
        return res.status(500).json({
            status: false,
            msg: 'Debe actualizar la página'
        })
    
    }
    
})

module.exports = login;