const express = require("express");


require("../db/config");
const documentos = require("../db/documentos")

const getdocument = new express.Router();

getdocument.post("/getdocument", async (req,res) =>{
    const data = req.body
    const texto = req.body.search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    let nameRegex = new RegExp(texto);
    var documents = "";
    
        if (data.selectValue == "NOMBRE") {
            documents = await documentos.find({nameE: nameRegex});
        }
        if (data.selectValue == "APELLIDO") {
            documents = await documentos.find({lastnameE: nameRegex});
        }
        if (data.selectValue == "FECHAINSCRIPCION") {
            documents = await documentos.find({inscr_Date: nameRegex});
        }
        if (data.selectValue == "ID") {
            documents = await documentos.find({n_id: nameRegex});
        }
        if (data.selectValue == "default") {
            documents = await documentos.find({});
        }

    return res.status(200).json({
        documents: documents,
    });
    
})

module.exports = getdocument;