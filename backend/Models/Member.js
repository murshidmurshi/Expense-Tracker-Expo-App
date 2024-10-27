const mongoose = require('mongoose')
const { Schema } = mongoose

const MemberSchema = new Schema({
   

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    
    avtar: {
        type: String,
        required: false
    },
    public_id:{
        type:String,
        required:false
    },

    status: {
        type: String,
        default: "active"
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


module.exports = mongoose.model("Member", MemberSchema)