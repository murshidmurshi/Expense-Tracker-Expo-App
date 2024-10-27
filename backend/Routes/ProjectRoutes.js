const express = require('express')
const router = express.Router()

const {AddProject,ViewProject,UpdateProjectMember,Update,ViewProjectMember} = require('../Controllers/ProjectController')

router.post("/add-project",AddProject)

router.get("/view-project",ViewProject)


router.post("/update/:id",Update)

router.get("/view-project/:id",ViewProject)

router.put("/update-project-member/:id",UpdateProjectMember)

// router.get("/view-project-member/:id",ViewProjectMember)





module.exports=router