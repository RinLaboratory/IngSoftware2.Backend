const bcrypt = require('bcrypt');
const express = require("express");

require("../db/config");
const usuarios = require("../db/usuarios")

const register = new express.Router();

register.post("/register", async (req,res) =>{
    const userData = req.body;
    const saltRounds = 10;
    
    bcrypt.hash(userData.password, saltRounds, async function(err, hash) {
        let hashedUserPassword = {
            name: userData.name,
            email: userData.email,
            password: hash
        }
        let user = new usuarios(hashedUserPassword);
        let result = await user.save();
        res.send(result);
    });
})

module.exports = register;