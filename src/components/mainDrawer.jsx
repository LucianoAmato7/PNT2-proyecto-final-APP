import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomDrawerContent from "./customDrawer";
import { useAuth } from "../context/authContext";

//Acá se agregan las pantallas que se van a mostrar en el drawer (menú desplegable)

export default function MainDrawer() {
  const { user } = useAuth();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="home"
          options={{
            headerTitle: "Inicio",
            headerTitleAlign: "center",
            drawerLabel: "Inicio",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            headerTitle: "Perfil",
            headerTitleAlign: "center",
            drawerLabel: "Perfil",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="estadistica"
          options={{
            headerTitle: "Estadística",
            headerTitleAlign: "center",
            drawerLabel: "Estadística",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="bar-chart" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="estadoSocio"
          options={{
            headerTitle: "Estado socio",
            headerTitleAlign: "center",
            drawerLabel: "Estado socio",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="payment" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="editarJugador"
          options={{
            // headerShown: false,
            headerTitle: "Editar jugador",
            headerTitleAlign: "center",
            drawerItemStyle: {
              display: user?.role === "admin" ? "flex" : "none",
            },
            drawerLabel: "Editar Jugadores",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="edit" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
