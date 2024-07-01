import express from "express"
import { addcategory, fetchRestaurantsByCategory, getAllCatgeories } from "../controllers/CategoryController.js";

const router = express.Router();

router.post("/add-category", addcategory)
router.get("/category", getAllCatgeories)
router.get("/menu/:id", fetchRestaurantsByCategory)

export default router
