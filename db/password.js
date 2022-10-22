const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
    password:String,
})

module.exports = mongoose.model("password", passwordSchema);