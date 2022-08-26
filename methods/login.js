const bcrypt = require('bcrypt');
const express = require("express");
const JsonWebTokenSign = require("../WebToken/jwt");
require("../db/config");
const Usuario = require("../db/usuarios")

const login = new express.Router();

login.post("/auth", async (req,res) =>{
<<<<<<< HEAD
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
=======
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
>>>>>>> e74243c55606868c8dc48633d2f10eaa5a44e17b
    
})

module.exports = login;