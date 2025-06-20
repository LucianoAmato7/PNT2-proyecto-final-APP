
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Animated,
} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

function EstadoSocio () {
    const [estadoActivo, setEstadoActivo] = useState(false);
    const [monto, setMonto] = useState(5000);

    const animacionColor = useRef(new Animated.Value(0)).current;
    const escalaCirculo = useRef(new Animated.Value(1)).current;

    const manejarPago = async () => {
        try {
            setEstadoActivo(true);

            Animated.parallel([
                Animated.timing(animacionColor, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }),
                Animated.spring(escalaCirculo, {
                    toValue: 1.4,
                    friction: 3,
                    tension: 100,
                    useNativeDriver: true,
                }),
            ]).start();

            const codigoPago = Math.floor(100000000 + Math.random() * 900000000); // 9 dígitos
            const codigoBarras = Array.from({ length: 48 }, () =>
                Math.random() > 0.5 ? '▌' : '▎'
            ).join('');

            const logoURL = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2021.svg'; // reemplazalo por tu URL

const html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          display: flex;
          justify-content: center;
        }
        .contenedor {
          border: 2px solid #333;
          padding: 30px;
          max-width: 600px;
          width: 100%;
        }
        h1 {
          text-align: center;
          font-size: 28px;
          margin-bottom: 30px;
        }
        p {
          font-size: 18px;
          margin: 10px 0;
        }
        .codigo {
          margin-top: 30px;
          font-size: 18px;
          word-break: break-word;
        }
        .barras {
          font-family: monospace;
          font-size: 20px;
          text-align: center;
          margin: 30px 0 10px;
          white-space: normal;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
      </style>
    </head>
    <body>
      <div class="contenedor">
        <img src="${logoURL}" alt="Logo" style="display:block; margin: 0 auto 20px; max-height: 80px;" />
        <h1>FACTURA DE PAGO</h1>
        <p><strong>Estado:</strong> ACTIVO</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Importe:</strong> $${(monto || 0).toLocaleString('es-AR')}</p>
        <p class="codigo"><strong>Código de Pago:</strong> ${codigoPago}</p>
        <div class="barras">${codigoBarras}</div>
        <p style="text-align:center; margin-top: 30px;">Gracias por su pago.</p>
      </div>
    </body>
  </html>
`;

            const { uri } = await Print.printToFileAsync({ html });
            await Sharing.shareAsync(uri);
        } catch (error) {
            console.error('Error al generar o compartir el PDF:', error);
        }
    };


    const colorTexto = animacionColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#c62828', '#2e7d32'],
    });

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>ESTADO</Text>
            <View style={styles.card}>
                <View style={styles.estadoRow}>
                    <Animated.View
                        style={[
                            styles.circulo,
                            {
                                backgroundColor: estadoActivo ? 'green' : 'red',
                                transform: [{ scale: escalaCirculo }],
                            },
                        ]}
                    />
                    <Animated.Text style={[styles.estadoTexto, { color: colorTexto }]}>
                        {estadoActivo ? 'ACTIVO' : 'IMPAGO'}
                    </Animated.Text>
                </View>
            </View>
            {!estadoActivo && (
                <Pressable
                    onPress={manejarPago}
                    style={({ pressed }) => [
                        styles.boton,
                        pressed && styles.botonPresionado,
                    ]}
                >
                    <Text style={styles.botonTexto}>PAGAR</Text>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3,
    },
    estadoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circulo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    estadoTexto: {
        fontSize: 24,
        fontWeight: '600',
    },
    boton: {
        backgroundColor: 'green',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    botonPresionado: {
        opacity: 0.7,
        transform: [{ scale: 0.96 }],
    },
    botonTexto: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EstadoSocio;