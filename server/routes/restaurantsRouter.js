import express from "express";
import restaurantsModel from "../models/restaurantsModel.js";

const router = express.Router();

router.get("/all", async (request, response) => {
     console.log("this is a getAll request");
    const allRestaurants = await restaurantsModel.find({});
    console.log("allRestaurants", allRestaurants);
    response.status(200).json({
        allRestaurants,
        number: allCities.length,
        message:"this is the list of cities"
    });

}) 

export default router;