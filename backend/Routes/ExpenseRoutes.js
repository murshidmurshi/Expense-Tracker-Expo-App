const express = require('express')
const router = express.Router()

const { AddExpense, ViewExpense,ViewProjectExpense } = require('../Controllers/ExpenseController')
const MemberAuth = require('../Middelware/MemberAuth')

router.post("/add-expense", MemberAuth, AddExpense)

router.get("/view-expense", ViewExpense)

router.get("/view-project-expense/:id", ViewProjectExpense)

router.get("/view-expense/:id", ViewExpense)



module.exports = router