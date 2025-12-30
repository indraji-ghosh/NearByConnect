import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
     lastMessage: {
    text: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp: Date
  },
  unreadCounts: {
      type: Map,
      of: Number, // key = userId, value = unread count
      default: {},
    }, 
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;