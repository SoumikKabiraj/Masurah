const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    item:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    qtyType: {
        type: String,
        require: true
    },
    costPrice: {
        type: Number,
        require: true
    },
    salesPrice: {
        type: Number,
        require: true
    }

},{timestamps: true})

const inventoryModel = mongoose.model('inventory',inventorySchema)

module.exports = inventoryModel;