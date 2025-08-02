const express = require("express");
require("../db/config");

const listen = new express.Router();

listen.listen(port,() => {
    console.log(`app listening at http://localhost:${port}`)
  })
  module.exports = listen;