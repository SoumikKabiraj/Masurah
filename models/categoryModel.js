const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    img:{
        data: Buffer,
        contentType: String
    }
},{timestamps: true})

const inventoryModel = mongoose.model('category',categorySchema)

module.exports = inventoryModel;