const { Schema, model } = require("mongoose");

const NavInfoSchema = new Schema({
  img: {
    type: String,
  },
  navtitle: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true
  }
});

module.exports = model("navinfo", NavInfoSchema);