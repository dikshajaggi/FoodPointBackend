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
import { Server } from 'socket.io';
import { createServer } from 'http';


const app = express();
const port = process.env.PORT || 8000
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001', // Your frontend URL
    methods: ['GET', 'POST']
  }
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3001' }))
app.get("/health", async (req, res) => {
  res.send({ message: "health OK!" });
});

app.use('/api', RestaurantRoutes);
app.use('/api', CartRoutes);
app.use('/api', FavRestRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', SearchRoutes);
app.use('/api', OrderRoutes);


io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('order_id', (order_id) => {
    console.log('order_id: ' + order_id);
    const orderId = order_id
    const statuses = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
    let statusIndex = 0;

    const interval = setInterval(() => {
      if (statusIndex < statuses.length) {
        io.emit('order_status_update', { orderId, status: statuses[statusIndex] });
        statusIndex++;
      } else {
        clearInterval(interval);
      }
    }, 5000);
  });
});

connectDB().then(() => {
  console.log('MongoDB connected');
  server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
  });
}).catch(error => {
  console.error("MongoDB connection failed:", error);
});
