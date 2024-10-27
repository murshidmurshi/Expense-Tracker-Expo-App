const express = require('express')
const router = express.Router()

const {Login, Register,ViewAdmin, Update} = require('../Controllers/AdminController')

router.post("/register",Register)

router.post("/login",Login)

router.get("/view-detail",ViewAdmin)

router.post("/update/:id",Update)


module.exports=router