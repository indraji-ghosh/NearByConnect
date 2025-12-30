import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import {  use, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import useLocationUpdate from "@/hooks/useLocationUpdate";
import ChatItem from "@/components/ChatItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { socket } from "@/socket";
import api from "@/api/axios";




export default function HomeScreen() {
    const { user, accessToken } = useContext(AuthContext);
  const { location } = useLocationUpdate();

  const [rawChats, setRawChats] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOCATION DEBUG ---------------- */
  useEffect(() => {
    console.log("User location:", location?.coords);
  }, [location]);

  /* ---------------- FETCH CHATS ---------------- */
  useEffect(() => {
    if (!user?.id) return;
    fetchMyChats();
  }, [user?.id]);

  const fetchMyChats = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/chat/user/${user.id}`);
      setRawChats(res.data);
      console.log("Fetched chats:", res.data);
    } catch (err) {
      console.error("Error fetching chats:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FORMAT FOR UI ---------------- */
  useEffect(() => {
    if (!user?.id || rawChats.length === 0) return;

    const formatted = rawChats.map((chat: any) => {
      const otherUser = chat.participants.find(
        (p: any) => p._id !== user.id
      );

      return {
        id: chat._id,
        name: otherUser?.username || "Unknown",
        message: chat.lastMessage?.text || "",
        userId: user.id,
         unread: chat.unreadCounts?.[user.id] || 0,
      };
    });

    setChats(formatted);
    console.log("Formatted Chats:", formatted);
  }, [rawChats, user?.id]);

  /* ---------------- SOCKET ---------------- */
  useEffect(() => {
    if (!socket || !accessToken) return;

    socket.auth = { token: accessToken };
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("Socket error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [accessToken]);





//  const chats = [
//     {
//       id: 1,
//       name: 'Gyllinton',
//       message: "I don't know what you're ...",
//       time: '3:44 pm',
//       unread: true,
//       avatarBg: '#9ca3af',
//     },
//     {
//       id: 2,
//       name: 'Mark',
//       message: 'You: Why?',
//       time: '9:00 am',
//       unread: true,
//       avatarBg: '#f59e0b',
//     },
//     {
//       id: 3,
//       name: 'Imogen',
//       message: 'Kisses! 👩',
//       time: 'Friday',
//       avatarBg: '#ec4899',
//     },
//     {
//       id: 4,
//       name: 'Alice',
//       message: "You: Okay, I'll tell him",
//       time: '8:34 am',
//       unread: true,
//       avatarBg: '#8b5cf6',
//     },
//     {
//       id: 5,
//       name: 'Cloud',
//       message: 'Audio',
//       time: '8:31 am',
//       avatarBg: '#06b6d4',
//       messageColor: '#06b6d4',
//     },
//     {
//       id: 6,
//       name: 'Emily',
//       message: 'You: Photo',
//       time: '6:00 am',
//       messageColor: '#06b6d4',
//       avatarBg: '#ef4444',
//     },
//     {
//       id: 7,
//       name: 'Pavel',
//       message: 'What is a "bug"?',
//       time: 'Yesterday',
//       avatarBg: '#84cc16',
//     },
//     {
//       id: 8,
//       name: 'Telegram',
//       message: 'New login. Dear Evin, we...',
//       time: 'Monday',
//       verified: true,
//       avatarBg: '#0088cc',
//     },
//     {
//       id: 9,
//       name: 'Telegram',
//       message: 'New login. Dear Evin, we...',
//       time: 'Monday',
//       verified: true,
//       avatarBg: '#0088cc',
//     },
//   ];

  return (
  <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3b82f6" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat List */}
      <ScrollView style={styles.chatList} contentContainerStyle={{ paddingBottom: 20 }}>
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            id={chat.id}
            name={chat.name}
            message={chat.message}
            userId={chat.userId}
            otherUserId={chat.otherUserId}
            unread={chat.unread}
            // time={chat.time}
            // unread={chat.unread ?? false}
            // avatarBg={chat.avatarBg}
            // messageColor={chat.messageColor}
          />
        ))}
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  header: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  headerIcon: {
    fontSize: 20,
    color: '#fff',
  },
  chatList: {
    flex: 1,
  }
});
