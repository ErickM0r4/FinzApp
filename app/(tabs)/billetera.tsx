import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Billetera, obtenerBilleteras } from '../../database';
import { useAuth } from '../../hooks/useAuth';

export default function BilleteraScreen() {
    const router = useRouter();
    const { usuario } = useAuth();
    const [billeteras, setBilleteras] = useState<Billetera[]>([]);
    const [cargando, setCargando] = useState(true);
    const [balanceTotal, setBalanceTotal] = useState(0);

    useEffect(() => {
        if (usuario) {
            cargarBilleteras();
        }
    }, [usuario]);

    // Refrescar datos cuando la pantalla recibe foco
    useFocusEffect(
        useCallback(() => {
            if (usuario) {
                cargarBilleteras();
            }
        }, [usuario])
    );

    const cargarBilleteras = () => {
        if (!usuario) return;
        
        obtenerBilleteras(usuario.id, (billeterasObtenidas: Billetera[]) => {
            setBilleteras(billeterasObtenidas);
            
            // Calcular balance total
            const total = billeterasObtenidas.reduce((sum: number, billetera: Billetera) => sum + billetera.saldo, 0);
            setBalanceTotal(total);
            
            setCargando(false);
        });
    };

    if (cargando) {
        return (
            <View style={[estilos.contenedor, estilos.contenedorCargando]}>
                <StatusBar style="light" />
                <ActivityIndicator size="large" color="#9C27B0" />
                <Text style={estilos.textoCargando}>Cargando billeteras...</Text>
            </View>
        );
    }

    return (
        <View style={estilos.contenedor}>
            <StatusBar style="light" />
            <Text style={estilos.balance}>${balanceTotal.toLocaleString()}</Text>
            <Text style={estilos.subtitulo}>balance total</Text>

            <View style={estilos.contenedorCarteras}>
                <View style={estilos.headerCarteras}>
                    <Text style={estilos.titulo}>Mis Carteras</Text>
                    <TouchableOpacity
                        style={estilos.botonAgregar}
                        onPress={() => router.push('/(tabs)/nueva-billetera')}
                    >
                        <Ionicons name="add" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                {billeteras.length > 0 ? (
                    billeteras.map((billetera) => (
                        <TouchableOpacity
                            key={billetera.id}
                            style={estilos.item}
                            onPress={() =>
                                router.push({
                                    pathname: '/(tabs)/detalle-billetera',
                                    params: {
                                        id: billetera.id.toString(),
                                        nombre: billetera.nombre,
                                        monto: billetera.saldo.toString(),
                                    },
                                })
                            }
                        >
                            <Image
                                source={require('../../assets/images/money.png')}
                                style={estilos.icono}
                            />
                            <View style={estilos.info}>
                                <Text style={estilos.nombre}>{billetera.nombre}</Text>
                                <Text style={estilos.monto}>${billetera.saldo.toLocaleString()}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color="white" />
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={estilos.sinBilleteras}>
                        <Text style={estilos.textoSinBilleteras}>No tienes billeteras creadas</Text>
                        <Text style={estilos.subtextoSinBilleteras}>Crea tu primera billetera para comenzar</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 100, // Margen para la barra de navegación
    },
    contenedorCargando: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoCargando: {
        color: '#ccc',
        marginTop: 10,
        fontSize: 16,
    },
    balance: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    subtitulo: {
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 30,
    },
    contenedorCarteras: {
        backgroundColor: '#1e1e1e',
        borderRadius: 20,
        padding: 20,
        flex: 1,
    },
    headerCarteras: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    titulo: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    icono: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    nombre: {
        color: 'white',
        fontWeight: 'bold',
    },
    monto: {
        color: '#ccc',
    },
    botonAgregar: {
        backgroundColor: '#9C27B0',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sinBilleteras: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    textoSinBilleteras: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtextoSinBilleteras: {
        color: '#ccc',
        fontSize: 14,
        textAlign: 'center',
    },
});
