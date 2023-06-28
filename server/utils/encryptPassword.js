import bcrypt from "bcrypt";

const hashedPassword = async (userPassword) => {
  const saltRounds = 10;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(userPassword, salt);
    return hash;
  } catch (error) {
    console.log("Error hashing password:", error);
    throw error; // Rethrow the error to the caller
  }
};

const verifyPassword = async (loginPassword, storedPassword) => {
  const verifiedToken =  await bcrypt.compareSync(loginPassword, storedPassword);
  return verifiedToken; //output : true if both passwords match, if not False
};

export { verifyPassword, hashedPassword };
