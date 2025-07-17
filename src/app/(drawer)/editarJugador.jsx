import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function AdminEditarJugador() {
  const [jugadores, setJugadores] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [jugadorEditado, setJugadorEditado] = useState(null);

  const fetchJugadores = async () => {
    const data = await AsyncStorage.getItem("users");
    const usuarios = data ? JSON.parse(data) : [];
    const soloJugadores = usuarios.filter((u) => u.role === "player");
    setJugadores(soloJugadores);
  };

  useEffect(() => {
    fetchJugadores();
  }, []);

  const handleSelectJugador = (email) => {
    setSelectedEmail(email);
    const seleccionado = jugadores.find((u) => u.email === email);
    setJugadorEditado({ ...seleccionado });
  };

  const handleChange = (field, value) => {
    setJugadorEditado((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuardar = async () => {
    try {
      const data = await AsyncStorage.getItem("users");
      const usuarios = data ? JSON.parse(data) : [];

      const actualizados = usuarios.map((u) =>
        u.email === selectedEmail ? jugadorEditado : u
      );

      await AsyncStorage.setItem("users", JSON.stringify(actualizados));
      await fetchJugadores();

      setSelectedEmail("");
      setJugadorEditado(null);

      Alert.alert(
        "✅ Actualizado",
        "Los datos del jugador han sido guardados."
      );
    } catch (error) {
      Alert.alert("❌ Error", "No se pudieron guardar los cambios.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar jugador</Text>

      <Picker
        selectedValue={selectedEmail}
        onValueChange={handleSelectJugador}
        style={styles.picker}
      >
        <Picker.Item label="Seleccioná un jugador" value="" />
        {jugadores.map((j) => (
          <Picker.Item key={j.email} label={j.name} value={j.email} />
        ))}
      </Picker>

      {jugadorEditado && (
        <>
          <Text>Nombre</Text>
          <TextInput
            style={styles.input}
            value={jugadorEditado.name}
            onChangeText={(text) => handleChange("name", text)}
          />

          <Text>Email</Text>
          <TextInput
            style={styles.input}
            value={jugadorEditado.email}
            editable={false}
          />

          <Text>Equipo</Text>
          <TextInput
            style={styles.input}
            value={jugadorEditado.team}
            onChangeText={(text) => handleChange("team", text)}
          />

          <Text>Posición</Text>
          <TextInput
            style={styles.input}
            value={jugadorEditado.position}
            onChangeText={(text) => handleChange("position", text)}
          />

          <Text>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={jugadorEditado.phone}
            onChangeText={(text) => handleChange("phone", text)}
          />

          <Text>Dirección</Text>
          <TextInput
            style={styles.input}
            value={jugadorEditado.address}
            onChangeText={(text) => handleChange("address", text)}
          />

          <Text style={styles.sectionTitle}>Estadísticas</Text>

          <Text>Goles</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={jugadorEditado.statistics?.goals?.toString() || ""}
            onChangeText={(text) =>
              setJugadorEditado((prev) => ({
                ...prev,
                statistics: {
                  ...prev.statistics,
                  goals: parseInt(text) || 0,
                },
              }))
            }
          />

          <Text>Asistencias</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={jugadorEditado.statistics?.assists?.toString() || ""}
            onChangeText={(text) =>
              setJugadorEditado((prev) => ({
                ...prev,
                statistics: {
                  ...prev.statistics,
                  assists: parseInt(text) || 0,
                },
              }))
            }
          />

          <Text>Tarjetas amarillas</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={jugadorEditado.statistics?.yellowCards?.toString() || ""}
            onChangeText={(text) =>
              setJugadorEditado((prev) => ({
                ...prev,
                statistics: {
                  ...prev.statistics,
                  yellowCards: parseInt(text) || 0,
                },
              }))
            }
          />

          <Text>Tarjetas rojas</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={jugadorEditado.statistics?.redCards?.toString() || ""}
            onChangeText={(text) =>
              setJugadorEditado((prev) => ({
                ...prev,
                statistics: {
                  ...prev.statistics,
                  redCards: parseInt(text) || 0,
                },
              }))
            }
          />

          <Text>Remates al arco</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={jugadorEditado.statistics?.shotsOnTarget?.toString() || ""}
            onChangeText={(text) =>
              setJugadorEditado((prev) => ({
                ...prev,
                statistics: {
                  ...prev.statistics,
                  shotsOnTarget: parseInt(text) || 0,
                },
              }))
            }
          />

          <Text>Partidos jugados</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={jugadorEditado.statistics?.matchesPlayed?.toString() || ""}
            onChangeText={(text) =>
              setJugadorEditado((prev) => ({
                ...prev,
                statistics: {
                  ...prev.statistics,
                  matchesPlayed: parseInt(text) || 0,
                },
              }))
            }
          />

          <Text>Minutos jugados</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={jugadorEditado.statistics?.minutesPlayed?.toString() || ""}
            onChangeText={(text) =>
              setJugadorEditado((prev) => ({
                ...prev,
                statistics: {
                  ...prev.statistics,
                  minutesPlayed: parseInt(text) || 0,
                },
              }))
            }
          />

          <TouchableOpacity style={styles.button} onPress={handleGuardar}>
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  picker: {
    marginBottom: 20,
    backgroundColor: "#eee",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
