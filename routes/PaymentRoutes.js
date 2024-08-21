import express from 'express';
import { getKey, makepayment, paymentVerification } from '../controllers/PaymentRoutes.js';
const router = express.Router()

router.post("/payment", makepayment)
router.post("/paymentverification", paymentVerification)
router.get("/getkey", getKey)

export default router