import express from "express"
import { addToCart, getAllCartItems, updateCartQty, deleteAllItems, deleteSpecificItem } from "../controllers/CartController.js";

const router = express.Router();

router.post('/add-to-cart', addToCart)
router.get('/get-cart-items/:id', getAllCartItems)
router.post("/update-cart-qty/:id", updateCartQty)
router.delete("/clear-cart/:id", deleteAllItems)
router.delete("/delete-specific/:userId/:dishId", deleteSpecificItem)

export default router
