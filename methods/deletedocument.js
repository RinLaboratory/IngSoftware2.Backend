const express = require("express");

require("../db/config");
const documento = require("../db/documentos")
const parents = require("../db/parents")
const bautismo = require("../db/bautismo")
const confirmacion = require("../db/confirmacion")
const matrimonio = require("../db/matrimonio")

const BorrarDocumento = new express.Router();

BorrarDocumento.post("/deletedocument", async (req,res) =>{
    const data = req.body;
    console.log(data)
    try {
        if(data.parent_Data.p_id != ""){
            await parents.deleteOne({_id: data.parent_Data.p_id});
        }
        if(data.Bautismo.b_id != ""){
            await bautismo.deleteOne({_id: data.Bautismo.b_id});
        }
        if(data.Confirmacion.c_id != ""){
            await confirmacion.deleteOne({_id: data.Confirmacion.c_id});
        }
        if(data.Matrimonio.m_id != ""){
            await matrimonio.deleteOne({_id: data.Matrimonio.m_id});
        }
        await documento.deleteOne({_id: data._id});
        return res.status(200).json({
            status: true
        })
    } catch (e)
    {
        console.log(e)
        return res.status(200).json({
            status: false
        });
    }
    
})

module.exports = BorrarDocumento;