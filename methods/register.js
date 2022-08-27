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
    const checkEmail = email.replace(" ", "");

    if (checkEmail != '' || userData.password != '')
    {
        bcrypt.hash(userData.password, saltRounds, async function(err, hash) {
            
            let hashedUserPassword = {
                name: userData.name,
                email: checkEmail,
                password: hash
            }
            let user = new usuarios(hashedUserPassword);
            let result = await user.save();
            res.send(result);
        });
    } else {
        return res.status(400).json({
            status: false,
            msg: "email or psswrd cant be blank"
        });
    }
    
})

module.exports = register;