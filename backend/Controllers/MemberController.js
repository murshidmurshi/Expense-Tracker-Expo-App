const express = require('express')
const env = require('dotenv').config()
const MemberSchema = require('../Models/Member')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Project = require('../Models/Project')
const { default: mongoose } = require('mongoose')
const Member = require('../Models/Member')
const cloudinary = require('cloudinary')


const Register = async (req, res) => {
    try {
        const { name, phone, email, password, avtar } = req.body;
        let member_details = await MemberSchema.findOne({ email })
        if (member_details) {
            const success = false;
            return res.json({ success, error: "Email already exist" })
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);

            const newMember = new MemberSchema({ password: secPass, name, phone, email, avtar });

            const savedMember = await newMember.save()

            const success = true;
            return res.json({ success, savedMember })
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
        let member_details = await MemberSchema.findOne({ email });
        if (!member_details) {
            const success = false;
            return res.json({ success, error: "Invalid Email or Password" })
        }
        const passwordCompare = await bcrypt.compare(password, member_details.password)
        if (!passwordCompare) {
            const success = false;
            return res.json({ success, error: "Invalid Email or Password" })
        }
        const data = { id: member_details.id }
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

const ViewMember = async (req, res) => {
    try {
        const member = await MemberSchema.find()

        const success = true;
        res.json({ success, member })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const View_Single_Project = async (req, res) => {
    try {
        const { id } = req.member;
        console.log(id);
        console.log(id, 'Id From Token');
        const member_details = await MemberSchema.findById(id)
        if (member_details) {
            // console.log(member_details.id);
            // const project = await Project.find();
            // const memberProjects = await Promise.all(project.map(async (item) => {
            //     const hasMatchingMember = item?.member.some(member => member.id == id);
            //     if (hasMatchingMember) {
            //         console.log(`Project: ${item.name}, Member ID: ${id}`);
            //         return item;
            //     }

            //     return null;
            // })).then(filteredProjects => filteredProjects.filter(Boolean));


            // console.log(memberProjects, 'memberProjects');
            // let memberProjectsPractise = await Project.aggregate([
            //     {
            //         $match: {
            //             'member.id': new mongoose.Types.ObjectId(id)
            //         }
            //     },

            // ])
            // console.log(memberProjectsPractise, 'memberProjectsPractisememberProjectsPractise');


            // const member_id = new mongoose.Types.ObjectId(id);

            const projectMembers = await Project.aggregate([
                {
                    $lookup: {
                        from: 'members',
                        localField: 'member.id',
                        foreignField: '_id',
                        as: 'projectMembers',
                    },
                },
                {
                    $lookup: {
                        from: 'clients',
                        localField: 'client_id',
                        foreignField: '_id',
                        as: 'clientDetails',
                    },
                },
                {
                    $unwind: '$member'
                },
                {
                    $match: {
                        'member.id': new mongoose.Types.ObjectId(id)
                    }
                },
               
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        status: 1,
                        description:1,
                        clientDetails:1,
                        member_avtar: '$projectMembers.avtar',
                        end_date: '$estimated_end_date',
                        start_date: '$start_date',
                    },
                },
                {
                    $facet: {
                        ongoingProjects: [
                            { $match: { status: 'Ongoing' } },
                            {
                                $group: {
                                    _id: null,
                                    projects: { $push: '$$ROOT' },
                                },
                            },
                        ],
                        completedProjects: [
                            { $match: { status: 'Completed' } },
                            {
                                $group: {
                                    _id: null,
                                    projects: { $push: '$$ROOT' },
                                },
                            },
                        ],
                    },
                },
            ]);
            let ongoingProjects=projectMembers[0].ongoingProjects.length>0?projectMembers[0].ongoingProjects[0].projects:[]
            // console.log(ongoingProjects,'OnGoing........');
            let completedProjects=projectMembers[0].completedProjects.length>0?projectMembers[0].completedProjects[0].projects:[]
            // console.log(completedProjects,'Completed........');

            return res.json({ success: true, member_details,ongoingProjects,completedProjects, })
        }
        else {
            return res.json({ success: false, message: "member not found" })
        }   

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const UpdateMember = async (req, res) => {
    try {
        let { name, phone, email,description, address,password, newImage, newPublicId } = req.body;
        
        let member_details = await Member.findById(req.params.id)
        let update = {}
        if (newImage) {
            update.avtar = newImage
        }
        if (newPublicId) {
            update.public_id = newPublicId
        }
        if (name) {
            update.name = name
        }
        if (phone) {
            update.phone = phone
        }
        if (description) {
            update.description = description
        }
        if (address) {
            update.address = address
        }
        if (email) {
            update.email = email
        }
        if (password) {
            update.password = password
        }
        if (member_details.public_id) {
            if (member_details.public_id !== newPublicId) {
                let Delete = await cloudinary.uploader.destroy(member_details.public_id)
                console.log(Delete, 'Deletee');
            }
        }
        const UpdateAll = await Member.findByIdAndUpdate(req.params.id, { $set: update }, { new: true })
        res.json({ success: true, UpdateAll })
        console.log(UpdateAll);

    }
    catch (err) {
        console.log(err);
    }
}



module.exports = { Login, Register, ViewMember, UpdateMember, View_Single_Project }