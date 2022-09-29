const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    n_id: String,
    rut: String,
    name:String,
    lastname:String,
    father: String,
    mother: String,
    birth: String,
    email:String,
    phone:String,
    Obs: String,
    inscr_Date:String,
    Bautismo:{
        padrino: String,
        madrina: String,
        fecha: String,
        padre: String,
        lugar: String,
        preparacion: String
    },
    Confirmacion:{
        padrino: String,
        madrina: String,
        fecha: String,
        padre: String,
        lugar: String
    },
    Matrimonio: {
        padrino: String,
        madrina: String,
        pareja: String,
        fecha: String,
        padre: String,
        lugar: String,
    },
    Referencia:String,
})

module.exports = mongoose.model("documentos", userSchema);
