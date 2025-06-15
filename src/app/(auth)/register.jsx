import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import Colors from '../../constants/colors.jsx';
import { useAuth } from '../../context/authContext.jsx';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    avatar: '',
    team: '',
    position: '',
  });

  const { register } = useAuth();
  const navigation = useNavigation();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    const { name, email, avatar, team, position } = form;
    if (!name || !email) {
      return Alert.alert('Campos obligatorios', 'Nombre y email son requeridos.');
    }

    const newUser = {
      ...form,
      email: email.toLowerCase(),
      avatar: avatar || `https://robohash.org/${email.toLowerCase()}`,
      role: 'player',
      isActive: true,
    };

    try {
      await register(newUser);
      Alert.alert('¡Registro exitoso!', 'Bienvenido a JugAr');
      // no es necesario redirigir manualmente si tu Stack ya redibuja al loguearse
    } catch (error) {
      Alert.alert('Error al registrar', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Registro</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="URL del avatar (opcional)"
          value={form.avatar}
          onChangeText={(text) => handleChange('avatar', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Equipo"
          value={form.team}
          onChangeText={(text) => handleChange('team', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Posición"
          value={form.position}
          onChangeText={(text) => handleChange('position', text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkButton}>
          <Text style={styles.linkText}>¿Ya tenés cuenta? Iniciar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    height: 50,
    backgroundColor: Colors.buttons,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: Colors.buttons,
    textDecorationLine: 'underline',
  },
});
