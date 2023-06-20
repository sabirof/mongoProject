import { v2 as cloudinary } from "cloudinary";

const imageUpload = async (req, res) => {
  console.log("req.file", req.file);

  // Upload file
  if (req.file) {
    try {
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "CAproject",
      });
      console.log('uploadImage', uploadImage);
      res.status(201).json({
        msg:"picture upload success",
        avatar:uploadImage.url
       
      });
    } catch (error) {
      console.log("error uploading file", error); 
    }
  } else {
    res.status(500).json({
      msg: "Sorry file type not supported",
    });
  }
};

export { imageUpload };
