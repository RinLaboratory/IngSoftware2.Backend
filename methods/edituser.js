const bcrypt = require('bcrypt');
const express = require("express");
require('dotenv').config()
require("../db/config");
const usuarios = require("../db/usuarios")
const password = require('../db/password');

const edituser = new express.Router();

const notFound = (res) => {
    // se crea una funcion ya que de muchas opciones solo pueden devolver 2 tipos de resultados, éste siendo para todos los intentos erroneos
    return res.status(400).json({
        status: false,
        msg: "user not found"
    });
}

edituser.post("/edituser", async (req,res) =>{
    const userData = req.body;
    const saltRounds = parseInt(process.env.HOW_MANY_HASHES);
    

    // el correo no puede tener espacios entremedio, así que se elimininan
    const email = userData.userData.email;
    var checkEmail = email.split(' ').join('');
    var users = "";

    console.log(userData)
    
    if (checkEmail.length !== 0)
    {
        users = await usuarios.find({email: checkEmail});
        if(users.length === 0) {
            // si llega aquí es porque el usuario no está registrado o no se ha encontrado.
            notFound(res);
        }

        bcrypt.hash(userData.password.password, saltRounds, async function(err, hash) {
            
            const pass = await password.findById(userData.userData.password_id)

            if (userData.password.password.length !== 0){
                await pass.updateOne({password: hash})
            }

            const user = await usuarios.findById(userData.userData._id);

            let b_nombre = userData.userData.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let b_apellido = userData.userData.lastname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

            const datos = {
                name: userData.userData.name,
                nameE: b_nombre,
                lastname: userData.userData.lastname,
                lastnameE: b_apellido,
                email: userData.userData.email,
                rol: userData.userData.rol,
                password_id: userData.userData.password_id,
                phone: userData.userData.phone,
                lastSeen: userData.userData.lastSeen
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