const express = require("express");
require("../db/config");

const documentos = require("../db/documentos")
const parents = require("../db/parents")
const bautismo = require("../db/bautismo")
const confirmacion = require("../db/confirmacion")
const matrimonio = require("../db/matrimonio")

const adddocument = new express.Router();

adddocument.post("/adddocument", async (req,res) =>{
    const data = req.body
    var docs = "";

    if (data.Documento.name.length !== 0 && data.Documento.lastname.length !== 0)
    {
        docs = await documentos.find({name: data.Documento.name, lastname: data.Documento.lastname, rut: data.Documento.rut});
        if (docs.length > 0)
        {
            return res.status(200).json({
                status: false,
                msg: "document already exists"
            });
        } else {
            let p_parent = "" ;
            let d_bautismo = "";
            let d_confirmacion = "";
            let d_matrimonio = "";

            if(data.A_parent){
                p_parent = new parents(data.parent_Data)
                await p_parent.save() 
            }
            if(data.A_bautismo){
                d_bautismo = new bautismo(data.Bautismo)
                await d_bautismo.save() 
            }
            if(data.A_confirmacion){
                d_confirmacion = new confirmacion(data.Confirmacion)
                await d_confirmacion.save() 
            }
            if(data.A_matrimonio){
                d_matrimonio = new matrimonio(data.Matrimonio)
                await d_matrimonio.save() 
            }
            let datos = {
                ...data.Documento,
                parent_Data:{
                    p_id: (p_parent == "" ? "":p_parent._id.toString())
                },
                Bautismo:{
                    b_id: (d_bautismo == "" ? "":d_bautismo._id.toString())
                },
                Confirmacion:{
                    c_id: (d_confirmacion == "" ? "":d_confirmacion._id.toString())
                },
                Matrimonio:{
                    m_id: (d_matrimonio == "" ? "":d_matrimonio._id.toString())
                },
            }

            let documento = new documentos(datos)
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