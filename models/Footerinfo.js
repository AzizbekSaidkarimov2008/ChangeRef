const { Schema, model } = require("mongoose");

const FooterinfoSchema = new Schema({
    link1: {
        type: String,
    },
    link2: {
        type: String,
    },
    link3: {
        type: String,
    },
});

module.exports = model("footerinfo", FooterinfoSchema);