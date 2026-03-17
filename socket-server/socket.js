import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();

// Create a Socket.IO server and allow CORS from any origin
export const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    // Listen for "join-room" events and add the socket to the specified room
    socket.on("join-room", (roomId) => {
        socket.join(roomId);
    });
    // Listen for "send-message" events and broadcast the message to all sockets in the specified room
    socket.on("send-message", (data) => {
        io.to(data.roomId).emit("receive-message", data)
    });

    // Listen for "message-delivered" events and broadcast the delivery status to all sockets in the specified room
    socket.on("message-delivered", (data) => {
        io.to(data.roomId).emit("message-delivered", data)
    });

    // Listen for "message-seen" events and broadcast the seen status to all sockets in the specified room
    socket.on("message-seen", (data) => {
        io.to(data.roomId).emit("message-seen", data)
    });

    // Listen for "disconnect" events and log when a user disconnects
    socket.on("disconnect", () => {
        console.log("A user disconnected: " + socket.id);
    });

})

// Start the HTTP server on port 4000
httpServer.listen(4000, () => {
    console.log("Socket.IO server is running on port 4000");
});



