const express = require("express");
const { get } = require("mongoose");
const {ObjectId} = require("mongoose")
require("../db/config");
const documentos = require("../db/documentos")

const editdocument = new express.Router();

editdocument.post('/editdocument', async (req, res) => {
    const data = req.body
    const findDocument = await documentos.findById(data._id)

    if (data.name.length !== 0 && data.name.length !== 0)
    {
      await findDocument.updateOne(data)
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