const mongoose = require("mongoose");

const parentsSchema = new mongoose.Schema({
    p_father: String,
    p_mother: String,
    p_phone_father: String,
    p_phone_mother: String,
    p_lugar: String,
    p_parent_Status: String,
    p_relation: String,
})

module.exports = mongoose.model("padresymadres", parentsSchema);