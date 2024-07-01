import Orders from "../models/order.js";
import Cart from "../models/cart.js";

/**
 * @swagger
 * /api/place-order:
 *   post:
 *     summary: Create a new order
 *     tags: 
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The user ID
 *                 example: "60c72b2f5f1b2c001c8e4c8b"
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menu:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The menu item ID
 *                           example: "60c72b2f5f1b2c001c8e4c8c"
 *                         name:
 *                           type: string
 *                           description: The name of the menu item
 *                           example: "Pizza"
 *                         description:
 *                           type: string
 *                           description: The description of the menu item
 *                           example: "Delicious pizza with cheese and toppings"
 *                         price:
 *                           type: number
 *                           description: The price of the menu item
 *                           example: 10.99
 *                         category:
 *                           type: string
 *                           description: The category of the menu item
 *                           example: "Main Course"
 *                         imageId:
 *                           type: string
 *                           description: The ID of the image associated with the menu item
 *                           example: "60c72b2f5f1b2c001c8e4c8d"
 *                         inStock:
 *                           type: number
 *                           description: The quantity of the menu item in stock
 *                           example: 20
 *                     quantity:
 *                       type: number
 *                       description: The quantity of the item being ordered
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order placed successfully"
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
 * Create a new order.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */

export const createOrder = async (req, res) => {
    try {
        const { user, orderItems } = req.body;
        console.log(user, orderItems, req.body, "placing order details");

        let order = await Orders.findOne({ user });

        if (order) {
            order.orderItems.push(...orderItems); // Spread the orderItems to correctly add them to the array
        } else {
            order = new Orders({ user, orderItems: [...orderItems] }); // Spread the orderItems
        }

        await order.save();

        res.status(201).json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.log(error, "error placing order");
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// cartid => fetch cart details => fetch itemid => get details of the particular order
/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Get a specific order for a user
 *     tags: 
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The user ID
 *                 example: "60c72b2f5f1b2c001c8e4c8b"
 *               cart:
 *                 type: string
 *                 description: The cart ID
 *                 example: "60c72b2f5f1b2c001c8e4c8e"
 *     responses:
 *       200:
 *         description: Fetched specific order successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 items:
 *                   type: object
 *                   description: The cart data associated with the order
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f5f1b2c001c8e4c8e"
 *                     user:
 *                       type: string
 *                       example: "60c72b2f5f1b2c001c8e4c8b"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           menu:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: "60c72b2f5f1b2c001c8e4c8c"
 *                               name:
 *                                 type: string
 *                                 example: "Pizza"
 *                               price:
 *                                 type: number
 *                                 example: 10.99
 *                           quantity:
 *                             type: number
 *                             example: 2
 *                           total:
 *                             type: number
 *                             example: 21.98
 *       404:
 *         description: Order not found
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
 *                   example: "order not found"
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
 * Get a specific order for a user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */

export const getSpecificOrder = async (req, res) => {
    // will run on view order/reorder
    try {
        const { user, cart } = req.body;
        const order = await Orders.findOne({ user })
        if (!order) {
            res.status(404).json({ success: false, message: "order not found" })
        }
        const cartData = await Cart.findOne({ cart })
        res.status(200).json({ success: true, items: cartData })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

/**
 * @swagger
 * /api/all-orders/{id}:
 *   get:
 *     summary: Get all orders for a user
 *     tags: 
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *         example: "60c72b2f5f1b2c001c8e4c8b"
 *     responses:
 *       200:
 *         description: Fetched all orders successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 items:
 *                   type: object
 *                   description: The user's order details
 *                   properties:
 *                     user:
 *                       type: string
 *                       description: The user ID
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           orderId:
 *                             type: string
 *                             description: The order ID
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             description: The date of the order
 *                           items:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 menu:
 *                                   type: object
 *                                   properties:
 *                                     id:
 *                                       type: string
 *                                       description: The menu item ID
 *                                     name:
 *                                       type: string
 *                                       description: The name of the menu item
 *                                     price:
 *                                       type: number
 *                                       description: The price of the menu item
 *                                 quantity:
 *                                   type: number
 *                                   description: The quantity ordered
 *                                 total:
 *                                   type: number
 *                                   description: The total price for the item
 *                           totalPrice:
 *                             type: number
 *                             description: The total price for the order
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
 * Get all orders for a user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */

export const getAllOrders = async (req, res) => {
    // will run on show previous orders
    try {
        const user = req.params.id;
        const data = await Orders.findOne({ user })
        console.log(user, data, "getting user orders", req.params)
        res.status(200).json({ success: true, items: data })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}