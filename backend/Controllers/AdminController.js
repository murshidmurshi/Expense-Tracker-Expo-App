const express = require('express')
const env = require('dotenv').config()
const AdminSchema = require('../Models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../Models/Admin')
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: 'dnk7llops',
    api_key: '532567662416953',
    api_secret: 'DRb68PQbu6TTDJ6wTYfrtgNpc3c',
})


const Register = async (req, res) => {
    try {
        const { name, phone, address, email, password } = req.body;
        let admin_details = await AdminSchema.findOne({ email })
        if (admin_details) {
            const success = false;
            return res.json({ success, error: "Email already exist" })
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);

            const newAdmin = new AdminSchema({ name, email, password: secPass, address, phone });

            const savedAdmin = await newAdmin.save()

            const success = true;
            return res.json({ success, savedAdmin })
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        let admin_details = await AdminSchema.findOne({ email });
        if (!admin_details) {
            const success = false;
            return res.json({ success, error: "Invalid Email or Password" })
        }
        const passwordCompare = await bcrypt.compare(password, admin_details.password)
        if (!passwordCompare) {
            const success = false;
            return res.json({ success, error: "Invalid Email or Password" })
        }
        const data = { id: admin_details.id }
        console.log(data)

        const authtoken = jwt.sign(data, process.env.JWT_Secret);

        const success = true;
        res.json({ success, authtoken })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Error!!!");
    }

}

const ViewAdmin = async (req, res) => {
    try {
        const admin_details = await Admin.find()
        if (admin_details) {
            return res.json({ success: true, admin_details })
        }
        else {
            return res.json({ success: false, message: 'Admin not found !!' })
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Error !!!')
    }
}

const Update = async (req, res) => {
    try {
        let { newImage, newPublicId } = req.body;
        let admin_details = await Admin.findById(req.params.id)
        let update = {}
        if (newImage) {
            update.avtar = newImage
        }
        if (newPublicId) {
            update.public_id = newPublicId
        }
        if (admin_details.public_id) {
            if (admin_details.public_id !== newPublicId) {
                let Delete = await cloudinary.uploader.destroy(admin_details.public_id)
                console.log(Delete, 'Deletee');
            }
        }

        const UpdateAll = await Admin.findByIdAndUpdate(req.params.id, { $set: update }, { new: true })
        res.json({ success: true, UpdateAll })
        console.log(UpdateAll);

    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { Login, Register, ViewAdmin, Update }