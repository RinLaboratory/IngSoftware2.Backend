const express = require("express");

require("../db/config");
const usuarios = require("../db/usuarios")

const getUser = new express.Router();

const jwt = require('jsonwebtoken');

getUser.get("/getusers", async (req,res) =>{
    const data = req.query;
    const texto = data.buscar.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    let nameRegex = new RegExp(texto);
    var users = "";

    const token = req.header('x-token');
    const {uuid} = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    );
    const usuario = await usuarios.findById(uuid)

    if (usuario.rol == "NINGUNO"){
        return res.status(200).json({
            users: []
        });
    }

    if(data.buscar.length != 0 && data.search != "")
    {
        if (data.search == "NOMBRE") {
            users = await usuarios.find({nameE: {$regex: nameRegex, $options: 'i'}});
        }
        if (data.search == "APELLIDO") {
            users = await usuarios.find({lastnameE: {$regex: nameRegex, $options: 'i'}});
        }
        if (data.search == "CORREO") {
            users = await usuarios.find({email: {$regex: nameRegex, $options: 'i'}});
        }
        if (data.search == "ID") {
            users = await usuarios.find({_id: {$regex: nameRegex, $options: 'i'}});
        }
    } else {
        users = await usuarios.find({});
    }
    return res.status(200).json({
        users: users
    });
})

module.exports = getUser;