const bcrypt = require('bcrypt');
const express = require("express");
const JsonWebTokenSign = require("../WebToken/jwt");
require("../db/config");
const usuarios = require("../db/usuarios")

const login = new express.Router();

login.post("/auth", async (req,res) =>{
    const userData = req.body;
    
    await usuarios.find({ email: userData.email }, function(err,users) {
        users.forEach((element) => {
            bcrypt.compare(userData.password, element.password, async function(err, validation) {
                if (!err) {
                    if(validation) {
                        const token = await JsonWebTokenSign(element._id, element.name);
                        console.log(token);
                        return res.status(200).json({
                            status: validation,
                            token: token
                        })
                    } else {
                        return res.status(400).json({
                            status: validation,
                            msg: "Incorrect password"
                        })
                    }
                } else {
                    console.warn(err);
                    return res.status(500).json({
                        status: false,
                        msg: "Web Server Error"
                    })
                }
            })
        })
        return res.status(400).json({
            status: false,
            msg: "Incorrect password"
        })
    }).clone().catch(function(err){ console.log(err)});
    
})

module.exports = login;