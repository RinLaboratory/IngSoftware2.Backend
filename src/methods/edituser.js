const bcrypt = require('bcrypt');
const express = require("express");
require('dotenv').config()
require("../db/config");
const usuarios = require("../db/usuarios")
const password = require('../db/password');

const edituser = new express.Router();

const jwt = require('jsonwebtoken');

const notFound = (res) => {
    // se crea una funcion ya que de muchas opciones solo pueden devolver 2 tipos de resultados, éste siendo para todos los intentos erroneos
    return res.status(400).json({
        status: false,
        msg: "user not found"
    });
}

edituser.put("/edituser", async (req,res) =>{
    const userData = req.body;
    const saltRounds = parseInt(process.env.HOW_MANY_HASHES);

    // el correo no puede tener espacios entremedio, así que se elimininan
    const email = userData.email;
    var checkEmail = email.split(' ').join('');
    var users = "";

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
    
    if (checkEmail.length !== 0)
    {
        users = await usuarios.find({email: checkEmail});
        if(users.length === 0) {
            // si llega aquí es porque el usuario no está registrado o no se ha encontrado.
            notFound(res);
        }

        bcrypt.hash(userData.password, saltRounds, async function(err, hash) {
            
            const pass = await password.findById(userData.password_id)

            if (userData.password && userData.password.length !== 0){
                await pass.updateOne({password: hash})
            }

            const user = await usuarios.findById(userData._id);

            let b_nombre = userData.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let b_apellido = userData.lastname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            
            if (userData.rol == "*" && user.rol != "*"){
                return res.status(200).json({
                    status: false,
                    msg: "cant give that rol"
                });
            }
            if (user.rol == "*" && userData.rol != "*"){
                return res.status(200).json({
                    status: false,
                    msg: "cant give that rol"
                });
            }

            const datos = {
                name: userData.name,
                nameE: b_nombre,
                lastname: userData.lastname,
                lastnameE: b_apellido,
                email: userData.email,
                rol: userData.rol,
                password_id: userData.password_id,
                phone: userData.phone,
                lastSeen: userData.lastSeen
            }
            
            await user.updateOne(datos)

            return res.status(200).json({
                status: true
            });
        });
    } else {
        return res.status(200).json({
            status: false,
            msg: "email cant be blank"
        });
    }
    
})

module.exports = edituser;