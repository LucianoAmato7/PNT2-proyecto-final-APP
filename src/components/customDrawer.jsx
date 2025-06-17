import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";
import { Alert, Image, View, Text } from "react-native";
import Images from "../constants/images";

export default function CustomDrawerContent(props) {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que querés cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sí",
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  const avatarSource = user?.avatar
    ? { uri: user.avatar }
    : Images.avatarDefault;

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1 }}
    >
      <View>
        <Image
          source={avatarSource}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginTop: 25,
            marginBottom: 15,
            alignSelf: "center",
          }}
        />
        <Text
            style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 25,
            }}
        >
            {user?.name || "Usuario"}
        </Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar sesión"
        icon={({ size, color }) => (
          <MaterialIcons name="logout" size={size} color={color} />
        )}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}
