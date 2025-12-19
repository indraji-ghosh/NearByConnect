import { Stack, Redirect, useRootNavigationState } from "expo-router";
import { AuthProvider, AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

function Splash() {
  return (
    <View style={styles.splashContainer}>
      <ActivityIndicator size="large" color="#000" />
      <Text style={styles.splashText}>Loading...</Text>
    </View>
  );
}

function RootLayout() {
  const { isLoading, accessToken } = useContext(AuthContext);
  const rootState = useRootNavigationState();

  // Show splash while auth restoring or navigation not ready
  if (isLoading || !rootState?.key) {
    return <Splash />;
  }

    return (
     <Stack screenOptions={{ headerShown: false }}>
      {!accessToken ? (
        <Stack.Screen name="(auth)" />
      ) : (
        <Stack.Screen name="(app)" />
      )}
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  splashText: {
    marginTop: 12,
    fontSize: 16,
    color: "#333",
  },
});
