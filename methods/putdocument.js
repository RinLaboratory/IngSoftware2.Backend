const express = require("express");
const { get } = require("mongoose");
const {ObjectId} = require("mongoose")
require("../db/config");
const documentos = require("../db/documentos")

const putdocument = new express.Router();

putdocument.put('/putdocument', async (req, res) => {
    const {id, nombre, email } = req.body
    await documentos.updateOne({_id:id}, {$set:{nombre, email}})
    res.json({ msg: "documento actualizado :=)"})
  })
  module.exports = putdocument;