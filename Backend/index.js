import express from 'express'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import locationRoutes from './routes/locationRoutes.js';
import findPeople from './routes/findNearByPeopleRoutes.js';
import ChatRoutes from './routes/ChatRoutes.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { Message } from './models/Message.js';
import Chat from './models/Chat.js';
import { send } from 'process';
dotenv.config();

const app = express();
const server = http.createServer(app);



app.use(express.json());
app.use(cors({
  origin: "*",
}));


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error for token missing"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.user.id;
    console.log("Socket authenticated for user:", socket.userId);
    next();
  } catch (error) {
    return next(new Error("Authentication error for decoding token"));
  }
});

const userSockets = new Map(); // store array of sockets of users
const socketUsers = new Map(); // store userId for each socket


io.on("connection", (socket) => {
  const userId = socket.userId;
  console.log(`User connected: ${userId}`);
  if (!userSockets.has(userId)) {
    userSockets.set(userId, new Set());
  }
  userSockets.get(userId).add(socket);
  socketUsers.set(socket.id, userId);


   socket.on("joinChat", ({chatId}) => {
    socket.join(chatId);
    console.log(`User ${userId} joined chat ${chatId}`);
  });


    socket.on("sendMessage", async ({ chatId, senderId, text }) => {
    const message = await Message.create({
      chatId,
      senderId,
      text
    });


  const chat = await Chat.findById(chatId);

  // Increase unread for other users
  chat.participants.forEach((userId) => {
    if (userId.toString() !== senderId) {
      const current = chat.unreadCounts.get(userId.toString()) || 0;
      chat.unreadCounts.set(userId.toString(), current + 1);
    }
  });

  chat.lastMessage = {
    text,
    sender: senderId,
    timestamp: new Date(),
    updatedAt: new Date()
  };

  await chat.save();

    io.to(chatId).emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId}`);
userSockets.get(userId).delete(socket.id);
    socketUsers.delete(socket.id);
    if (userSockets.get(userId).size === 0) {
      userSockets.delete(userId);
    }
  });
});


app.use('/api/auth', authRoutes)
app.use('/api/location', locationRoutes)
app.use('/api/people', findPeople)
app.use('/api/chat', ChatRoutes)

app.get('/', (_req, res)=>{
    res.send("<h1>Hello</h1>")
})

app.get("/api/test", (req, res) => {
  res.json({ message: "Server reachable" });
});



connectDB().then(() => {
    server.listen(3000, "0.0.0.0", ()=>{
        console.log("hello world <3000")
    })
})