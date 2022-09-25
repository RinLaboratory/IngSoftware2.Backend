const express = require("express");


require("../db/config");
const documentos = require("../db/documentos")

const getdocument = new express.Router();

getdocument.post("/getdocument", async (req,res) =>{
    const data = req.body
    const texto = req.body.texto
    console.log(texto)
    let doc = await documentos.find({name: new RegExp('^'+texto+'$', "i")})
 
    var documents = "";

    
        if (data.search == "NOMBRE") {
            documents = await documentos.find({name: data.buscar});
        }
        if (data.search == "APELLIDO") {
            documents = await documentos.find({lastname: data.buscar});
        }
        if (data.search == "CORREO") {
            documents = await documentos.find({email: data.buscar});
        }
        if (data.search == "ID") {
            documents = await documentos.find({_id: data.buscar});
        }
        if (data.search == "default") {
            documents = await documentos.find({});
        }
        if (texto != "") {
            documents = await documentos.find({});
        }
    
    
    return res.status(200).json({
        documents: documents
    });
    
})

module.exports = getdocument;