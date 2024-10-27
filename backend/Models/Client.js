const mongoose = require('mongoose')
const { Schema } = mongoose

const ClientSchema = new Schema({
  
    name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    avtar: {
        type: String,
        required: false
    },

    status: {
        type: String,
        default: "active",

    },
    date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model("client", ClientSchema)