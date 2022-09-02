const express = require("express");
const { get } = require("mongoose");
const {ObjectId} = require("mongoose")
require("../db/config");
const documentos = require("../db/documentos")

const getdocument = new express.Router();

getdocument.get("/getdocument", async (req,res) =>{
    let Documentos = await getdocument.find()
    // declarar variable de alcance local tipo bloque
    res.json (Documentos)
})

module.exports = getdocument;