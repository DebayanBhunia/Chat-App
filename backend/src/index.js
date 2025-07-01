import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server} from "./lib/socket.js"

dotenv.config(); // Load environment variables


const PORT = process.env.PORT;

// Middleware
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);


// Server listener
server.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
    connectDB(); // Connect to DB after starting the server
});