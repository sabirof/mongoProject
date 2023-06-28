import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";
dotenv.config();
const issueToken = (uderId) => {
    console.log("userId")
const options = {
    expiresIn: "1d",
    issuer:"CodeAcademyBerlin",
};
const payload = {
    sub: userId,

};

const secretOrPrivateKey = process.env.JWT_SECRET;


const token = jwt.sign(payload, secretOrPrivateKey, [options, callback]);
return token
};
export { issueToken};