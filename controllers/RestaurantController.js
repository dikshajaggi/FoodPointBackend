import Restaurant from "../models/restaurant.js";

/**
 * @swagger
 * /api/add-restaurants:
 *   post:
 *     summary: Add a new restaurant
 *     description: Add a new restaurant to the system.
 *     tags: 
 *       - Restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the restaurant.
 *                 example: "253731"
 *               name:
 *                 type: string
 *                 description: The name of the restaurant.
 *                 example: "Pizza Palace"
 *               cloudinaryImageId:
 *                 type: string
 *                 description: The ID of the image stored in Cloudinary.
 *                 example: "cloudinary_image_id"
 *               image:
 *                 type: string
 *                 description: The URL of the restaurant image.
 *                 example: "https://example.com/image.jpg"
 *               locality:
 *                 type: string
 *                 description: The locality of the restaurant.
 *                 example: "Downtown"
 *               areaName:
 *                 type: string
 *                 description: The area name of the restaurant.
 *                 example: "Central Square"
 *               costForTwo:
 *                 type: string
 *                 description: The approximate cost for two people.
 *                 example: "$20"
 *               cuisines:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The cuisines offered by the restaurant.
 *                 example: ["Italian", "American"]
 *               avgRating:
 *                 type: number
 *                 description: The average rating of the restaurant.
 *                 example: 4.5
 *               parentId:
 *                 type: string
 *                 description: The ID of the parent restaurant, if any.
 *                 example: "parent_restaurant_id"
 *               avgRatingString:
 *                 type: string
 *                 description: The string representation of the average rating.
 *                 example: "4.5"
 *               totalRatingsString:
 *                 type: string
 *                 description: The string representation of the total ratings.
 *                 example: "500+ ratings"
 *               sla:
 *                 type: object
 *                 description: Service Level Agreement details.
 *                 properties:
 *                   deliveryTime:
 *                     type: number
 *                     description: The delivery time in minutes.
 *                     example: 30
 *                   lastMileTravel:
 *                     type: number
 *                     description: The last mile travel time in minutes.
 *                     example: 10
 *                   serviceability:
 *                     type: string
 *                     description: The serviceability status.
 *                     example: "Available"
 *                   slaString:
 *                     type: string
 *                     description: The string representation of SLA details.
 *                     example: "30 mins delivery"
 *                   lastMileTravelString:
 *                     type: string
 *                     description: The string representation of last mile travel details.
 *                     example: "10 mins travel"
 *                   iconType:
 *                     type: string
 *                     description: The type of icon.
 *                     example: "icon_type"
 *               availability:
 *                 type: object
 *                 description: Availability details.
 *                 properties:
 *                   nextCloseTime:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp for the next close time.
 *                     example: "2024-06-11T18:00:00Z"
 *                   opened:
 *                     type: boolean
 *                     description: Indicates whether the restaurant is currently open.
 *                     example: true
 *               isOpen:
 *                 type: boolean
 *                 description: Indicates whether the restaurant is currently open.
 *                 example: true
 *               type:
 *                 type: string
 *                 description: The type of restaurant.
 *                 example: "Restaurant"
 *               aggregatedDiscountInfoV3:
 *                 type: object
 *                 description: Aggregated discount information.
 *                 properties:
 *                   header:
 *                     type: string
 *                     description: The header for aggregated discount information.
 *                     example: "20% Off"
 *                   subHeader:
 *                     type: string
 *                     description: The sub-header for aggregated discount information.
 *                     example: "On all orders"
 *     responses:
 *       '201':
 *         description: Restaurant added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant' 
 *       '400':
 *         description: Bad request or validation error.
 *       '500':
 *         description: Internal server error.
 */

export const addRestaurant = async (req, res) => {
  console.log("new rest content check");
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/all-restaurants:
 *   get:
 *     summary: Get all restaurants
 *     description: Retrieve all restaurants from the system.
 *     tags: [Restaurant]
 *     responses:
 *       '200':
 *         description: A list of all restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '/models/Restaurant' 
 *       '500':
 *         description: Internal server error.
 */

export const getAllRest = async (req, res) => {
  try {
    const rests = await Restaurant.find()
    res.status(200).json(rests)
  } catch (error) {
    console.error("error getting restaurants", error)
    res.status(500).json({ message: "failed to fetch restaurants" })
  }
}

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Get a specific restaurant
 *     description: Retrieve a specific restaurant by its ID.
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the restaurant to retrieve.
 *     responses:
 *       '200':
 *         description: The requested restaurant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant' 
 *       '404':
 *         description: Restaurant not found for the specified ID.
 *       '500':
 *         description: Internal server error.
 */

export const getSpecificRest = async (req, res) => {
  const { id } = req.params
  try {
    const rest = await Restaurant.findById(id)
    res.status(200).json(rest)
  } catch (error) {
    console.error("error getting restaurants", error)
    res.status(500).json({ message: "failed to fetch rest" })
  }
}

/**
 * @swagger
 * /api/add-menu-items:
 *   post:
 *     summary: Add menu items to a restaurant
 *     description: Add menu items to the menu of a specific restaurant.
 *     tags: [Restaurant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the restaurant.
 *                 example: "60c72b2f5f1b2c001c8e4c8b"
 *               dish:
 *                 type: object
 *                 description: The dish object to add to the menu.
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the dish.
 *                     example: "Pizza"
 *                   description:
 *                     type: string
 *                     description: The description of the dish.
 *                     example: "Delicious pizza with cheese and toppings"
 *                   price:
 *                     type: number
 *                     description: The price of the dish.
 *                     example: 10.99
 *                   category:
 *                     type: string
 *                     description: The category of the dish.
 *                     example: "Main Course"
 *                   imageId:
 *                     type: string
 *                     description: The ID of the image associated with the dish.
 *                     example: "60c72b2f5f1b2c001c8e4c8d"
 *                   inStock:
 *                     type: number
 *                     description: The quantity of the dish in stock.
 *                     example: 20
 *     responses:
 *       '200':
 *         description: Menu items added successfully
 *       '404':
 *         description: Restaurant not found for the specified ID.
 *       '500':
 *         description: Internal server error.
 */


export const addMenuItems = async (req, res) => {
  try {
    const { id, dish } = req.body
    const rest = await Restaurant.findOne({ id })
    console.log(rest, "getting rest")
    if (!rest) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    rest.menu.push(dish)
    await rest.save()
    res.status(200).json({ message: "dish added successfully" })

  }
  catch (error) {
    console.log(error, "error")
    res.status(500).json({ message: "internal server error" })
  }
}
