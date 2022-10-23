const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    n_id: String, 
    rut: String, 
    name:String, 
    nameE: String,
    lastname:String, 
    lastnameE: String,
    birth: String, 
    birthplace: String, 
    email:String,
    Obs: String, 
    inscr_Date: String,
    address:String,
    phone:String,
    Referencia:String, 
    parent_Data:{
        p_id: String,
    },
    Bautismo:{
        b_id: String,
    },
    Confirmacion:{
        c_id: String,
    },
    Matrimonio:{
        m_id: String,
    },
})

module.exports = mongoose.model("documentos", userSchema);
