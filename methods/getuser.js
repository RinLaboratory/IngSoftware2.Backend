const express = require("express");

require("../db/config");
const usuarios = require("../db/usuarios")

const getUser = new express.Router();

getUser.get("/getusers", async (req,res) =>{
    usuarios.find({}, function(err,users) {
        console.log(users)
        res.send(users);
    });
})

module.exports = getUser;