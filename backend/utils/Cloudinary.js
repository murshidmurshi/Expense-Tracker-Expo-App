const cloudinary=require('cloudinary')
cloudinary.config({
    cloud_name:'dnk7llops',
    api_key:'532567662416953',
    api_secret:'DRb68PQbu6TTDJ6wTYfrtgNpc3c',
    secure: true
})
// console.log(cloudinary.config());

module.exports=cloudinary
