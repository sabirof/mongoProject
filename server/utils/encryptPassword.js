import bcrypt from "bcrypt"

const hashedPassword = async (userPassword) => {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds)
     const hash = bcrypt.hash(userPassword, salt);
    } catch (error) {
        console.log("error hasing password", error);
    }
    

     return hash
} 


export {hashedPassword};