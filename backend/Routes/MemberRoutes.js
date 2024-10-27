const express = require('express')
const router = express.Router()

const { Login, Register, ViewMember,UpdateMember,View_Single_Project } = require('../Controllers/MemberController')
const { ViewProject } = require('../Controllers/ProjectController')
const MemberAuth = require('../Middelware/MemberAuth')

router.post("/register", Register)
router.post("/login", Login)
router.get("/view", ViewMember)

router.get('/view_single_project', MemberAuth, View_Single_Project)



// router.get('/member_view_with_project', Member_View_With_Project)


router.post("/update/:id", UpdateMember)






module.exports = router