const mongoose = require('mongoose')
const { Schema } = mongoose

const ProjectSchema = new Schema({
    member: [{
        id: {
            type: Schema.ObjectId,
            ref: "Member"
        },
        type: {
            type: String,
        }
    }],
    client_id: {
        type: Schema.ObjectId,
        ref: "Client",
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    estimated_end_date: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        // required:true
    },
    type: {
        type: String,
        required: false
    },
    // partners:{
    //     type:String,
    //     required:false
    // },
    // expenses:{
    //     type:Number,
    //     required:false
    // },
    // invested:{
    //     type:Number,
    //     required:false
    // },
    status: {
        type: String,
        default: "Ongoing"
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

module.exports = mongoose.model("Project", ProjectSchema)
