import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useLocationUpdate from "@/hooks/useLocationUpdate";
import { io } from "socket.io-client";



export default function HomeScreen() {
  const { user, accessToken, logout } = useContext(AuthContext);
  const { location } = useLocationUpdate();
 
useEffect(() => {
  console.log("User location:", location?.coords);
}, [location]);

useEffect(() => {
  const socket = io("http://192.168.1.22:3000", {
    transports: ["websocket"],
    auth: {
      token: accessToken,
    },
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("connect_error", err => {
    console.log("Connection error:", err.message);
  });

  return () => {
    socket.disconnect();
    console.log("Socket disconnected");
  };
}, [accessToken]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, {user?.username ?? "User"}
      </Text>


      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await logout();
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <Text>Current location: {location ? `${location.coords.latitude}, ${location.coords.longitude}` : 'Loading...'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
