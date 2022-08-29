const bcrypt = require('bcrypt');
const express = require("express");
require('dotenv').config()
require("../db/config");
const usuarios = require("../db/usuarios")

const register = new express.Router();

register.post("/register", async (req,res) =>{
    const userData = req.body;
    const saltRounds = parseInt(process.env.HOW_MANY_HASHES);
    
    // el correo no puede tener espacios entremedio, así que se elimininan
    const email = userData.email;
    var checkEmail = email.split(' ').join('');
    var users = "";
    
    if (checkEmail.length !== 0 && userData.password.length != 0)
    {
        users = await usuarios.find({email: checkEmail});
        if (users.length > 0) {
            return res.status(200).json({
                status: false,
                msg: "email already exists"
            });
        } else {
            bcrypt.hash(userData.password, saltRounds, async function(err, hash) {
            
                let hashedUserPassword = {
                    name: userData.name,
                    lastname: userData.lastname,
                    rol: userData.rol,
                    phone: userData.phone,
                    email: checkEmail,
                    password: hash
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