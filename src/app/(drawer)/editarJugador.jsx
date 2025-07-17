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

    Alert.alert("✅ Actualizado", "Los datos del jugador han sido guardados.");
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
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={jugadorEditado.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={jugadorEditado.email}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Equipo"
            value={jugadorEditado.team}
            onChangeText={(text) => handleChange("team", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Posición"
            value={jugadorEditado.position}
            onChangeText={(text) => handleChange("position", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={jugadorEditado.phone}
            onChangeText={(text) => handleChange("phone", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={jugadorEditado.address}
            onChangeText={(text) => handleChange("address", text)}
          />

          {/* Campos de estadísticas */}
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <TextInput
            style={styles.input}
            placeholder="Goles"
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
          <TextInput
            style={styles.input}
            placeholder="Asistencias"
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
          <TextInput
            style={styles.input}
            placeholder="Tarjetas amarillas"
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
          <TextInput
            style={styles.input}
            placeholder="Tarjetas rojas"
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
          <TextInput
            style={styles.input}
            placeholder="Remates al arco"
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
          <TextInput
            style={styles.input}
            placeholder="Partidos jugados"
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
          <TextInput
            style={styles.input}
            placeholder="Minutos jugados"
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
