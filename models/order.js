import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    address2: { type: String, default: '' },
    region: { type: String, required: true },
    pincode: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    contact: { type: Number, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    items: [
        {
            menu: {
                id: { type: String, required: true },
                name: { type: String, required: true },
                description: { type: String },
                price: { type: Number },
                defaultPrice: { type: Number },
                category: { type: String },
                imageId: { type: String },
                inStock: { type: Number },
            },
            quantity: { type: Number },
        }
    ],
    orderDate: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: true },
    orderNumber: { type: String, required: true },
    orderStatus: { type: String, default: "Placed" },
});

const orderSchema = new mongoose.Schema({
    user: { type: String, required: true },
    orderItems: [orderItemSchema],
});

const Orders = mongoose.model('Order', orderSchema);
export default Orders;
