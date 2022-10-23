const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    nameE:String,
    lastname:String,
    lastnameE:String,
    email:String,
    password_id:String,
    rol: String,
    phone: String,
    lastSeen: String
})

userSchema.index({name: 'text'})
module.exports = mongoose.model("usuarios", userSchema);