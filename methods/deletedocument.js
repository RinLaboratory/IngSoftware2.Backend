const express = require("express");

require("../db/config");
const usuarios = require("../db/usuarios")

const deletdocument = new express.Router();

deletdocument.post("/deletdocument", async (req,res) =>{
    const data = req.body;
    var confirmation = ""
    try {
        if (data.rol == "*")
        {
            confirmation = await usuarios.deleteOne({_id: data._id});
            return res.status(200).json({
                status: true
            });
        } else {
            return res.status(200).json({
                status: false
            })
            
        }
    } catch (e)
    {
        return res.status(200).json({
            status: false
        });
    }
    
})

module.exports = deletdocument;