import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import {  useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import useLocationUpdate from "@/hooks/useLocationUpdate";
import { io } from "socket.io-client";
import ChatItem from "@/components/ChatItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { setItemAsync } from "expo-secure-store";
import { socket } from "@/socket";



export default function HomeScreen() {
  const { user, accessToken, logout } = useContext(AuthContext);
  const { location } = useLocationUpdate();
 
useEffect(() => {
  console.log("User location:", location?.coords);
}, [location]);


useEffect(() => {
  if (socket && accessToken) {
    socket.auth = { token: accessToken };
    socket.connect();
    console.log("Socket connecting with token:", accessToken);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });
    socket.on("connect_error", (err) => {
      console.log("Connection error:", err.message);
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }
}, [accessToken]);




 const chats = [
    {
      id: 1,
      name: 'Gyllinton',
      message: "I don't know what you're ...",
      time: '3:44 pm',
      unread: true,
      avatarBg: '#9ca3af',
    },
    {
      id: 2,
      name: 'Mark',
      message: 'You: Why?',
      time: '9:00 am',
      unread: true,
      avatarBg: '#f59e0b',
    },
    {
      id: 3,
      name: 'Imogen',
      message: 'Kisses! 👩',
      time: 'Friday',
      avatarBg: '#ec4899',
    },
    {
      id: 4,
      name: 'Alice',
      message: "You: Okay, I'll tell him",
      time: '8:34 am',
      unread: true,
      avatarBg: '#8b5cf6',
    },
    {
      id: 5,
      name: 'Cloud',
      message: 'Audio',
      time: '8:31 am',
      avatarBg: '#06b6d4',
      messageColor: '#06b6d4',
    },
    {
      id: 6,
      name: 'Emily',
      message: 'You: Photo',
      time: '6:00 am',
      messageColor: '#06b6d4',
      avatarBg: '#ef4444',
    },
    {
      id: 7,
      name: 'Pavel',
      message: 'What is a "bug"?',
      time: 'Yesterday',
      avatarBg: '#84cc16',
    },
    {
      id: 8,
      name: 'Telegram',
      message: 'New login. Dear Evin, we...',
      time: 'Monday',
      verified: true,
      avatarBg: '#0088cc',
    },
    {
      id: 9,
      name: 'Telegram',
      message: 'New login. Dear Evin, we...',
      time: 'Monday',
      verified: true,
      avatarBg: '#0088cc',
    },
  ];

  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>
    //     Welcome, {user?.username ?? "User"}
    //   </Text>


    //   <TouchableOpacity
    //     style={styles.button}
    //     onPress={async () => {
    //       await logout();
    //     }}
    //   >
    //     <Text style={styles.buttonText}>Logout</Text>
    //   </TouchableOpacity>

    //   <Text>Current location: {location ? `${location.coords.latitude}, ${location.coords.longitude}` : 'Loading...'}</Text>
    // </View>


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
            time={chat.time}
            unread={chat.unread ?? false}
            avatarBg={chat.avatarBg}
            messageColor={chat.messageColor}
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
  },
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   padding: 20,
  // },
  // title: {
  //   fontSize: 26,
  //   fontWeight: "700",
  //   marginBottom: 10,
  // },
  // subtitle: {
  //   fontSize: 16,
  //   color: "#666",
  //   marginBottom: 30,
  // },
  // button: {
  //   backgroundColor: "#000",
  //   paddingVertical: 14,
  //   paddingHorizontal: 40,
  //   borderRadius: 8,
  // },
  // buttonText: {
  //   color: "#fff",
  //   fontSize: 16,
  //   fontWeight: "600",
  // },
});
