const express = require("express");

require("../db/config");
const documento = require("../db/documentos")

const BorrorarDocumento = new express.Router();

BorrorarDocumento.post("/deletdocument", async (req,res) =>{
    const data = req.body;
    var confirmation = ""
    try {
        if (data.rol == "*")
        {
            confirmation = await documento.deleteOne({_id: data._id});
            return res.status(200).json({
                status: true
            });
        } else {
            confirmation = await documento.deleteOne({_id: data._id});
            return res.status(200).json({
                status: true
            })
            
        }
    } catch (e)
    {
        return res.status(200).json({
            status: false
        });
    }
    
})

module.exports = BorrorarDocumento;