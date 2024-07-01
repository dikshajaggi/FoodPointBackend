import Restaurant from "../models/restaurant.js";

/**
 * @swagger
 * /api/search/{name}:
 *   get:
 *     summary: Search restaurants and dishes by name
 *     tags: 
 *       - Search
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The search term for restaurants and dishes
 *         example: "Pizza"
 *     responses:
 *       200:
 *         description: Fetched matching restaurants and dishes successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60c72b2f5f1b2c001c8e4c8e"
 *                       name:
 *                         type: string
 *                         example: "Restaurant A"
 *                       menu:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "60c72b2f5f1b2c001c8e4c8c"
 *                             name:
 *                               type: string
 *                               example: "Pizza"
 *                             description:
 *                               type: string
 *                               example: "Delicious pizza with cheese and toppings"
 *                             price:
 *                               type: number
 *                               example: 10.99
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * Search restaurants and dishes by name.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */

export const searchRestAndDishes = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({ success: false, message: "Search term is required" });
        }

        const words = name.split(/\s+/).map(word => word.trim());
        const pattern = words.map(word => `(${word})`).join('|');
        const regex = new RegExp(`.*(${pattern}).*`, 'i');
        console.log(regex, "regex");

        // Find restaurants with names that match the regex
        const matchingRestaurants = await Restaurant.find({ name: { $regex: regex } });

        // Find all dishes that match the regex in any restaurant
        const allRestaurants = await Restaurant.find({ 'menu.name': { $regex: regex } }).populate('menu');

        // Extract only the matching dishes
        const matchingDishes = [];
        allRestaurants.forEach(restaurant => {
            restaurant.menu.forEach(dish => {
                if (dish.name && regex.test(dish.name)) {
                    matchingDishes.push(dish);
                }
            });
        });

        // Respond with both matching restaurants and matching dishes
        res.status(200).json({
            restaurants: matchingRestaurants,
            dishes: matchingDishes
        });
    } catch (error) {
        console.error('Error fetching restaurants and dishes:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
