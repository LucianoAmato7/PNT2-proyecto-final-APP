import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Image } from 'react-native';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';

const data = [
    { posicion: 1, equipo: 'Equipo A', partidosJugados: 10, puntos: 25 },
    { posicion: 2, equipo: 'Equipo B', partidosJugados: 10, puntos: 22 },
    { posicion: 3, equipo: 'Equipo C', partidosJugados: 10, puntos: 18 },
    { posicion: 4, equipo: 'Equipo D', partidosJugados: 10, puntos: 15 },
];

const jugadores = [
    { numero: 1, apellido: 'González', minJugados: 90, setsEC: 3, setsAF: 2 },
    { numero: 2, apellido: 'Rodríguez', minJugados: 85, setsEC: 2, setsAF: 4 },
    { numero: 3, apellido: 'Martínez', minJugados: 80, setsEC: 1, setsAF: 3 },
    { numero: 4, apellido: 'Fernández', minJugados: 95, setsEC: 4, setsAF: 1 },
];

const jugadoresDetalles = [
    { minJugados: 90, hits: 15, catchs: 5, amarilla: 1, roja: 0 },
    { minJugados: 85, hits: 12, catchs: 3, amarilla: 0, roja: 1 },
    { minJugados: 80, hits: 10, catchs: 6, amarilla: 2, roja: 0 },
    { minJugados: 95, hits: 18, catchs: 4, amarilla: 0, roja: 0 },
];

export default function Estadistica() {
    const [vistaActiva, setVistaActiva] = useState('tablaGeneral');

    return (
        <View style={styles.container}>
            <View style={styles.containerTittle}>
                <Text style={styles.title}>Estadística</Text>
            </View>

            <View style={styles.containerNav}>
                <TouchableOpacity style={styles.containerButton} onPress={() => setVistaActiva('tablaGeneral')}>
                    <Text style={styles.buttonText}>Tabla General</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerButton} onPress={() => setVistaActiva('miEquipo')}>
                    <Text style={styles.buttonText}>Mi Equipo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerButton} onPress={() => setVistaActiva('jugador')}>
                    <Text style={styles.buttonText}>Jugador</Text>
                </TouchableOpacity>
            </View>


            {vistaActiva === 'tablaGeneral' && (
                <FlatList
                    ListHeaderComponent={() => (
                        <>
                            <Text style={styles.sectionTitle}>Tabla General</Text>
                            <View style={[styles.row, styles.header]}>
                                <View style={{ width: 10 }} />
                                <Text style={styles.headerCell}>Posición</Text>
                                <Text style={styles.headerCell}>Equipo</Text>
                                <Text style={styles.headerCell}>PJ</Text>
                                <Text style={styles.headerCell}>Puntos</Text>
                            </View>
                        </>
                    )}
                    data={data}
                    keyExtractor={(item) => item.posicion.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Image
                                source={require("./../../../assets/escudo.png")}
                                style={styles.icon}
                            />
                            <Text style={styles.cell}>{item.posicion}</Text>
                            <Text style={styles.cell}>{item.equipo}</Text>
                            <Text style={styles.cell}>{item.partidosJugados}</Text>
                            <Text style={styles.cell}>{item.puntos}</Text>
                        </View>
                    )}
                />
            )}


            {vistaActiva === 'miEquipo' && (
                <FlatList
                    ListHeaderComponent={() => (
                        <>
                            <Image source={require("./../../../assets/escudo.png")}  style={styles.image} />
                            <Text style={styles.sectionTitle}>Mi Equipo</Text>
                            <View style={[styles.row, styles.header]}>
                                <Text style={styles.headerCell}>Nº Jugador</Text>
                                <Text style={styles.headerCell}>Apellido</Text>
                                <Text style={styles.headerCell}>Min. Jugados</Text>
                                <Text style={styles.headerCell}>Sets e/c</Text>
                                <Text style={styles.headerCell}>Sets a/f</Text>
                            </View>
                        </>
                    )}
                    data={jugadores}
                    keyExtractor={(item) => item.numero.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text style={styles.cell}>{item.numero}</Text>
                            <Text style={styles.cell}>{item.apellido}</Text>
                            <Text style={styles.cell}>{item.minJugados}</Text>
                            <Text style={styles.cell}>{item.setsEC}</Text>
                            <Text style={styles.cell}>{item.setsAF}</Text>
                        </View>
                    )}
                />
            )}


            {vistaActiva === 'jugador' && (
                <FlatList
                    ListHeaderComponent={() => (
                        <>
                            <Image source={require("./../../../assets/escudo.png")} style={styles.image} />
                            <Text style={styles.sectionTitle}>Estadísticas de Jugador</Text>
                            <View style={[styles.row, styles.header]}>
                                <Text style={styles.headerCell}>Min. Jugados</Text>
                                <Text style={styles.headerCell}>Hits</Text>
                                <Text style={styles.headerCell}>Catchs</Text>
                                <Text style={styles.headerCell}>Amarilla</Text>
                                <Text style={styles.headerCell}>Roja</Text>
                            </View>
                        </>
                    )}
                    data={jugadoresDetalles}
                    keyExtractor={(item) => item.minJugados.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text style={styles.cell}>{item.minJugados}</Text>
                            <Text style={styles.cell}>{item.hits}</Text>
                            <Text style={styles.cell}>{item.catchs}</Text>
                            <Text style={styles.cell}>{item.amarilla}</Text>
                            <Text style={styles.cell}>{item.roja}</Text>
                        </View>
                    )}
                />
            )}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    containerTittle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    containerButton: {
        padding: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#0C00F4',
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
    },
    containerNav: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    tableContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    header: {
        backgroundColor: '#007bff',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 10,
        alignSelf: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 5,
        alignSelf: 'center',
        marginLeft: 3,
    },
});