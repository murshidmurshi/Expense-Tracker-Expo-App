
const express = require('express')
const router = express.Router()

const {AddClient, View}=require('../Controllers/ClientController')

router.post("/add",AddClient)

router.post("/view",View)

router.get("/view/:id",View)


module.exports=router