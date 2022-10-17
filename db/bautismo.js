const mongoose = require("mongoose");

const baptismSchema = new mongoose.Schema({
    b_place1: String,
    b_place2: String,
    b_date: String,
    b_father: String,
    b_padrino: String,
    b_padrino_data: {
        older: Boolean,
        bautizado: Boolean,
        p_comunion: Boolean,
        confirmado: Boolean,
        casado: Boolean,
        casado_iglesia: Boolean
    },
    b_madrina: String,
    b_madrina_data: {
        older: Boolean,
        bautizado: Boolean,
        p_comunion: Boolean,
        confirmado: Boolean,
        casado: Boolean,
        casado_iglesia: Boolean
    },
})

module.exports = mongoose.model("bautismo", baptismSchema);
