import FavouriteRest from "../models/favRest.js";

/**
 * @swagger
 * /api/add-favrest:
 *   post:
 *     summary: Add a restaurant to the user's favorite list
 *     tags: 
 *       - Favourite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID
 *                 example: "60c72b2f5f1b2c001c8e4c8b"
 *               restId:
 *                 type: string
 *                 description: The restaurant ID
 *                 example: "60c72b2f5f1b2c001c8e4c8c"
 *     responses:
 *       200:
 *         description: Favorite restaurant added successfully
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
 *                   example: "Fav rest added successfully"
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

export const addFavRest = async (req, res) => {
    try {
        const {userId, restId} = req.body;
        const favRest = new FavouriteRest({userId, restId})
        await favRest.save()
        res.status(200).json({success: true, message:"Fav rest added successfully"})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

/**
 * @swagger
 * /api/remove-favrest:
 *   delete:
 *     summary: Remove a restaurant from the user's favorite list
 *     tags: 
 *       - Favourite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID
 *                 example: "60c72b2f5f1b2c001c8e4c8b"
 *               restId:
 *                 type: string
 *                 description: The restaurant ID
 *                 example: "60c72b2f5f1b2c001c8e4c8c"
 *     responses:
 *       200:
 *         description: Favorite restaurant removed successfully
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
 *                   example: "Fav rest removed successfully"
 *       404:
 *         description: Favorite not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Favorite not found"
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

export const removeFavRest = async (req, res) => {
    try {
        const {userId, restId} = req.body;
        const favorite = await FavouriteRest.findOneAndDelete({ userId, restId })
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
          }
        res.status(200).json({success: true, message:"Fav rest removed successfully"})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

/**
 * @swagger
 * /api/favrest/{id}:
 *   get:
 *     summary: Show all favorite restaurants for a user
 *     tags: 
 *       - Favourite
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Fetched all favorite restaurants successfully
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
 *                   example: "Fetched all fav restaurants successfully"
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: 'models/favRest' 
 *       404:
 *         description: No restaurants marked as favourite
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
 *                   example: "No restaurants marked as favourite"
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

export const showFavRests = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId, req.params,"check")
        const data = await FavouriteRest.find({userId})
        if (!data || data?.length === 0) {
            return res.status(404).json({ success: false, message: "No restaurants marked as favourite" })
        }
        res.status(200).json({success: true, message: "Fetched all fav restaurants successfully", items: data})

    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}