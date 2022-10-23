const express = require("express");


require("../db/config");
const documentos = require("../db/documentos")

const getdocument = new express.Router();

getdocument.post("/getdocument", async (req,res) =>{
    const data = req.body
    const texto = req.body.texto
    const varDocumentoBautismo = []
    const varDocumentoMatrimonio = []
    const varDocumentoConfirmacion = []
    let nameRegex = new RegExp(texto);
    let doc = await documentos.find({nameE: {$regex: nameRegex, $options: 'i'}})
    let Bautismo = await documentos.find({nameE: {$regex: nameRegex, $options: 'i'}})
    let Confirmacion = await documentos.find({nameE: {$regex: nameRegex, $options: 'i'}})
    let Matrimonio = await documentos.find({nameE: {$regex: nameRegex, $options: 'i'}})
    for (var x = 0; x < Bautismo.length; x++ ){
        if(Bautismo[x].Bautismo.fecha != ""){
            varDocumentoBautismo.push(Bautismo[x]) 
        }
        
    }
    for (var x = 0; x < Matrimonio.length; x++ ){
        if(Matrimonio[x].Matrimonio.fecha != ""){
            varDocumentoMatrimonio.push(Matrimonio[x]) 
        }
        
    }
    for (var x = 0; x < Confirmacion.length; x++ ){
        if(Confirmacion[x].Confirmacion.fecha != ""){
            varDocumentoConfirmacion.push(Confirmacion[x]) 
        }
        
    }
    var documents = "";
    
        if (data.search == "NOMBRE") {
            documents = await documentos.find({nameE: data.buscar});
        }
        if (data.search == "APELLIDO") {
            documents = await documentos.find({lastnameE: data.buscar});
        }
        if (data.search == "fecha") {
            documents = await documentos.find({fecha: data.buscar});
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
        documents: documents,
        doc: doc,
        Bautismo: varDocumentoBautismo,
        Matrimonio: varDocumentoMatrimonio,
        Confirmacion: varDocumentoConfirmacion
        
    });
    
})

module.exports = getdocument;