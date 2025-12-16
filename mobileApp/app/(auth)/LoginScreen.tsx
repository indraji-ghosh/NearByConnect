import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Input from "../../components/Input";
import { AuthContext } from "../../context/AuthContext";
import api from "@/api/axios";

const LoginScreen: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

   useEffect(() => {
    api.get("/test")
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message));
  },[])

  const handleLogin = () => {
    console.log(loginId, password);
    login(loginId, password);
    
  };


  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
