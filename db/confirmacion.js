const mongoose = require("mongoose");

const confirmSchema = new mongoose.Schema({
    c_place1: String,
    c_place2: String,
    c_date: String,
    c_father: String,
    c_padrino: String,
    c_madrina: String,
})

module.exports = mongoose.model("confirmacion", confirmSchema);