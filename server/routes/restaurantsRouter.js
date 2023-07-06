import express from "express";
import restaurantsModel from "../models/restaurantsModel.js";
import { getAllRestaurants, getRestaurantsByLocation } from "../controller/restaurantsController.js";

const router = express.Router();

router.get("/all", getAllRestaurants);
router.get("/:location", getRestaurantsByLocation);


export default router; 