const express = require("express");


require("../db/config");
const documentos = require("../db/documentos")
const bautismo = require("../db/bautismo")
const confirmacion = require("../db/confirmacion")
const matrimonio = require("../db/matrimonio")
const parents = require("../db/parents")

const getadjacentdocuments = new express.Router();

getadjacentdocuments.post("/getadjacentdocuments", async (req,res) =>{
    const data = req.body

    let Data_bautismo = ""
    let Data_confirmacion = ""
    let Data_matrimonio = ""
    let Data_parents = ""
    if(!data.export){
        if(data.Bautismo.b_id != ""){
            Data_bautismo = await bautismo.findById(data.Bautismo.b_id);
        }
        if(data.Confirmacion.c_id != ""){
            Data_confirmacion = await confirmacion.findById(data.Confirmacion.c_id);
        }
        if(data.Matrimonio.m_id != ""){
            Data_matrimonio = await matrimonio.findById(data.Matrimonio.m_id);
        }
        if(data.parent_Data.p_id != ""){
            Data_parents = await parents.findById(data.parent_Data.p_id);
        }
    } else {
        return res.status(200).json();
    }
    

    return res.status(200).json({
        Bautismo: Data_bautismo,
        Matrimonio: Data_matrimonio,
        Confirmacion: Data_confirmacion,
        parent_Data: Data_parents
    });

})

module.exports = getadjacentdocuments;