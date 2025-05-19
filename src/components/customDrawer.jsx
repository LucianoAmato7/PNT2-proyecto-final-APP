import 'react-native-gesture-handler';
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//Acá se agregan las pantallas que se van a mostrar en el drawer (menú desplegable)

export default function CustomDrawer (){
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen name="home" options={{ 
                    title: "Inicio",
                    drawerLabel: "Inicio",
                }} />
                <Drawer.Screen name="logout" options={{ 
                    title: "Cerrar sesión",
                    drawerLabel: "Cerrar sesión",
                }} />
            </Drawer>
        </GestureHandlerRootView>
    )
}