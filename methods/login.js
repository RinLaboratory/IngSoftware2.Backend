const bcrypt = require('bcrypt');
const express = require("express");
const JsonWebTokenSign = require("../WebToken/jwt");
require("../db/config");
const usuarios = require("../db/usuarios")
const password = require("../db/password")

const login = new express.Router();

const incorrectPass = (res) => {
    // se crea una funcion ya que de muchas opciones solo pueden devolver 2 tipos de resultados, éste siendo para todos los intentos erroneos
    return res.status(400).json({
        status: false,
        msg: "Incorrect password"
    });
}

login.post("/auth", async (req,res) =>{

    const userData = req.body;
    var validation = false;
    
    // si el correo del usuario contiene datos
    if (userData.email != ''){

        // buscamos los usuarios que coincidan con el correo colocado
        const user = await usuarios.findOne({ email: userData.email })

        if(!user) {
            // si llega aquí es porque el usuario no está registrado o no se ha encontrado.
            incorrectPass(res);
        }

        const pass = await password.findById(user.password_id);

        // comparación de la contraseña almacenada en la db y la entregada por el usuario (await si tiene efecto en esta funcion aunque diga que no)
        validation = bcrypt.compare(userData.password, pass.password);

        if(validation) {
            try {
                const token = await JsonWebTokenSign(user._id.toString(), user.name);

                // console.log(token)
                // el usuario está autenticado
                await user.updateOne({...user.toJSON(), lastSeen: new Date()})

                return res.status(200).json({
                    status: validation,
                    token: token
                })

            } catch ( err ) {
                // return res.status(500).json({
                //     status: false,
                //     msg: "Web Server Error"
                // });
            }
        } else {
            // contraseña incorrecta
            incorrectPass(res);
        }
    } else {
        // si llega aquí es porque se recibió una petición donde el correo está vacío.
        incorrectPass(res);
    }
})

module.exports = login;
