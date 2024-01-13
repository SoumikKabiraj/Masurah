const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({
    
    userId: {
        type: String,
        required: [true, "name is require"],
    },
    orderNumber: {
        type: Number,
        require: true
    }
    ,
    items: {
        type:Array,
        default: [],
    },
    profit: {
        type: Number,
        require: true
    },
    discount: {
        type: Number,
        require: true
    }

},{timestamps: true})

const salesModel = mongoose.model('sales',salesSchema)

module.exports = salesModel;