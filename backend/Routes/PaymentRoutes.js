
const express = require('express')
const { AddPayment, View } = require('../Controllers/PaymentController')
const router = express.Router()



router.post("/add",AddPayment)


router.get("/view/:id",View)


module.exports=router