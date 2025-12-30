import express from "express";
import { chatController, getChatMessages, getUserChats, markChatAsRead, markMessagesAsRead } from "../controllers/ChatController.js";
const router = express.Router();

router.post("/create", chatController);
router.get("/messages/:chatId", getChatMessages);
router.get("/user/:userId", getUserChats);
router.post("/markAsRead/:chatId", markChatAsRead);
router.post("/markMessagesAsRead/:chatId", markMessagesAsRead);

export default router;