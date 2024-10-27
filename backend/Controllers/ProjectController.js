const express = require('express')
const env = require('dotenv').config()
const ProjectSchema = require('../Models/Project')
const Member = require('../Models/Member')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Expense = require('../Models/Expense')
const { default: mongoose } = require('mongoose')
const Project = require('../Models/Project')

const AddProject = async (req, res) => {
    try {
        const { name, description, address, budget, start_date, estimated_end_date, type, partners, expenses, invested, client_id } = req.body;
        const newProject = new ProjectSchema({ name, description, address, budget, start_date, estimated_end_date, type, partners, expenses, invested, client_id });
        const savedProject = await newProject.save()
        const success = true;
        res.json({ success, savedProject })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const ViewProject = async (req, res) => {
    try {
        if (req.params.id) {
            const project = await ProjectSchema.findById(req.params.id)
            if (project) {
                // console.log(project, 'Project',);
                // let memberProjectPromise = project?.member.map(async (member, index) => {
                //     // console.log(member);
                //     let value = await Member.findById(member.id)
                //     return value
                // })

                // let memberRolePromise = project?.member.map(async (member, index) => {
                //     return member
                // })


                // let ProjectAllMember = await Promise.all(memberProjectPromise)
                // let AllMemberRole = await Promise.all(memberRolePromise)

                // let MemberDetail = await ProjectSchema.aggregate([
                //     {
                //         $match: {
                //             _id: new mongoose.Types.ObjectId(req.params.id)
                //         }
                //     },
                //     {
                //         $lookup: {
                //             from: 'members',
                //             localField: 'member.id',
                //             foreignField: '_id',
                //             as: 'memberDetail'
                //         }
                //     },
                //     {
                //         $unwind: '$memberDetail'
                //     },

                //     {
                //         $group: {
                //             _id: '$memberDetail._id',
                //             member: { $first: '$memberDetail' },
                //             roles: { $addToSet: '$member.type' }
                //         }
                //     },



                // ])

                let MemberDetail = await ProjectSchema.aggregate([
                    {
                        $match: {
                            _id: new mongoose.Types.ObjectId(req.params.id)
                        }
                    },
                    {
                        $unwind: "$member"
                    },
                    {
                        $lookup: {
                            from: "members", // Replace with the actual name of your members collection
                            localField: "member.id",
                            foreignField: "_id",
                            as: "memberInfo"
                        }
                    },
                    {
                        $unwind: "$memberInfo"
                    },
                    {
                        $group: {
                            _id: "$member.id",
                            member: { $first: "$memberInfo" },
                            roles: { $push: "$member.type" }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            members: { $push: { member: "$member", roles: "$roles" } }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            members: 1
                        }
                    }
                ])

                const totalExpense = await Expense.aggregate([
                    {
                        $match: {
                            project_id: new mongoose.Types.ObjectId(req.params.id), // Replace with the actual project_id you're interested in
                        },
                    },
                    {
                        $group: {
                            _id: '$project_id', // Group all documents
                            totalExpense: { $sum: '$amount' }, // Sum the totalAmount field
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            totalExpense: 1,
                        },
                    },
                ]);

                // console.log(totalExpense,'totalExpensetotalExpensetotalExpense');

                // console.log(MemberDetail[0].members, 'MemberDetailMemberDetailMemberDetail');
                let ProjectAllMembers = (MemberDetail.length > 0) ? MemberDetail[0].members : [];


                return res.json({ success: true, project, memberdetail: ProjectAllMembers, totalExpense })
            }
            else {
                const success = false;
                return res.json({ success, project, message: "project not found!!!" })
            }
        }
        else {
            // const project = await ProjectSchema.find()
            const member = await Member.find();
            // const project = await ProjectSchema.aggregate([
            //     {
            //         $group: {
            //             _id: null,
            //             ongoingProjects: {
            //                 $push: {
            //                     $cond: {
            //                         if: { $eq: ['$status', 'Ongoing'] },
            //                         then: '$$ROOT',
            //                         else: null,
            //                     },
            //                 },
            //             },
            //             completedProjects: {
            //                 $push: {
            //                     $cond: {
            //                         if: { $eq: ['$status', 'Completed'] },
            //                         then: '$$ROOT',
            //                         else: null,
            //                     },
            //                 },
            //             },
            //         },
            //     },
            // ]);

            // let projectPromises = project.map(async (item) => {
            //     // console.log(project);

            //     let memberProjectPromise = item?.member?.map(async (member, index) => {
            //         let value = await Member.findById(member.id)
            //         return value
            //     })

            //     let ProjectAllMember = await Promise.all(memberProjectPromise)
            //     return ProjectAllMember
            // })
            // let MemberAvtar = await Promise.all(projectPromises)
            // const ProjectAllMembers = await ProjectSchema.aggregate([
            //     {
            //         $lookup: {
            //             from: 'members',
            //             localField: 'member.id',
            //             foreignField: '_id',
            //             as: 'projectMembers',
            //         },
            //     },
            //     {
            //         $lookup: {
            //             from: 'clients',
            //             localField: 'client_id',
            //             foreignField: '_id',
            //             as: 'clientDetails',
            //         },
            //     },
            //     {
            //         $lookup: {
            //             from: 'expenses',
            //             localField: '_id', // Use the project ID as the local fielsd
            //             foreignField: 'project_id',
            //             as: 'projectExpenses',
            //         },
            //     },
            //     {
            //         $project: {
            //             _id: 1, // Include project ID
            //             name: 1, // Include project name
            //             clientDetails: 1,
            //             member_avtar: '$projectMembers.avtar', // Include all project members
            //             totalExpense: { $sum: '$projectExpenses.amount' }, // Calculate total expenses
            //         },
            //     },
            // ]);
            // let Projectmember = ProjectAllMembers;
            


            const project = await ProjectSchema.aggregate([
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
                    $lookup: {
                        from: 'expenses',
                        localField: '_id',
                        foreignField: 'project_id',
                        as: 'projectExpenses',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        status: 1,
                        clientDetails: 1,
                        member_avtar: '$projectMembers.avtar',
                        totalExpense: { $sum: '$projectExpenses.amount' },
                        budget: '$budget',
                        end_date: '$estimated_end_date',
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
                                    // totalExpense: { $sum: '$totalExpense' },
                                },
                            },
                        ],
                        completedProjects: [
                            { $match: { status: 'Completed' } },
                            {
                                $group: {
                                    _id: null,
                                    projects: { $push: '$$ROOT' },
                                    // totalExpense: { $sum: '$totalExpense' },
                                },
                            },
                        ],
                    },
                },
            ]);
            // console.log(project[0].ongoingProjects[0],'ProjectAllMembers222ProjectAllMembers222');
            
            return res.json({ success: true, project, })
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}


