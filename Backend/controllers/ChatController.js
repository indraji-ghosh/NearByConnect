import Chat from "../models/Chat.js";
import { Message } from "../models/Message.js";

export const chatController = async (req, res) => {
    const {userId, otherUserId} = req.body;
    try {
        let chat = await Chat.findOne({
            participants: { $all: [userId, otherUserId] } // Ensure this matches your database schema
        });
        if (!chat) {
            chat = new Chat({
                participants: [userId, otherUserId],
                lastMessage: ''
            });
            await chat.save();
        }
        return res.status(200).json({ chat });
    } catch (error) {
        console.error("Chat Controller Error:", error);
        return res.status(500).json({ message: "Server error while accessing chat." });
    }
};

export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId })
      .sort({ createdAt: 1 }); // oldest → newest

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};


export const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;
     const chats = await Chat.find({
    participants: userId
  })
    .populate("participants", "username profileImage")
    .sort({ updatedAt: -1 });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};


export const markChatAsRead = async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.body;

  await Chat.findByIdAndUpdate(chatId, {
    $set: { [`unreadCounts.${userId}`]: 0 },
  });

  res.json({ success: true });
};



export const markMessagesAsRead = async (req, res) => {
  const { userId } = req.body;
  const { chatId } = req.params;

  await Message.updateMany(
    {
      chatId,
      sender: { $ne: userId },
      readBy: { $ne: userId },
    },
    {
      $addToSet: { readBy: userId },
    }
  );

  res.json({ success: true });
};
