const express = require('express')
const router = express.Router()

const {AddWork,ViewSingleWork,UpdateWork,ViewProjectWork} = require('../Controllers/WorkController')

router.post("/add-work",AddWork)

// router.get("/view-work",ViewWork)
router.get("/view-project-work/:id",ViewProjectWork)

router.post("/view-work/:id",ViewSingleWork)

router.put("/update-work/:id",UpdateWork)

module.exports=router