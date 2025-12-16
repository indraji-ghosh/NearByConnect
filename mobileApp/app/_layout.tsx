import { Stack } from "expo-router";
import { AuthProvider, AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useRouter } from "expo-router";

function RootLayout() {
  const { isLoading, accessToken } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (accessToken) {
        router.replace("/home");
      } else {
        router.replace("/(auth)/LoginScreen");
      }
    }
  }, [isLoading, accessToken, router]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}
