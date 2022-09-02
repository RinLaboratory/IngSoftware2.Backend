const express = require("express");
const { get } = require("mongoose");
const {ObjectId} = require("mongoose")
require("../db/config");
const documentos = require("../db/documentos")
const postdocumentos = new express.Router();


postdocumentos.post("/postdocumentos", async (req,res) =>{
    const {nombre, correo } = req.body
    const documento = new documentos({ nombre, email })
    await documento.save() 
    res.json({ msg: "documento agregado ;)" });
})
module.exports = postdocumentos;