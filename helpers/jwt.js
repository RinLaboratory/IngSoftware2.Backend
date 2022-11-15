const jwt = require('jsonwebtoken');

const generarJWT = ( uuid, name ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uuid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        })


    })
}



module.exports = {
    generarJWT
}