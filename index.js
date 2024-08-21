import express from "express";
import "dotenv/config";
import connectDB from "./db.js";
import bodyParser from "body-parser";
import cors from "cors";
import RestaurantRoutes from "./routes/RestaurantRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import FavRestRoutes from "./routes/FavRestRoutes.js"
import CategoryRoutes from "./routes/CategoryRoutes.js"
import SearchRoutes from "./routes/SearchRoutes.js"
import OrderRoutes from "./routes/OrderRoutes.js"
import PaymentRoutes from "./routes/PaymentRoutes.js"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";
// import { Server } from 'socket.io';
import { createServer } from 'http';
import Razorpay from "razorpay";
// import { orderSocket } from "./orderSocket.js";


const app = express();
const port = process.env.PORT || 8000
const server = createServer(app);

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:3000' }))
app.get("/health", async (req, res) => {
  res.send({ message: "health OK!" });
});

app.use('/api', RestaurantRoutes);
app.use('/api', CartRoutes);
app.use('/api', FavRestRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', SearchRoutes);
app.use('/api', OrderRoutes);
app.use('/api', PaymentRoutes);


// orderSocket(server)
connectDB().then(() => {
  console.log('MongoDB connected');
  server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
  });
}).catch(error => {
  console.error("MongoDB connection failed:", error);
});
