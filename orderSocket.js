// import { Server } from 'socket.io';

// let io;
// const orderIntervals = {}; // Dictionary to keep track of intervals for each order

// const orderSocket = (server) => {
//     io = new Server(server, {
//         cors: {
//             origin: 'http://localhost:3001', // Your frontend URL
//             methods: ['GET', 'POST']
//         }
//     });

//     io.on('connection', (socket) => {
//         console.log('a user connected');

//         socket.on('disconnect', () => {
//             console.log('user disconnected');
//         });

//         socket.on('order_id', (order_id) => {
//             console.log('order_id: ' + order_id);
//             startOrderStatusUpdates(order_id);
//         });
//     });
// }

// const startOrderStatusUpdates = (orderId) => {
//     const statuses = [
//         { icon: "placed", label: "order placed", desc: "We have received your order", id: "placed", fadedicon: "placed_fade" },
//         { icon: "processed", label: "order confirmed", desc: "Your order has been confirmed", id: "confirmed", fadedicon: "processed_fade" },
//         { icon: "confirmed", label: "order processing", desc: "We are preparing your order", id: "processing", fadedicon: "confirmation_fade" },
//         { icon: "delivery", label: "out for delivery", desc: "Your order is out for delivery", id: "delivery", fadedicon: "delivery_fade" },
//         { icon: "delivered", label: "delivered", desc: "Your order is delivered", id: "delivered", fadedicon: "delivered_fade" }
//     ];
//     let statusIndex = 0;

//     if (orderIntervals[orderId]) {
//         clearInterval(orderIntervals[orderId]);
//     }

//     orderIntervals[orderId] = setInterval(() => {
//         if (statusIndex < statuses.length) {
//             io.emit('order_status_update', { orderId, status: statuses[statusIndex] });
//             statusIndex++;
//         } else {
//             clearInterval(orderIntervals[orderId]);
//             delete orderIntervals[orderId];
//         }
//     }, 5000);
// }

// const getIo = () => io;

// export { orderSocket, getIo };
