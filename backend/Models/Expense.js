const mongoose = require('mongoose')
const { Schema } = mongoose

const ExpenseSchema = new Schema({
    work_id: {
        type: Schema.ObjectId,
        ref: "Work"
    },
    member_id: {
        type: Schema.ObjectId,
        ref: "Member"
    },
    admin_id: {
        type: Schema.ObjectId,
        ref: "Admin"
    },
    project_id: {
        type: Schema.ObjectId,
        ref: "Project"
    },
    amount: {
        type: Number,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    },
    avtar: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    payment_date: {
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
    updated_date: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model("Expense", ExpenseSchema)