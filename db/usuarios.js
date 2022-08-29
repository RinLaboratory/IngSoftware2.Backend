const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    lastname:String,
    email:String,
    password:String,
    rol:String,
    phone:String
})

module.exports = mongoose.model("usuarios", userSchema);