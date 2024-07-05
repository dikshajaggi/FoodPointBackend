import { Server } from 'socket.io';
let io;

const orderSocket = (server) => {
    io = new Server(server, {
        cors: {
          origin: 'http://localhost:3001', // Your frontend URL
          methods: ['GET', 'POST']
        }
      });

    io.on('connection', (socket) => {
        console.log('a user connected');
        
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      
        socket.on('order_id', (order_id) => {
          console.log('order_id: ' + order_id);
          const orderId = order_id
          // const statuses = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
           const statuses = [
          { icon: "placed", label: "order placed", desc: "We have recieved your order", id: "placed", fadedicon: "placed_fade" },
          { icon: "processed", label: "order confirmed", desc: "Your order has been confirmed", id: "confirmed", fadedicon: "processed_fade" },
          { icon: "confirmed", label: "order processing", desc: "We are preparing your order", id: "processing", fadedicon: "confirmation_fade" },
          { icon: "delivery", label: "out for delivery", desc: "Your order is out for delivery", id: "delivery", fadedicon: "delivery_fade" },
          { icon: "delivered", label: "delivered", desc: "Your order is delivered", id: "delivered", fadedicon: "delivered_fade" }
        ]
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
}

const getIo = () => io;

export { orderSocket, getIo };
  