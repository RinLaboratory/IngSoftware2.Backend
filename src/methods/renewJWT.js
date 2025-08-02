const { response } = require('express');
const { generarJWT } = require('../utils/helpers/jwt');
const { validarJWT } = require('../middlewares/validar-jwt');
const express = require("express");

const renewJWT = new express.Router();

renewJWT.get('/renew', validarJWT ,async (req, res = response ) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        uid,
        name,
        token
    })
})

module.exports = renewJWT;
