const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    lastname:String,
    email:String,
    phone:String,
    inscr_Date:String,
    Bautismo:{
        padrino: String,
        madrina: String,
        fecha: String,
        padre: String,
        lugar: String
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
