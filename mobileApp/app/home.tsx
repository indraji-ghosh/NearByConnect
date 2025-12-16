import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { use, useContext, useEffect } from "react";
import { router } from "expo-router";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, accessToken, logout } = useContext(AuthContext);

  // 🔒 Guard: if token is missing, redirect to login
  useEffect(() => {
    if (!accessToken) {
      router.replace("/(auth)/LoginScreen");
    }
  }, [accessToken]);

  // ⏳ Prevent blank flash
  if (!accessToken) {
    return null;
  }
 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, {user?.username ?? "User"}
      </Text>


      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await logout();
          router.replace("/(auth)/LoginScreen");
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
