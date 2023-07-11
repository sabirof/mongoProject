import express from "express";
import { getAllShops } from "../controller/shopsController.js";
const router = express.Router();


router.get("/all",getAllShops);

export default router;