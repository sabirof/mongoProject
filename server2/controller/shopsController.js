import shopsModel from "../models/shopsModel.js";


const getAllShops = async (req, res) => {

try {

    const allShops = await shopsModel.find({});
    res.status(200).json({
      allShops,
      number:allShops.length  
    })
    } catch (error) {
       console.log("error", error); 
    res.status(501).json({
        msg:"something went wring getting all shops",
    });
}

     
}
export {getAllShops};