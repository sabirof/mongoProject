import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";
import { hashedPassword, verifyPassword } from "../utils/encryptPassword.js";
import { triggerAsyncId } from "async_hooks";
import { issueToken } from "../utils/jwtToken.js";
// import { issueToken } from "../utils/jwtToken.js";

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
  //   console.log("req", req);
  //Check if the user is in our database

  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    console.log("existingUser", existingUser);
    if (!existingUser) {
      //if the user does not exist in our database, we store it
      try {
        console.log("second");
        const encryptedPassword = await hashedPassword(req.body.password);
        console.log("first", encryptedPassword);
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

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    console.log("existingUser", existingUser);
    if (!existingUser) {
      res.status(404).json({
        error: "Sorry, no user registered with this email",
      });
    } else {
      //If user exists -> verfiy password
      try {
        const checkedPassword = await verifyPassword(
          password,
          existingUser.password
        );

        if (!checkedPassword) {
          //password is incorrect
          res.status(401).json({
            error: "Wrong password...try again",
          });
        } else {
          // If credentials match, we generate the JWT token
          console.log("all gooooood!!.....");

          const token = issueToken(existingUser._id);
          console.log("token", token);
          if (token) {
            res.status(200).json({
              msg: "Login successful",
              user: {
                userName: existingUser.userName,
                email: existingUser.email,
                avatar: existingUser.avatar,
              },
              token,
            });
          } else {
            console.log("problem generating token");
            res.status(500).json({
              msg: "something went wrong during login",
            });
          }
        }
      } catch (error) {}
    }
  } catch (error) {}
};

const getProfile = async (req, res) => {
console.log("req.user", req.user);


if(req.user) {
res.status(200).json({
  user:req.user
})
} else {
  res.status(404).json({
    error:"no user in the database"
  });
}

};

export { imageUpload, register, login, getProfile };
