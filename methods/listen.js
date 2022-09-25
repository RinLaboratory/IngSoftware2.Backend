const express = require("express");
const { get } = require("mongoose");
const {ObjectId} = require("mongoose")
require("../db/config");
const documentos = require("../db/documentos")

const listen = new express.Router();

listen.listen(port,() => {
    console.log(`app listening at http://localhost:${port}`)
  })
  module.exports = listen;