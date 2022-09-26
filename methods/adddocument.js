const express = require("express");
const { get } = require("mongoose");
const {ObjectId} = require("mongoose")
require("../db/config");
const documentos = require("../db/documentos")
const adddocument = new express.Router();


adddocument.post("/adddocument", async (req,res) =>{
    const data = req.body
    var docs = "";

    if (data.name.length !== 0 && data.name.length !== 0)
    {
        docs = await documentos.find({name: data.name, lastname: data.lastname, inscr_Date: data.inscr_Date});
        if (docs.length > 0)
        {
            return res.status(200).json({
                status: false,
                msg: "document already exists"
            });
        } else {
            let documento = new documentos(data)
            await documento.save() 
            return res.status(200).json({
                status: true
            });
        }
    } else {
        return res.status(200).json({
            status: false,
            msg: "name and lastname cant be blank"
        });
    }
    
})
module.exports = adddocument;