const ViewProjectMember = async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id, '555555');
        const project = await Member.find({ project: id })
        console.log(project, '63333333333333333');
        if (project) {
            const success = true;
            return res.json({ success, project })
        }
        else {
            const success = false;
            return res.json({ success, project, message: "project not found!!!" })
        }


    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const UpdateProjectMember = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id, 88888888888888888);
        const member = req.body;

        console.log(req.body);
        let Project = await ProjectSchema.findById(id)
        let InitialMember = Project.member;
        let AllMember = [...InitialMember, ...member]

        console.log(InitialMember, 'InitialMember');
        console.log(Member);

        if (!Project) {
            return res.json({ success: false, message: 'Project not found !!' })
        }
        else {
            const updateValue = await ProjectSchema.findByIdAndUpdate(id, { $set: { member: AllMember } }, { new: true })
            console.log(updateValue);
            res.json({ success: true, updateValue })
        }


    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const Update = async (req, res) => {

    try {
        let id = req.params.id;
        let { status } = req.body;
        const project = await Project.findById(id);
        if (!project) {
            res.json({ success: false, message: 'Project not found !' })
        }
        else {
            let updateProject = await Project.findByIdAndUpdate(id, { $set: { status } }, { new: true })
            res.json({ success: true, updateProject })
            console.log('Updated');
        }
    }

    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}


module.exports = { AddProject, ViewProject, ViewProjectMember, UpdateProjectMember, Update }