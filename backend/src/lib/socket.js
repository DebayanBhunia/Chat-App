import { Server } from "socket.io";
import http from "http";
import express from "express";

const app=express();
const server=http.createServer(app);

const io=new Server(server,
{cors:{
    origin:["http://localhost:5173"],
},
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

const userSocketMap={};  //{userId:SocketId}

io.on("connection", (socket)=>{             // when a user connects to server
    console.log("A user connected ",socket.id);     

    const userId=socket.handshake.query.userId;
    if(userId)
        userSocketMap[userId]=socket.id;

    // io.emit is to send events to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{            // when a user disconnects to server
        console.log("A user disconnected ",socket.id);
        delete userSocketMap[userId];
         io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})


export {io,app,server};