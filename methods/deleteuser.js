const express = require("express");

require("../db/config");
const usuarios = require("../db/usuarios")

const getUser = new express.Router();

getUser.post("/deleteuser", async (req,res) =>{
    const data = req.body;
    var confirmation = ""

    if (data.rol == "*")
    {
        return res.status(200).json({
            status: false
        });
    } else {
        confirmation = await usuarios.deleteOne({_id: data._id});
        console.log(confirmation)
        return res.status(200).json({
            status: true
        });
    }
})

module.exports = getUser;