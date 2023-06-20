import express from "express";
import { imageUpload } from "../controller/usersController.js";
import multerUpload from "../middleware/multer.js";
const router = express.Router();

router.post("/imageUpload",multerUpload.single("image"), imageUpload)

export default router;