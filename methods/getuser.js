const express = require("express");

require("../db/config");
const usuarios = require("../db/usuarios")

const getUser = new express.Router();

getUser.post("/getusers", async (req,res) =>{
    const data = req.body;
    var users = "";

    if (data.search == "NOMBRE") {
        users = await usuarios.find({name: data.buscar});
    }
    if (data.search == "APELLIDO") {
        users = await usuarios.find({lastname: data.buscar});
    }
    if (data.search == "CORREO") {
        users = await usuarios.find({email: data.buscar});
    }
    if (data.search == "ID") {
        users = await usuarios.find({_id: data.buscar});
    }
    if (data.search == "default") {
        users = await usuarios.find({});
    }
    return res.status(200).json({
        users: users
    });
})

module.exports = getUser;