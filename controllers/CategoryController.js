import Category from "../models/category.js"
import Restaurant from "../models/restaurant.js";
import multer from 'multer';
import path  from 'path';

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/', // Folder where images will be saved
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  // Init upload
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single('image'); // 'image' is the field name for the file
  
  // Check file type
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }

export const addCategory = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    try {
      const { en, hn } = req.body;
      const image = req.file ? req.file.path : '';

      const newCategory = new Category({
        en,
        hn,
        image,
      });

      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: 
 *       - Category
 *     responses:
 *       200:
 *         description: Fetched all categories successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60c72b2f5f1b2c001c8e4c8f"
 *                   name:
 *                     type: string
 *                     example: "Beverages"
 *                   description:
 *                     type: string
 *                     example: "Various kinds of drinks"
 *                   imageUrl:
 *                     type: string
 *                     example: "http://example.com/image.jpg"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * Get all categories.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */


export const getAllCatgeories = async (req, res) => {
    try {
        const category = await Category.find()
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/**
 * @swagger
 * /api/menu/{id}:
 *   get:
 *     summary: Fetch restaurants by category
 *     tags: 
 *       - Restaurant
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category name
 *         example: "Pizza"
 *     responses:
 *       200:
 *         description: Fetched restaurants by category successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60c72b2f5f1b2c001c8e4c8e"
 *                   name:
 *                     type: string
 *                     example: "Restaurant A"
 *                   menu:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "60c72b2f5f1b2c001c8e4c8c"
 *                         name:
 *                           type: string
 *                           example: "Pizza"
 *                         description:
 *                           type: string
 *                           example: "Delicious pizza with cheese and toppings"
 *                         price:
 *                           type: number
 *                           example: 10.99
 *                         category:
 *                           type: string
 *                           example: "Main Course"
 *                         imageId:
 *                           type: string
 *                           example: "60c72b2f5f1b2c001c8e4c8d"
 *                         inStock:
 *                           type: number
 *                           example: 20
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * Fetch restaurants by category.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */

export const fetchRestaurantsByCategory = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id, "category nameee", req.params)
        const words = id.split(/\s+/).map(word => word.trim());
        const pattern = words.map(word => `(${word})`).join('|');
        const regex = new RegExp(`.*(${pattern}).*`, 'i');
        console.log(regex, "regex");

        const restaurants = await Restaurant.find({ $or: [{ 'menu.name': { $regex: regex } }, { 'menu.category': { $regex: regex } }] });
        res.status(200).json(restaurants)
    } catch (error) {
        console.error('Error fetching restaurants by category:', error);
        throw error;
    }
};