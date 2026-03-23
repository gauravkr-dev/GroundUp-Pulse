import { io } from "socket.io-client";

export const socket = io("https://groundup-pulse-1.onrender.com", {
    transports: ["websocket"],
});
