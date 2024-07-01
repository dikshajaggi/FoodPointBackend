import express from 'express';
import { addRestaurant, getAllRest, getSpecificRest, addMenuItems } from '../controllers/RestaurantController.js';

const router = express.Router();

router.post('/add-restaurants', addRestaurant);
router.get('/all-restaurants', getAllRest);
router.get('/restaurants/:id', getSpecificRest);
router.post('/add-menu-items', addMenuItems);


export default router;
