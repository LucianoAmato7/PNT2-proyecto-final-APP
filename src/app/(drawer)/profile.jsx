import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Colors from "../../constants/colors.jsx";
import { useAuth } from "../../context/authContext.jsx";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadImageToSupabase } from "../../utils/uploadImage.js";
import Images from "../../constants/images.jsx";

export default function ProfileScreen() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const updateAvatar = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Se necesita acceso a la cámara");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    const uri = result?.assets?.[0]?.uri;

    if (uri) {
      try {
        setLoading(true);
        
        const uploadedUrl = await uploadImageToSupabase(uri);
        if (!uploadedUrl) throw new Error("No se pudo subir la imagen");

        const updatedUser = { ...user, avatar: uploadedUrl };
        const usersJSON = await AsyncStorage.getItem("users");
        const users = usersJSON ? JSON.parse(usersJSON) : [];

        const updatedUsers = users.map((u) =>
          u.email === user.email ? updatedUser : u
        );

        await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
        await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));
        setUser(updatedUser);
        Alert.alert("Éxito", "Avatar actualizado");
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "No se pudo actualizar el avatar");
      } finally {
        setLoading(false);
      }
    }
  };

  if (!user) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={user.avatar ? { uri: user.avatar } : Images.avatarDefault}
        style={styles.avatar}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={updateAvatar}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Actualizando..." : "Cambiar Foto"}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Equipo:</Text>
        <Text style={styles.value}>{user.team}</Text>

        <Text style={styles.label}>Posición:</Text>
        <Text style={styles.value}>{user.position}</Text>

        <Text style={styles.label}>Altura:</Text>
        <Text style={styles.value}>{user.height}</Text>

        <Text style={styles.label}>Peso:</Text>
        <Text style={styles.value}>{user.weight}</Text>

        <Text style={styles.label}>Fecha de nacimiento:</Text>
        <Text style={styles.value}>{user.birthdate}</Text>

        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{user.phone}</Text>

        <Text style={styles.label}>Dirección:</Text>
        <Text style={styles.value}>{user.address}</Text>

        <Text style={styles.label}>Nacionalidad:</Text>
        <Text style={styles.value}>{user.nationality}</Text>

        <Text style={styles.label}>Rol:</Text>
        <Text style={styles.value}>{user.role}</Text>

        <Text style={styles.label}>Activo:</Text>
        <Text style={styles.value}>{user.isActive ? "Sí" : "No"}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.buttons,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  infoContainer: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  value: {
    marginBottom: 12,
    fontSize: 16,
    color: "#444",
  },
});
