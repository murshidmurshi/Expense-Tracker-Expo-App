const express = require('express')
const env = require('dotenv').config()
const WorkSchema = require('../Models/Work')
const ExpenseSchema = require('../Models/Expense')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Member = require('../Models/Member')
const Project = require('../Models/Project')
const mongoose = require('mongoose');
const Admin = require('../Models/Admin')

const AddWork = async (req, res) => {
    try {
        const { project_id, member_id, name, description, budget, admin_id } = req.body;
        console.log(req.body,);
        const newWork = new WorkSchema({ project_id, member_id, name, description, budget, admin_id });

        const savedWork = await newWork.save()

        const success = true;
        console.log(savedWork, 'Success');

        res.json({ success, savedWork })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const ViewSingleWork = async (req, res) => {
    try {
        if (req.params.id) {
            const work = await WorkSchema.findById(req.params.id)
            // console.log(work,'Workssssss');
            let WorkAdmin;
            let Add_id;
            if (work.member_id) {
                Add_id = work.member_id;
                WorkAdmin = await Member.findById(Add_id);
            } else {
                Add_id = work.admin_id;
                WorkAdmin = await Admin.findById(Add_id);
            }

            // Global variable to store the result
            let globalResult = [];

            // Asynchronous function to perform MongoDB aggregation
            await WorkSchema.aggregate([
                {
                    // Stage 1: Match documents based on the provided member_id
                    $match: {
                        member_id: new mongoose.Types.ObjectId(WorkAdmin.id)
                    }
                },
                {
                    // Stage 2: Perform a left outer join with the 'projects' collection
                    $lookup: {
                        from: 'projects',          // Target collection to perform the lookup on
                        localField: 'project_id',  // Field from the input documents
                        foreignField: '_id',       // Field from the 'projects' collection
                        as: 'project'              // Alias for the new field in the input documents
                    }
                },
                {
                    // Stage 3: Deconstruct the 'project' array created by the $lookup stage
                    $unwind: '$project'
                },
                {
                    // Stage 4: Deconstruct the 'project.member' array
                    $unwind: '$project.member'
                },
                {
                    // Stage 5: Filter documents based on the 'project.member.id'
                    $match: {
                        'project.member.id': new mongoose.Types.ObjectId(WorkAdmin.id)
                    }
                },
                {
                    // Stage 6: Group documents by 'project.member.type'
                    $group: {
                        _id: '$project.member.type'
                    }
                },
                {
                    // Stage 7: Reshape the output documents, excluding the _id field
                    $project: {
                        _id: 0,         // Exclude _id field from the final result
                        type: '$_id'   // Rename _id to 'type'
                    }
                }
            ])
                // .exec()
                .then((result) => {
                    // Map the result to extract the 'type' field and store it in the global variable
                    globalResult = result.map((item) => item.type);
                    console.log('Global Variable - Distinct Member Types:', globalResult);
                })
                .catch((err) => {
                    console.error(err);
                    // Handle error
                });

            // Perform an aggregation on the ExpenseSchema collection
            const WorkMember = await ExpenseSchema.aggregate([
                {
                    // Stage 1: Match expenses based on the provided work_id
                    $match: {
                        work_id: new mongoose.Types.ObjectId(req.params.id)
                    },
                },
                {
                    // Stage 2: Group expenses by member_id and calculate totalExpense and collect unique project_ids
                    $group: {
                        _id: '$member_id',
                        totalExpense: { $sum: '$amount' },
                        projects: {
                            $addToSet: '$project_id',
                        },
                    }
                },
                {
                    // Stage 3: Perform a left outer join with the 'members' collection
                    $lookup: {
                        from: 'members',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'memberDetails'
                    }
                },
                {
                    // Stage 4: Unwind the memberDetails array created by the $lookup stage
                    $unwind: '$memberDetails',
                },
                {
                    // Stage 5: Perform another left outer join with the 'expenses' collection using a pipeline
                    $lookup: {
                        // Specify the target collection to perform the lookup on
                        from: 'expenses',

                        // Define variables to be used in the pipeline
                        let: { memberId: '$_id', workId: new mongoose.Types.ObjectId(req.params.id) },

                        // Define the pipeline for the subquery
                        pipeline: [
                            {
                                // Stage 5.1: Match expenses where member_id and work_id match the provided values
                                $match: {
                                    $expr: {
                                        $and: [
                                            // Match member_id in the expense document with the one from the parent document
                                            { $eq: ['$member_id', '$$memberId'] },

                                            // Match work_id in the expense document with the one from the parent document
                                            { $eq: ['$work_id', '$$workId'] }
                                        ]
                                    }
                                }
                            }
                        ],

                        // Specify the alias for the new field in the input documents
                        as: 'expenses',
                    },
                },

                {
                    // Stage 6: Unwind the expenses array created by the $lookup stage
                    $unwind: '$expenses',
                },
                {
                    // Stage 7: Group the data again, this time grouping expenses together for each member
                    $group: {
                        _id: '$_id',
                        totalExpense: { $first: '$totalExpense' },
                        memberDetails: { $first: '$memberDetails' },
                        expenses: { $push: '$expenses' },
                    },
                },
            ]);

            const WorkMemberPratise = await ExpenseSchema.aggregate([
                {
                    // Stage 1: Match expenses based on the provided work_id
                    $match: {
                        work_id: new mongoose.Types.ObjectId(req.params.id)
                    },
                },
                {
                    // Stage 2: Group expenses by member_id and calculate totalExpense and collect unique project_ids
                    $group: {
                        _id: '$member_id',
                        totalExpense: { $sum: '$amount' },
                        projects: {
                            $addToSet: '$project_id',
                        },
                    }
                },
                {
                    // Stage 3: Perform a left outer join with the 'members' collection
                    $lookup: {
                        from: 'members',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'memberDetails'
                    }
                },
                {
                    // Stage 4: Unwind the memberDetails array created by the $lookup stage
                    $unwind: '$memberDetails',
                },
                {
                    // Stage 5: Perform another left outer join with the 'expenses' collection using a pipeline
                    $lookup: {
                        // Specify the target collection to perform the lookup on
                        from: 'expenses',

                        // Define variables to be used in the pipeline
                        let: { memberId: '$_id', workId: new mongoose.Types.ObjectId(req.params.id) },

                        // Define the pipeline for the subquery
                        pipeline: [
                            {
                                // Stage 5.1: Match expenses where member_id and work_id match the provided values
                                $match: {
                                    $expr: {
                                        $and: [
                                            // Match member_id in the expense document with the one from the parent document
                                            { $eq: ['$member_id', '$$memberId'] },

                                            // Match work_id in the expense document with the one from the parent document
                                            { $eq: ['$work_id', '$$workId'] }
                                        ]
                                    }
                                }
                            }
                        ],

                        // Specify the alias for the new field in the input documents
                        as: 'expenses',
                    },
                },

                {
                    // Stage 6: Unwind the expenses array created by the $lookup stage
                    $unwind: '$expenses',
                },
               
                {
                    $lookup: {
                        from: 'projects',
                        localField: 'projects',
                        foreignField: '_id',
                        as: 'projectDetails',
                    },
                },
                {
                    $unwind: '$projectDetails',
                },
                {
                    $unwind: '$projectDetails.member',
                },
                {
                    $group: {
                        _id: '$_id',
                        totalExpense: { $first: '$totalExpense' },
                        memberDetails: { $first: '$memberDetails' },
                        expenses: { $push: '$expenses' },
                        projectDetails: { $first: '$projectDetails' }, // Include projectDetails for the next group stage
                    },
                },
                {
                    $project: {
                        totalExpense: 1,
                        memberDetails: 1,
                        expenses: 1,
                        projectDetails: 1, // Include projectDetails for the next group stage
                    },
                },

                // Group by member_id and calculate roles
              
                // {
                //     $group: {
                //         _id: '$_id',
                //         totalExpense: { $first: '$totalExpense' },
                //         memberDetails: { $first: '$memberDetails' },
                //         expenses: { $first: '$expenses' },
                //         roles: { $addToSet: '$projectDetails.member.type' },
                //     },
                // },
                {
                    $group: {
                        _id: '$projectDetails.member.id',
                        roles: { $addToSet: '$projectDetails.member.type' },
                    },
                },
                // Group by projectDetails.member.id and calculate roles
                
            ]);
            
            console.log(WorkMemberPratise,'WorkMemberPratiseWorkMemberPratise');


            const WorkMemberRole = await ExpenseSchema.aggregate([
                {
                    $match: {
                        work_id: new mongoose.Types.ObjectId(req.params.id),
                    },
                },
                {
                    $group: {
                        _id: '$member_id',
                        totalExpense: { $sum: '$amount' },
                        projects: { $addToSet: '$project_id' },
                    },
                },
                {
                    $lookup: {
                        from: 'members',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'memberDetails',
                    },
                },
                {
                    $unwind: '$memberDetails',
                },
                {
                    $group: {
                        _id: '$_id',
                        totalExpense: { $first: '$totalExpense' },
                        memberDetails: { $first: '$memberDetails' },
                        projects: { $first: '$projects' },
                    },
                },
                {
                    $lookup: {
                        from: 'projects',
                        localField: 'projects',
                        foreignField: '_id',
                        as: 'projectDetails',
                    },
                },
                {
                    $unwind: '$projectDetails',
                },
                {
                    $unwind: '$projectDetails.member',
                },
                {
                    $group: {
                        _id: '$projectDetails.member.id',
                        member: { $first: '$memberDetails' },
                        roles: { $addToSet: '$projectDetails.member.type' },
                    },
                },
                {
                    $group: {
                        _id: null,
                        members: { $push: { roles: '$roles' } },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        members: 1,
                    },
                },
            ]);


            // let MemberRoles=WorkMemberRole[0].members
            let MemberRoles = (WorkMemberRole.length > 0) ? WorkMemberRole[0].members : [];

            const WorkTotalExpense = await ExpenseSchema.aggregate([
                {
                    $match: {
                        work_id: new mongoose.Types.ObjectId(req.params.id)
                    },
                },
                {
                    $group: {
                        _id: null, // Group all documents into one group
                        totalWorkExpense: { $sum: '$amount' }, // Calculate the sum of 'amount' for each work_id
                    },
                },
                {
                    $project: {
                        _id: 0, // Exclude the _id field from the final result
                        totalWorkExpense: 1, // Include the totalWorkExpense field
                    },
                },
            ]);

            let totalWorkExpense = WorkTotalExpense.length > 0 ? WorkTotalExpense[0].totalWorkExpense : 0
            // console.log(WorkMember[0].totalExpense, 'WorkMemberWorkMemberWorkMember');


            const AdminWorkExpense = await ExpenseSchema.aggregate([
                {
                    $match: {
                        work_id: new mongoose.Types.ObjectId(req.params.id),
                    },
                },
                {
                    $group: {
                        _id: '$admin_id',
                        totalExpense: { $sum: '$amount' },
                        projects: {
                            $addToSet: '$project_id',
                        },
                    },
                },
                {
                    // Stage 3: Perform a left outer join with the 'members' collection
                    $lookup: {
                        from: 'admins',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'adminDetails'
                    }
                },
                {
                    // Stage 4: Unwind the memberDetails array created by the $lookup stage
                    $unwind: '$adminDetails',
                },
                {
                    // Stage 5: Perform another left outer join with the 'expenses' collection using a pipeline
                    $lookup: {
                        // Specify the target collection to perform the lookup on
                        from: 'expenses',

                        // Define variables to be used in the pipeline
                        let: { adminId: '$_id', workId: new mongoose.Types.ObjectId(req.params.id) },

                        // Define the pipeline for the subquery
                        pipeline: [
                            {
                                // Stage 5.1: Match expenses where member_id and work_id match the provided values
                                $match: {
                                    $expr: {
                                        $and: [
                                            // Match member_id in the expense document with the one from the parent document
                                            { $eq: ['$admin_id', '$$adminId'] },

                                            // Match work_id in the expense document with the one from the parent document
                                            { $eq: ['$work_id', '$$workId'] }
                                        ]
                                    }
                                }
                            }
                        ],

                        // Specify the alias for the new field in the input documents
                        as: 'expenses',
                    },
                },

                {
                    // Stage 6: Unwind the expenses array created by the $lookup stage
                    $unwind: '$expenses',
                },
                {
                    // Stage 7: Group the data again, this time grouping expenses together for each member
                    $group: {
                        _id: '$_id',
                        totalExpense: { $first: '$totalExpense' },
                        adminDetails: { $first: '$adminDetails' },
                        expenses: { $push: '$expenses' },
                    },
                },

            ]);

            

            if (work) {
                const success = true;
                return res.json({ success, work, role: globalResult, WorkAdmin, MemberRoles, totalWorkExpense, workmember: WorkMember, adminExpense: AdminWorkExpense,WorkMemberPratise })
            }
            else {
                const success = false;
                return res.json({ success, work, message: "work not found!!!" })
            }
        }

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const ViewProjectWork = async (req, res) => {
    try {
        let project_id = req.params.id;
        const work = await WorkSchema.find({ project_id })
        // Perform an aggregation on the ExpenseSchema collection
        const result = await ExpenseSchema.aggregate([
            // Stage 1: Group by 'work_id' and calculate total amount for each group
            {
                $group: {
                    _id: '$work_id',  // Grouping by 'work_id'
                    totalAmount: { $sum: '$amount' },  // Calculate total amount for each group
                    members: {
                        $push: {
                            member_id: '$member_id',  // Push 'member_id' into the 'members' array
                            avtar: '$memberDetails.avtar',  // Push 'avtar' into the 'members' array
                        },
                    },

                },
            },
            // Stage 2: Lookup additional details for each member using 'member_id'
            {
                $lookup: {
                    from: 'members',  // Look up details from the 'members' collection
                    localField: 'members.member_id',  // Use 'member_id' from the 'members' array
                    foreignField: '_id',  // Match with '_id' in the 'members' collection
                    as: 'membersDetails',  // Store the result in 'membersDetails'
                },
            },
            // Stage 3: Unwind the 'membersDetails' array to separate each member's details
            {
                $unwind: '$membersDetails',  // Unwind the 'membersDetails' array
            },

            // Stage 4: Project the final result, shaping the output
            {
                $project: {
                    _id: 0,  // Exclude _id field from the final result
                    work_id: '$_id',  // Rename _id to 'work_id'
                    totalAmount: 1,  // Include 'totalAmount' field
                    members: {
                        member_id: 1,  // Include 'member_id' field
                        avtar: '$membersDetails.avtar',  // Include 'avtar' field from 'membersDetails'
                    },
                },
            },
        ]);
        // console.log(result, 'resultresultresultresult..........');
        const adminAvtar = await ExpenseSchema.aggregate([
            {
                $group: {
                    _id: '$work_id',  // Grouping by 'work_id'
                    totalAmount: { $sum: '$amount' },  // Calculate total amount for each group
                    admins: {
                        $push: {
                            admin_id: '$admin_id',
                        }
                    },
                }
            },
            {
                $lookup: {
                    from: 'admins',
                    localField: 'admins.admin_id',
                    foreignField: '_id',
                    as: 'adminDetails'
                }
            },
            {
                $unwind: '$adminDetails'
            },

            {
                $project: {
                    _id: 0,
                    work_id: '$_id',  // Rename _id to 'work_id'
                    totalAmount: 1,  // Include 'totalAmount' field
                    admins: {
                        admin_id: 1,
                        avtar: '$adminDetails.avtar'
                    },
                }
            }

        ]);

        // console.log(adminAvtar, 'adminAvtaradminAvtaradminAvtar..........');
        // console.log(result[0], 'result..........');

        if (work) {
            return res.json({ success: true, work, expense: result, adminavtar: adminAvtar })
        }
        else {
            const success = false;
            return res.json({ success, work, Workmember, message: "work not found!!!" })
        }

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const UpdateWork = async (req, res) => {
    try {

        const { name, description, budget } = req.body;

        const id = req.params.id;

        console.log(id, 5555);
        const work = await WorkSchema.findById(id)
        if (!work) {
            return res.json({ success: false, message: "work not found!!!" })
        }
        const updated_work = {}
        if (name) { updated_work.name = name }
        if (description) { updated_work.description = description }
        if (budget) { updated_work.budget = budget }

        const UpdateAll = await WorkSchema.findByIdAndUpdate(id, { $set: updated_work }, { new: true })
        res.json({ success: true, UpdateAll })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

module.exports = { AddWork, ViewSingleWork, UpdateWork, ViewProjectWork }