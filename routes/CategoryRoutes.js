import express from "express"
import { addCategory, fetchRestaurantsByCategory, getAllCatgeories } from "../controllers/CategoryController.js";

const router = express.Router();

router.post("/add-category", addCategory)
router.get("/category", getAllCatgeories)
router.get("/menu/:id", fetchRestaurantsByCategory)

export default router
