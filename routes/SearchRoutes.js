import express from "express"
import { searchRestAndDishes } from "../controllers/SearchController.js"

const router = express.Router()

router.get('/search/:name', searchRestAndDishes)

export default router