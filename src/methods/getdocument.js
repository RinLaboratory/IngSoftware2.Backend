const express = require("express");


require("../db/config");
const documentos = require("../db/documentos")

const getdocument = new express.Router();

const jwt = require('jsonwebtoken');
const usuarios = require("../db/usuarios")

getdocument.get("/getdocument", async (req,res) =>{
    const data = req.query
    const texto = req.query.search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    let nameRegex = new RegExp(texto);
    var documents = "";

    const token = req.header('x-token');
    const {uuid} = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    );
    const usuario = await usuarios.findById(uuid)

    if (usuario.rol == "NINGUNO"){
        return res.status(200).json({
            documents: [],
        });
    }

    try {
    
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
            documents = await documentos.find();
        }
        if (data.selectValue == "exportPackage" && texto !== "undefined") {
            documents = await documentos.find({_id: texto});
        }

    return res.status(200).json({
        documents: documents,
    });
    }
    catch (e) {
        return res.status(200).json({
            documents: [],
        });
    }
})

module.exports = getdocument;