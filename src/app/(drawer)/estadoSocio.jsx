import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const EstadoSocio = () => {
  const [estadoActivo, setEstadoActivo] = useState(false);
  const [monto, setMonto] = useState(5000); // Valor dinámico

  const manejarPago = async () => {
    try {
      setEstadoActivo(true);

      const html = `
        <html>
          <body>
            <h1>Factura de Pago</h1>
            <p>Estado: ACTIVO</p>
            <p>Fecha: ${new Date().toLocaleDateString()}</p>
            <p>Importe: <strong>$${monto.toLocaleString('es-AR')}</strong></p>
            <p>Gracias por su pago.</p>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      console.log('PDF generado en:', uri);

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error al generar o compartir el PDF:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ESTADO</Text>
      <View style={styles.estadoRow}>
        <View
          style={[
            styles.circulo,
            { backgroundColor: estadoActivo ? 'green' : 'red' },
          ]}
        />
        <Text style={styles.estadoTexto}>
          {estadoActivo ? 'ACTIVO' : 'IMPAGO'}
        </Text>
      </View>
      {!estadoActivo && (
        <TouchableOpacity style={styles.boton} onPress={manejarPago}>
          <Text style={styles.botonTexto}>PAGAR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  estadoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  circulo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  estadoTexto: {
    fontSize: 18,
  },
  boton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
  },
});
