const express = require("express");
const { get } = require("mongoose");
const {ObjectId} = require("mongoose")
require("../db/config");
const documentos = require("../db/documentos")
const adddocument = new express.Router();


adddocument.post("/adddocument", async (req,res) =>{
    const data = req.body
    console.log(data)
    let documento = new documentos(data)
    await documento.save() 
    return res.status(200).json({
        status: true
    });
})
module.exports = adddocument;