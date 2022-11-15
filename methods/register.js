const bcrypt = require('bcrypt');
const express = require("express");
require('dotenv').config()
require("../db/config");
const usuarios = require("../db/usuarios")
const password = require('../db/password');

const register = new express.Router();

const jwt = require('jsonwebtoken');

register.post("/register", async (req,res) =>{
    const userData = req.body;
    const saltRounds = parseInt(process.env.HOW_MANY_HASHES);
    
    const token = req.header('x-token');
    const {uuid} = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    );
    const usuario = await usuarios.findById(uuid)
    
    if (usuario.rol == "NINGUNO" || usuario.rol == "FELIGRES" ){
        return res.status(200).json({
            status: false,
            msg: "no perms"
        });
    }


    // el correo no puede tener espacios entremedio, así que se elimininan
    const email = userData.userData.email;
    var checkEmail = email.split(' ').join('');
    var users = "";
    
    if (checkEmail.length !== 0 && userData.password.password.length != 0)
    {
        users = await usuarios.find({email: checkEmail});
        if (users.length > 0) {
            return res.status(200).json({
                status: false,
                msg: "email already exists"
            });
        } else {
            bcrypt.hash(userData.password.password, saltRounds, async function(err, hash) {
                
                let pass = new password({password: hash})
                await pass.save();

                let b_nombre = userData.userData.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                let b_apellido = userData.userData.lastname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

                if (userData.userData.rol == "*"){
                    return res.status(200).json({
                        status: false,
                        msg: "cant give that rol"
                    });
                }

                let hashedUserPassword = {
                    name: userData.userData.name,
                    nameE: b_nombre,
                    lastname: userData.userData.lastname,
                    lastnameE: b_apellido,
                    rol: userData.userData.rol,
                    phone: userData.userData.phone,
                    email: checkEmail,
                    password_id: pass._id.toString()
                }

                let user = new usuarios(hashedUserPassword);
                await user.save();
                return res.status(200).json({
                    status: true
                });
            });
        }
        
    } else {
        return res.status(200).json({
            status: false,
            msg: "email or psswrd cant be blank"
        });
    }
    
})

module.exports = register;