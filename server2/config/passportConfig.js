import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import usersModel from '../models/usersModel.js';
import * as dotenv from "dotenv"
dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

const jwtStrategy = new JwtStrategy(options, async function (jwt_payload, done) {
  console.log('options', options)
  try {
    const user = await usersModel.findOne({ _id: jwt_payload.sub });

    if (user) {
      console.log("yea, token correct")
      return done(null, user);
    } else {
      console.log("no user in the database")
      return done(null, false);
      // or you could create a new account
    }
  } catch (error) {
    return done(error, false);
  }
});

const passportStrategy = (passport) => {
  
  passport.use(jwtStrategy)
}

export default passportStrategy;
