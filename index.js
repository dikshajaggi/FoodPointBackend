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
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";

const app = express();
const port = process.env.PORT || 7000
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(bodyParser.json());
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

connectDB().then(() => {
  console.log('MongoDB connected');
  app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
  });
}).catch(error => {
  console.error("MongoDB connection failed:", error);
});
