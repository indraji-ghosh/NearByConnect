import express from "express";
import { chatController, getChatMessages } from "../controllers/ChatController.js";
const router = express.Router();

router.post("/create", chatController);
router.get("/messages/:chatId", getChatMessages);

export default router;