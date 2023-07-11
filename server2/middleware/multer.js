import multer from "multer";
import path from "path";


const storage = multer.diskStorage({});
  
  
  function fileFilter (req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  
    // To reject this file pass `false`, like so:
//find out the file extension
const extension = path.extname(file.originalname);
if(extension !== ".jpg" && extension !==".png" && extension !==".jpeg") {
    // if not any of the extensions is allowed, we do not allow the upload
    cb(null, false);
} else{
   cb(null, true) 
}
}
  const multerUpload = multer({ storage, fileFilter });

  export default multerUpload;