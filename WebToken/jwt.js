const jwt = require("jsonwebtoken");
require('dotenv').config()

const JsonWebTokenSign = ( uuid, name ) =>{

    return new Promise((resolve, reject) => {
        const payload = { uuid, name };
        //validar el inicio de sesion con la clave almacenada en .env
        jwt.sign( payload, process.env.SECRET_JWT_SEED, { expiresIn: process.env.SECRET_JWT_SEED_EXPIRATION_TIME }, (err, token) => {
            if(err) {
                console.warn(err);
                reject("Error interno");
            }
            resolve( token );
        });
    });
}

module.exports = JsonWebTokenSign;