import { Slot } from "expo-router";
import { AuthProvider } from "../context/authContext.jsx";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
