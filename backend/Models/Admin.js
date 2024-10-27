const mongoose = require('mongoose')
const {Schema} = mongoose

const AdminSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avtar:{
        type:String,
        required:false
    },
    public_id:{
        type:String,
        required:false
    },
    status:{
        type:String,
        default:"active"
        // required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    updated_date:{
        type:Date,
        default:Date.now
    },
})

module.exports=mongoose.model("Admin",AdminSchema)
