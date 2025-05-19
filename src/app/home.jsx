import { Text, View } from "react-native"

//Modificar

export default Home = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>JugAr</Text>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>Bienvenido a la app</Text>
            <Text style={{ fontSize: 16, color: "gray" }}>Esta es la vista de inicio</Text>
        </View>
    )
}