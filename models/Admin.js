const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,

    },
})



module.exports = model('admin', adminSchema)