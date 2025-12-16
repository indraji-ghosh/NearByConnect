import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import Input from "../../components/Input";
import { AuthContext } from "../../context/AuthContext";
import api from "@/api/axios";
import { useRouter } from "expo-router";

const logo = require('../../assets/images/logo.png');

const LoginScreen: React.FC = () => {
  const { login} = useContext(AuthContext);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  useEffect(() => {
    api.get("/test")
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message));
  },[])

  const handleLogin = () => {
    console.log(loginId, password);
    login(loginId, password);
    
  };
  const register = () => {
    router.push("/(auth)/RegisterScreen");
  }


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
        
        <Text style={styles.title}>Login</Text>

        <Input
          placeholder="Email or Username"
          value={loginId}
          onChangeText={setLoginId}
        />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
          <Text style={{textAlign:"center"}}>New user ?</Text>
          <TouchableOpacity onPress={register}>
            <Text style={styles.link}> Register here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  link:{
     color: " #4169E1",
    textAlign: "center",
    fontWeight: "600",
  }
});
