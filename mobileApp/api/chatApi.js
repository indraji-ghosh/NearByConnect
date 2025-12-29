import api from "../api/axios";

export const createOrGetChat = async (userId, otherUserId) => {
    if (!userId || !otherUserId) {
        throw new Error("User ID and other user id are required to create or get chat.");
    }
   
    const res = await api.post('/chat/create', {
        userId,
        otherUserId
    });
    return res.data.chat;
}


export const fetchChatMessages = async (chatId) => {
  const res = await api.get(
    `/chat/messages/${chatId}`
  );
  return res.data;
};