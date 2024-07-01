import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: {
      type: String,
      required: true
  },
  description: {
      type: String,
  },
  price: {
      type: Number,
  },
  defaultPrice: {
    type: Number,
  },
  category: {
      type: String,
  },
  imageId: { type: String },
  inStock: { type: Number },
});

const CartItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    menu: {
        type: menuSchema,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
  });
  

const CartSchema = new mongoose.Schema({
    user: {
      type: String,
      required: true
    },
    items: [CartItemSchema] 
  });
  
const Cart =  mongoose.model('Cart', CartSchema)
export default Cart;