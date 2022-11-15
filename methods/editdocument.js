const express = require("express");

require("../db/config");
const documentos = require("../db/documentos")
const parents = require("../db/parents")
const bautismo = require("../db/bautismo")
const confirmacion = require("../db/confirmacion")
const matrimonio = require("../db/matrimonio")

const editdocument = new express.Router();

const usuarios = require("../db/usuarios")
const jwt = require('jsonwebtoken');

editdocument.post('/editdocument', async (req, res) => {
    const data = req.body
    let p_parent = "" ;
    let d_bautismo = "";
    let d_confirmacion = "";
    let d_matrimonio = "";

    const token = req.header('x-token');
    const {uuid} = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    );
    const usuario = await usuarios.findById(uuid)

    if (usuario.rol == "NINGUNO"){
        return res.status(200).json({
            status: false,
            msg: "no perms"
        });
    }

    const findDocument = await documentos.findById(data._id)

    if (data.Documento.name.length !== 0 && data.Documento.lastname.length !== 0)
    {
      if(data.Documento.parent_Data.p_id != "")
      {
        const findParents = await parents.findById(data.Documento.parent_Data.p_id)
        await findParents.updateOne(data.parent_Data)
      } else {
        if(data.A_parent){
          p_parent = new parents(data.parent_Data)
          await p_parent.save() 
        }
      }
      if(data.Documento.Bautismo.b_id != "")
      {
        const findBautismo = await bautismo.findById(data.Documento.Bautismo.b_id)
        await findBautismo.updateOne(data.Bautismo)
      } else {
        if(data.A_bautismo){
          d_bautismo = new bautismo(data.Bautismo)
          await d_bautismo.save() 
        }
      }
      if(data.Documento.Confirmacion.c_id != "")
      {
        const findConfirmacion = await confirmacion.findById(data.Documento.Confirmacion.c_id)
        await findConfirmacion.updateOne(data.Confirmacion)
      } else {
        if(data.A_confirmacion){
          d_confirmacion = new confirmacion(data.Confirmacion)
          await d_confirmacion.save() 
        }
      }
      if(data.Documento.Matrimonio.m_id != "")
      {
        const findMatrimonio = await matrimonio.findById(data.Documento.Matrimonio.m_id)
        await findMatrimonio.updateOne(data.Matrimonio)
      } else {
        if(data.A_matrimonio){
          d_matrimonio = new matrimonio(data.Matrimonio)
          await d_matrimonio.save() 
        }
      }

      let b_nombre = data.Documento.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      let b_apellido = data.Documento.lastname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

      let datos = {
        ...data.Documento,
        inscr_Date: data.Bautismo.b_date,
        nameE: b_nombre,
        lastnameE: b_apellido,
        parent_Data:{
            p_id: (data.Documento.parent_Data.p_id != "" ? data.Documento.parent_Data.p_id:(p_parent == "" ? "":p_parent._id.toString()))
        },
        Bautismo:{
            b_id: (data.Documento.Bautismo.b_id != "" ? data.Documento.Bautismo.b_id:(d_bautismo == "" ? "":d_bautismo._id.toString()))
        },
        Confirmacion:{
            c_id: (data.Documento.Confirmacion.c_id != "" ? data.Documento.Confirmacion.c_id:(d_confirmacion == "" ? "":d_confirmacion._id.toString()))
        },
        Matrimonio:{
            m_id: (data.Documento.Matrimonio.m_id != "" ? data.Documento.Matrimonio.m_id:(d_matrimonio == "" ? "":d_matrimonio._id.toString()))
        },
      }

      await findDocument.updateOne(datos)
      return res.status(200).json({
        status: true
    });
    } else {
      return res.status(200).json({
          status: false,
          msg: "name and lastname cant be blank"
      });
  }
  })
  module.exports = editdocument;