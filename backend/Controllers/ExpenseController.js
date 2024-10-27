const express = require('express')
const env = require('dotenv').config()
const ExpenseSchema = require('../Models/Expense')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Member = require('../Models/Member')

const AddExpense = async (req, res) => {
    try {
        const { project_id, work_id, amount, payment_type, payment_date, description } = req.body;
        const creator_id = req?.member?.id;
        let member_id=await Member.findById(creator_id);
        if(member_id){
            const newExpense = new ExpenseSchema({ project_id, work_id, amount, payment_type, payment_date, description, member_id });

            const savedExpense = await newExpense.save()
    
            const success = true;
            res.json({ success, savedExpense })
        }
      else{
        const newExpense = new ExpenseSchema({ project_id, work_id, amount, payment_type, payment_date, description, admin_id:creator_id });
            const savedExpense = await newExpense.save()
            const success = true;
            res.json({ success, savedExpense })
      }

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}
const ViewExpense = async (req, res) => {
    try {
        if (req.params.id) {
            const expense = await ExpenseSchema.findById(req.params.id)
            if (expense) {
                const success = true;
                return res.json({ success, expense })
            }
            else {
                const success = false;
                return res.json({ success, expense, message: "expense not found!!!" })
            }
        }
        else {
            const expense = await ExpenseSchema.find()
            const success = true;
            return res.json({ success, expense })
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}
const ViewProjectExpense = async (req, res) => {
    try {
        let id = req.params.id;
        
        const expense = await ExpenseSchema.find({ work_id: id })
        if (expense) {
            const success = true;
            return res.json({ success, expense })
            console.log(expense,'Expenses');
        }
        else {
            const success = false;
            return res.json({ success, expense, message: "Expense not found!!!" })

        }


    }
    catch (error) {
        console.log(error.message,5000)
        res.status(500).send("Internal Error!!!")
    }
}

module.exports = { AddExpense, ViewExpense, ViewProjectExpense }