import { View, Text, Image, StyleSheet } from "react-native";
import { useAuth } from "../../context/authContext";

export default function Profile() {
    const {user} = useAuth();

    return (
        <View style={styles.container}>
            
            <Image 
                source={user?.avatar ? { uri: user.avatar } : require("../../../public/avatar-default.jpg")}
                style={styles.profileImage} 
            />

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Nombre: {` ${user?.name || "Usuario"}`}</Text>
                <Text style={styles.label}>Email: {` ${user?.email || "No disponible"}`}</Text>
                <Text style={styles.label}>Equipo: {` ${user?.team || "No asignado"}`}</Text>
                <Text style={styles.label}>Posición: {` ${user?.position || "No asignada"}`}</Text>
                <Text style={styles.label}>Rol: {` ${user?.role || "Jugador"}`}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    profileImage: {
        width: 210,
        height: 210,
        borderRadius: 60,
        marginBottom: 100,
    },
    infoContainer: {
        alignItems: "flex-start",
        width: "100%",
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 18,
    },
    infoText: {
        fontSize: 18,
        marginVertical: 5,
    },
});
