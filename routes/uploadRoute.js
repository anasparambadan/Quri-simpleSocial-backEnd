import express from 'express'
const router = express.Router()
import { v2 as cloudinary } from 'cloudinary'
// import multer from 'multer'





// const storage = multer.diskStorage({
  
//     destination: function (req, file, cb) {
//       cb(null, "public/images")
//     },
//     filename: function (req, file, cb) {
//       cb(null, req.body.name)
//     }
//   })
  
//   const upload = multer({ storage: storage })

//   router.post('/',upload.single("file", (req,res)=>{
//     console.log(first)
//     try {
//         return res.status(200).json("File uploaded successfully")
//     } catch (error) {
//         console.log(error)
//     }
//   }))

  ////////////////////////



// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SCECRET
  });

  const opts = {
    overwrite:true,
    invalidate:true,
    resource_type:'auto'
  }

  // Upload

  const uploadImage = (image) => {
    //imgage = > base64
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(image, opts, (error, result) => {
        if (result && result.secure_url) {
          return resolve(result.secure_url);
        }
        console.log(error.message);
        return reject({ message: error.message });
      });
    });
  };

  
  
  router.post ('/',(req,res)=>{
     uploadImage(req.body.image)
     .then((url)=>{
      res.send(url)
    }).
     catch((error)=>res.status(500).send(error))
   })

   
   export default router