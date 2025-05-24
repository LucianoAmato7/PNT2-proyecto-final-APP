import { View, Text, Image, StyleSheet } from "react-native";

export default function Profile() {
    return (
        <View style={styles.container}>
            
            <Image 
                source={require("./../../../assets/avatarPerfil.png")}
                style={styles.profileImage} 
            />

            
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}><Text style={styles.label}>Nombre:</Text> Cosme</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Apellido:</Text> Fulanito</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Edad:</Text> 25 años</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Fecha de nacimiento:</Text> 10/05/2000</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Equipo:</Text> Los Cosmonautas</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Altura:</Text> 1.80 m</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Peso:</Text> 75 kg</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Nacionalidad:</Text> Argentina</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Domicilio:</Text> Buenos Aires</Text>
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
        width: 220,
        height: 220,
        borderRadius: 60,
        marginBottom: 100,
    },
    infoContainer: {
        alignItems: "flex-start",
        width: "100%",
        paddingHorizontal: 20,
    },
    label: {
        fontWeight: "bold",
        fontSize: 18,
    },
    infoText: {
        fontSize: 18,
        marginVertical: 5,
    },
});
