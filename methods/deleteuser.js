const express = require("express");

require("../db/config");
const usuarios = require("../db/usuarios")

const getUser = new express.Router();


const jwt = require('jsonwebtoken');

getUser.post("/deleteuser", async (req,res) =>{
    const data = req.body;
    const token = req.header('x-token');
    const {uuid} = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    );
    const usuario = await usuarios.findById(uuid)
    
    if (usuario.rol == "NINGUNO" || usuario.rol == "FELIGRES" ){
        return res.status(200).json({
            status: false,
            msg: "no perms"
        });
    }

    var confirmation = ""
    try {
        if (data._id == usuario._id){
            return res.status(200).json({
                status: false
            });
        }
        if (data.rol == "*")
        {
            return res.status(200).json({
                status: false
            });
        } else {
            confirmation = await usuarios.deleteOne({_id: data._id});
            return res.status(200).json({
                status: true
            });
        }
    } catch (e)
    {
        return res.status(200).json({
            status: false
        });
    }
    
})

module.exports = getUser;