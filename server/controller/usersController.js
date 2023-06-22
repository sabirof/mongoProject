import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";
import { hashedPassword } from "../utils/encryptPassword.js";

const imageUpload = async (req, res) => {
  console.log("req.file", req.file);

  // Upload file
  if (req.file) {
    try {
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "CAproject",
      });
      console.log("uploadImage", uploadImage);
      res.status(201).json({
        msg: "picture upload success",
        avatar: uploadImage.url,
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
const register = async (req, res) => {
  console.log("req", req);
  //Check if the user is in our database

  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    console.log("existingUser", existingUser);
    if (!existingUser) {
      //if the user does not exist in our database, we store it
      try {
        const encryptedPassword = await hashedPassword(req.body.password);
        if (encryptedPassword) {
          const newUser = new userModel({
            userName: req.body.userName,
            email: req.body.email,
            password: encryptedPassword,
            avatar: req.body.avatar,
          });
          const savedUser = await newUser.save();

          console.log("savedUser", savedUser);
          res.status(201).json({
            user: {
              userName: savedUser.userName,
              email: savedUser.email,
              avatar: savedUser.avatar,
            },
          });
        }
      } catch (error) {}
    } else {
      res.status(200).json({
        msg: "sorry that email is already registered",
      });
    }
  } catch (error) {
    console.log("error saving user", error);
    res.status(500).json({
      msg: "error saving user",
    });
  }
};
export { imageUpload, register };
