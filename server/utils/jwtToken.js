import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";
dotenv.config();
const issueToken = (userId) => {
    console.log("userId", userId);
const options = {
    expiresIn: "1d",
    issuer:"CodeAcademyBerlin",
};
const payload = {
    sub: userId,

};

// const secretOrPrivateKey = process.env.JWT_SECRET;
const secretOrPrivateKey = "my-little-secret";
console.log("secretOrPrivateKey>>>>>>", secretOrPrivateKey);


const token = jwt.sign(payload, secretOrPrivateKey, options);
console.log("token", token);
return token
};
export { issueToken};