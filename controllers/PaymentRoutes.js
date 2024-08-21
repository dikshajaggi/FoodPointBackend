import { instance } from "../index.js"
import Payment from "../models/payment.js";

export const makepayment = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),  
      currency: "INR"
    };
    const order = await instance.orders.create(options);
    res.status(201).json({ success: true, message: "Payment made successfully", order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Payment failed", error });
  }
}


export const paymentVerification = async (req, res) => {
    try {
        console.log(req.body, "bodyyyyyyy")
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body
        const { validatePaymentVerification } = await import('razorpay/dist/utils/razorpay-utils.js');
        const result = validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, process.env.RAZORPAY_API_SECRET);

        await Payment.create({
            razorpay_order_id, razorpay_payment_id, razorpay_signature
        })
        // res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
        res.redirect(`https://foodpoint24.netlify.app/paymentsuccess?reference=${razorpay_payment_id}`)
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json(error);
    };
      
}

export const getKey = async(req, res) => {
    try {
        res.status(200).json({key: process.env.RAZORPAY_API_KEY});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json(error);
    };
}
