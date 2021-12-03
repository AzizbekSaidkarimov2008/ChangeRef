const { Schema, model } = require('mongoose')

const productSchema = new Schema({

    productName: {
        type: String,
        required: true
    },
    productText: {
        type: String,
        required: true
    },
    productSyntax: {
        type: String,
        required: true
    },
    productImg: {
        type: String,
    },
    categoryId: {
        ref: 'category',
        type: Schema.Types.ObjectId
    }
})


module.exports = model('product', productSchema)