const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    lastname:String,
    email:String,
    password_id:String,
    rol: String,
    phone: String,
    lastSeen: String
})

module.exports = mongoose.model("usuarios", userSchema);