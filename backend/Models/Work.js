const mongoose = require('mongoose')
const { Schema } = mongoose

const WorkSchema = new Schema({
    project_id:{
        type: Schema.ObjectId,
        ref: "Project"
    },
    member_id:{
        type: Schema.ObjectId,
        ref: "Member"
    },
    admin_id:{
        type: Schema.ObjectId,
        ref: "Admin"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: false
    },
    // expenses: {
    //     type: Number,
    //     required: true
    // },
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


module.exports = mongoose.model("Work", WorkSchema)