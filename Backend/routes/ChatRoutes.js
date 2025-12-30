import express from "express";
import { chatController, getChatMessages, getUserChats, markChatAsRead } from "../controllers/ChatController.js";
const router = express.Router();

router.post("/create", chatController);
router.get("/messages/:chatId", getChatMessages);
router.get("/user/:userId", getUserChats);
router.post("/markAsRead/:chatId", markChatAsRead);

export default router;