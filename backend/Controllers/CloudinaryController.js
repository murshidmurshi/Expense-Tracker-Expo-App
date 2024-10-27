const cloudinary=require('../utils/Cloudinary')

cloudinary.config({
    cloud_name: 'dnk7llops',
    api_key: '532567662416953',
    api_secret: 'DRb68PQbu6TTDJ6wTYfrtgNpc3c',
})

const Upload = async (req, res) => {
    try {
        console.log(req.body);
        const result = await cloudinary.uploader.upload(req.body.image, {
            upload_preset: 'murshid',
          });
      
          console.log('Image uploaded to Cloudinary:', result);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const UploadImage = async (req,res) => {
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
  let imagePath='file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540mahammadmurshid03%252Fc/ImagePicker/f1e0dafc-8790-42fe-bc61-840a99ab2c70.jpeg'
  let data=req.body;
  console.log(data);

      try {
        // Upload the image
        const result = await cloudinary.uploader.upload(data, options);
        console.log(result);
        return result.public_id;
      } catch (error) {
        console.error(error);
      }
  };

module.exports = { Upload,UploadImage }