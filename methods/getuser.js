const express = require("express");

require("../db/config");
const usuarios = require("../db/usuarios")

const getUser = new express.Router();

getUser.post("/getusers", async (req,res) =>{
    const data = req.body;
    const texto = data.buscar.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    let nameRegex = new RegExp(texto);
    var users = "";

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