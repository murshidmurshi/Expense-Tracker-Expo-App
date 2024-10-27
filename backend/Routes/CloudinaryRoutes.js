
const express = require('express')
const router = express.Router()

const {Upload,UploadImage}=require('../Controllers/CloudinaryController')

router.post("/upload",Upload);
router.post("/uploadimage",UploadImage);

// router.post("/delete",Delete)


module.exports=router