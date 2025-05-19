import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useAuth } from "../context/authContext";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function Logout() {
  const { logout } = useAuth();
  const router = useRouter();

  const logoutHandler = () => {
    logout();
    router.replace("/login");
  };

  useFocusEffect(
    useCallback(() => {
      Alert.alert(
        "Cerrar sesión",
        "¿Estás seguro de que querés cerrar sesión?",
        [
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => router.replace("/home"),
          },
          {
            text: "Sí",
            onPress: logoutHandler,
          },
        ]
      );
    }, [])
  );

  return null;
}
