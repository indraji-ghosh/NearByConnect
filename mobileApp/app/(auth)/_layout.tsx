import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" options={{ headerTitle: "Login" }} />
            <Stack.Screen name="RegisterScreen" options={{ headerTitle: "Register" }} />
        </Stack>
    );
}