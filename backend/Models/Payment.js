const mongoose = require('mongoose')
const { Schema } = mongoose

const PaymentSchema = new Schema({
    project_id:{
        type: Schema.ObjectId,
        ref: "Project"
    },
    client_id:{
        type: Schema.ObjectId,
        ref: "Client"
    },
   
    amount: {
        type: Number,
        required: true
    },
    
    payment_type: {
        type: String,
        required: true
    },
    payment_date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avtar: {
        type: String,
        required: true
    },
    
    status: {
        type: String,
        default: "active"
    },
    date: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model("payment", PaymentSchema)