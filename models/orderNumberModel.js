const mongoose = require('mongoose')

const orderNumberModelSchema = new mongoose.Schema({
    orderNumber:{
        type: Number,
        require: true
    }

},{timestamps: true})

const orderNumberModel = mongoose.model('orderNumber',orderNumberModelSchema)

module.exports = orderNumberModel;