import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import Input from "../../components/Input";
const logo = require('../../assets/images/logo.png');
import { AuthContext } from "../../context/AuthContext";

const RegisterScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const { register} = useContext(AuthContext);
  

  const handleRegister = async () => {
    try {
      await register(username, email, password);
    } catch (error) {
      console.log("Registration error:", error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <Text style={styles.title}>Register</Text>

        <Input placeholder="Username" value={username} onChangeText={setUsername} />
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
