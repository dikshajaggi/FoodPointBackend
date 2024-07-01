import Cart from "../models/cart.js"
import { v4 as uuidv4 } from 'uuid';

/**
 * @swagger
 * /api/add-to-cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: 
 *       - Cart
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
 *               menu:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the menu item
 *                     example: "60c72b2f5f1b2c001c8e4c8c"
 *                   name:
 *                     type: string
 *                     description: The name of the menu item
 *                     example: "Pizza"
 *                   description:
 *                     type: string
 *                     description: The description of the menu item
 *                     example: "Delicious pizza with cheese and toppings"
 *                   price:
 *                     type: number
 *                     description: The price of the menu item
 *                     example: 10.99
 *                   category:
 *                     type: string
 *                     description: The category of the menu item
 *                     example: "Main Course"
 *                   imageId:
 *                     type: string
 *                     description: The ID of the image associated with the menu item
 *                     example: "60c72b2f5f1b2c001c8e4c8d"
 *                   inStock:
 *                     type: number
 *                     description: The quantity of the menu item in stock
 *                     example: 20
 *               quantity:
 *                 type: number
 *                 description: The quantity of the item being added to the cart
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *       500:
 *         description: Internal server error
 */

export const addToCart = async (req, res) => {
    try {
        const { user, menu, quantity } = req.body;
        let cart = await Cart.findOne({ user });
        if (!cart) {
            cart = new Cart({ user, items: [] });
        }
        const itemExists = cart.items.some(item => item.menu.id === menu.id);

        if (itemExists) {
            return res.status(400).json({ success: false, message: 'Item already exists in the cart' });
        }
        const cartItem = { menu, quantity, id: uuidv4() };
        cart.items.push(cartItem);
        await cart.save();
        res.status(201).json({ message: "Item added to cart successfully" });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
};


/**
 * @swagger
 * /api/get-cart-items/{id}:
 *   get:
 *     summary: Get all items in the cart for a user
 *     tags: 
 *       - Cart
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
 *         description: Fetched all cart items successfully
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
 *                   example: "Fetched all cart items successfully"
 *                 items:
 *                   type: object
 *                   description: The cart items
 *                   properties:
 *                     user:
 *                       type: string
 *                       description: The user ID
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
 *                                 description: The ID of the menu item
 *                               name:
 *                                 type: string
 *                                 description: The name of the menu item
 *                               description:
 *                                 type: string
 *                                 description: The description of the menu item
 *                               price:
 *                                 type: number
 *                                 description: The price of the menu item
 *                               category:
 *                                 type: string
 *                                 description: The category of the menu item
 *                               imageId:
 *                                 type: string
 *                                 description: The ID of the image associated with the menu item
 *                               inStock:
 *                                 type: number
 *                                 description: The quantity of the menu item in stock
 *                           quantity:
 *                             type: number
 *                             description: The quantity of the item in the cart
 *                           id:
 *                             type: string
 *                             description: The ID of the cart item
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */

/**
 * Get all items in the cart for a user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */

export const getAllCartItems = async (req, res) => {
    try {
        const user = req.params.id;
        const cart = await Cart.findOne({ user });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        res.status(200).json({ success: true, message: "Fetched all cart items successfully", items: cart });

    } catch (error) {
        console.log(error, "error cart items")
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

/**
 * @swagger
 * /api/update-cart-qty/{userId}:
*   post:
 *     summary: Update the quantity of an item in the cart
 *     description: Update the quantity of a specific item in the cart for a user.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user whose cart is being updated.
 *       - in: body
 *         name: cartUpdate
 *         description: Object containing the item ID and update type
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The ID of the item to update.
 *             type:
 *               type: string
 *               enum: [inc, dec]
 *               description: The type of update (increase or decrease quantity).
 *     responses:
 *       '200':
 *         description: Cart updated successfully
 *       '404':
 *         description: Cart not found for the specified user ID.
 *       '500':
 *         description: Internal server error.
 */

export const updateCartQty = async (req, res) => {
    try {
        const { id, type } = req.body
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        const item = cart.items.filter(item => item.menu.id === id)
        console.log(cart, item, "kline153")
        if (type === "inc") item[0].quantity = item[0].quantity + 1
        else if (type === "dec") {
            if (item[0].quantity > 1) {
                item[0].quantity -= 1;
            }
        }
        await cart.save()
        res.status(200).json({ success: true, items: cart, message: "Cart updated successfully" });
    } catch (error) {
        console.log(error, "updatecartere")
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

/**
 * @swagger
 * /api/clear-cart/{userId}:
 *   delete:
 *     summary: Remove all items from the cart
 *     description: Remove all items from the cart for a specific user.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user whose cart items are to be removed.
 *     responses:
 *       '200':
 *         description: All cart items removed successfully
 *       '404':
 *         description: Cart not found for the specified user ID.
 *       '500':
 *         description: Internal server error.
 */

export const deleteAllItems = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        cart.items.splice(0, cart.items.length);
        await cart.save()
        res.status(200).json({ success: true, message: "All cart items removed successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

/**
 * @swagger
 * /api/delete-specific/{userId}/{dishId}:
 *   delete:
 *     summary: Delete a specific item from the cart
 *     tags: 
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *         example: "60c72b2f5f1b2c001c8e4c8b"
 *       - in: path
 *         name: dishId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the menu item to delete
 *         example: "60c72b2f5f1b2c001c8e4c8c"
 *     responses:
 *       200:
 *         description: Item removed successfully
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
 *                   example: "item removed successfully"
 *       404:
 *         description: Cart or item not found
 *       500:
 *         description: Internal server error
 */

/**
 * Delete a specific item from the cart.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */

export const deleteSpecificItem = async (req, res) => {
    try {
        const { userId, dishId } = req.params;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        console.log(cart, "cartdata", dishId, cart.items[0].menu)
        const itemIndex = cart.items.findIndex(item => item.menu.id === dishId)
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
        cart.items.splice(itemIndex, 1)
        await cart.save()
        res.status(200).json({ success: true, message: "item removed successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}