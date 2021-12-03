const { Schema, model } = require('mongoose')

const telSchema = new Schema({
    tel:{
        type:Number,
        required: true
    }
})


module.exports = model('tel', telSchema)