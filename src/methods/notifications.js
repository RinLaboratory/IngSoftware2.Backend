const express = require("express");

require("../db/config");
const documentos = require("../db/documentos")
const usuarios = require("../db/usuarios")

const getnotifications = new express.Router();

getnotifications.get("/getnotifications", async (req,res) =>{
    const data = req.body

    let cantidad_documentos = await documentos.countDocuments()
    let cantidad_usuarios = await usuarios.countDocuments()
    let cantidad_usuarios_permisos = await usuarios.countDocuments({ rol: "SECRETARIA"})

    return res.status(200).json({
        documentos: cantidad_documentos,
        usuarios: cantidad_usuarios,
        permisos: cantidad_usuarios_permisos
    });
})

module.exports = getnotifications;