const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: Number,
    name: String,
    description: {
        type: String
    },
    price: {
        type: Number
    },
    onSale: {
        type: Boolean
    },
    categories: {
        type: String
    },
    type: {
        type: String
    },
    tags: {
        type: [String],
        default: [],
    },
    stock: {
        type: Number
    },
    file: {
        type: String,
        default: 'noimage.jpg'
    },
    file2: {
        type: String,
        default: 'noimage2.jpg'
    },

}, { timestamps: true })

module.exports = mongoose.model('products', productSchema)