import 'react-native-gesture-handler';
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

//Acá se agregan las pantallas que se van a mostrar en el drawer (menú desplegable)

export default function CustomDrawer (){
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen name="home" options={{ 
                    title: "Inicio",
                    drawerLabel: "Inicio",
                    drawerIcon: ({size, color}) => <MaterialIcons name="home" size={size} color={color} />,
                }} />
                <Drawer.Screen name='profile' options={{
                    title: "Perfil",
                    drawerLabel: "Perfil",
                    drawerIcon: ({size, color}) => <MaterialIcons name="person" size={size} color={color} />,
                }} />
                <Drawer.Screen name="logout" options={{ 
                    title: "Cerrar sesión",
                    drawerLabel: "Cerrar sesión",
                    drawerIcon: ({size, color}) => <MaterialIcons name="logout" size={size} color={color} />,
                }} />
            </Drawer>
        </GestureHandlerRootView>
    )
}