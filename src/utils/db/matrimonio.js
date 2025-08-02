const mongoose = require("mongoose");

const marriageSchema = new mongoose.Schema({
    m_place1: String,
    m_place2: String,
    m_partner_name: String,
    m_partner_lastname: String,
    m_date: String,
    m_father: String,
    m_padrino: String,
    m_madrina: String,
})

module.exports = mongoose.model("matrimonio", marriageSchema);