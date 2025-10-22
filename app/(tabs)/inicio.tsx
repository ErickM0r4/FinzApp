import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useFocusEffect, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Billetera, obtenerBilleteras, obtenerTransacciones, Transaccion } from '../../database';
import { useAuth } from '../../hooks/useAuth';

export default function Inicio() {
    const router = useRouter();
    const { usuario } = useAuth();
    const [billeteras, setBilleteras] = useState<Billetera[]>([]);
    const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
    const [cargando, setCargando] = useState(true);

    // No redirects needed here - authentication is handled at app level

    // Cargar billeteras del usuario
    useEffect(() => {
        if (usuario) {
            cargarDatos();
        }
    }, [usuario]);

    // Recargar datos cuando la pantalla esté en foco
    useFocusEffect(
        useCallback(() => {
            if (usuario) {
                cargarDatos();
            }
        }, [usuario])
    );

    const cargarDatos = () => {
        if (!usuario) return;
        
        setCargando(true);
        
        // Cargar billeteras
        obtenerBilleteras(usuario.id, (billeterasObtenidas: Billetera[]) => {
            setBilleteras(billeterasObtenidas);
        });
        
        // Cargar transacciones recientes
        obtenerTransacciones(usuario.id, (transaccionesObtenidas: Transaccion[]) => {
            setTransacciones(transaccionesObtenidas);
            setCargando(false);
        });
    };

    // Función para obtener el icono de categoría
    const obtenerIconoCategoria = (categoria: string) => {
        const iconos: { [key: string]: { icono: string; tipo: string; color: string } } = {
            'alimentos': { icono: 'fast-food', tipo: 'Ionicons', color: '#FF5722' },
            'transporte': { icono: 'car', tipo: 'FontAwesome5', color: '#2196F3' },
            'salud': { icono: 'heartbeat', tipo: 'FontAwesome5', color: '#F44336' },
            'educacion': { icono: 'school', tipo: 'MaterialIcons', color: '#9C27B0' },
            'entretenimiento': { icono: 'movie', tipo: 'MaterialIcons', color: '#FF9800' },
            'servicios': { icono: 'build', tipo: 'MaterialIcons', color: '#607D8B' },
            'compras': { icono: 'shopping-bag', tipo: 'FontAwesome5', color: '#E91E63' },
            'otros': { icono: 'ellipsis-horizontal', tipo: 'Ionicons', color: '#795548' }
        };
        return iconos[categoria] || iconos['otros'];
    };

    return (
        <View style={estilos.contenedor}>
            <StatusBar style="light" />

            {/* Encabezado */}
            <View style={estilos.encabezado}>
                <View>
                    <Text style={estilos.saludo}>
                        Hola, {usuario?.nombre || 'Usuario'}
                    </Text>
                    <Text style={estilos.subtituloSaludo}>Gestiona tus finanzas</Text>
                </View>
                <TouchableOpacity onPress={() => router.push('/(tabs)/buscar' as any)}>
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Panel principal consolidado */}
            <View style={estilos.panelPrincipal}>
                {/* Saldo total */}
                <View style={estilos.seccionSaldo}>
                    <View style={estilos.filaSaldo}>
                        <View>
                            <Text style={estilos.etiquetaSaldo}>Saldo total</Text>
                            {cargando ? (
                                <ActivityIndicator size="small" color="#9C27B0" style={{ marginVertical: 10 }} />
                            ) : (
                                <Text style={estilos.montoSaldo}>
                                    ${billeteras.reduce((total, billetera) => total + (billetera.saldo || 0), 0).toLocaleString()}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity 
                            style={estilos.botonCrear} 
                            onPress={() => router.push('/(tabs)/nueva-billetera' as any)}
                        >
                            <Ionicons name="add" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    
                    {!cargando && (
                        <Text style={estilos.infoBilleteras}>
                            {billeteras.length > 0 ? 
                                `${billeteras.length} billetera${billeteras.length !== 1 ? 's' : ''}` : 
                                'No tienes billeteras'
                            }
                        </Text>
                    )}
                </View>

                {/* Resumen de transacciones en la misma tarjeta */}
                {!cargando && transacciones.length > 0 && (
                    <View style={estilos.resumenTransacciones}>
                        <Text style={estilos.tituloResumen}>Actividad reciente</Text>
                        <View style={estilos.filaResumen}>
                            <View style={estilos.estadisticaResumen}>
                                <Text style={estilos.numeroResumen}>
                                    {transacciones.filter(t => t.tipo === 'ingreso').length}
                                </Text>
                                <Text style={estilos.etiquetaResumen}>Ingresos</Text>
                            </View>
                            <View style={estilos.estadisticaResumen}>
                                <Text style={estilos.numeroResumen}>
                                    {transacciones.filter(t => t.tipo === 'gasto').length}
                                </Text>
                                <Text style={estilos.etiquetaResumen}>Gastos</Text>
                            </View>
                            <View style={estilos.estadisticaResumen}>
                                <Text style={estilos.numeroResumen}>{transacciones.length}</Text>
                                <Text style={estilos.etiquetaResumen}>Total</Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>

            {/* Lista de transacciones - más compacta */}
            {!cargando && transacciones.length > 0 && (
                <View style={estilos.contenedorTransacciones}>
                    <View style={estilos.encabezadoTransacciones}>
                        <Text style={estilos.tituloSeccion}>Últimas transacciones</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/estadisticas' as any)}>
                            <Text style={estilos.verTodas}>Ver todas</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <FlatList
                        data={transacciones.slice(0, 5)}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        renderItem={({ item }) => {
                            const iconoInfo = obtenerIconoCategoria(item.categoria);
                            const fechaFormateada = new Date(item.fecha).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short'
                            });
                            
                            return (
                                <TouchableOpacity
                                    style={estilos.item}
                                    activeOpacity={0.6}
                                    onPress={() => {
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                        console.log('🔄 Navegando a editar transacción:', item.id);
                                        router.push({
                                            pathname: '/(tabs)/editar-transaccion' as any,
                                            params: {
                                                id: item.id.toString(),
                                                categoria: item.categoria,
                                                descripcion: item.descripcion,
                                                monto: item.monto.toString(),
                                                fecha: item.fecha,
                                                tipo: item.tipo,
                                                billeteraId: item.billetera_id?.toString() || '',
                                            },
                                        });
                                    }}
                                >
                                    <View style={[estilos.icono, { backgroundColor: iconoInfo.color }]}>
                                        {iconoInfo.tipo === 'FontAwesome5' && <FontAwesome5 name={iconoInfo.icono as any} size={16} color="white" />}
                                        {iconoInfo.tipo === 'MaterialIcons' && <MaterialIcons name={iconoInfo.icono as any} size={16} color="white" />}
                                        {iconoInfo.tipo === 'Ionicons' && <Ionicons name={iconoInfo.icono as any} size={16} color="white" />}
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={estilos.categoria}>{item.categoria.charAt(0).toUpperCase() + item.categoria.slice(1)}</Text>
                                        {item.descripcion && <Text style={estilos.descripcion} numberOfLines={1}>{item.descripcion}</Text>}
                                    </View>
                                    <View style={estilos.infoDerecha}>
                                        <Text style={[estilos.montoItem, { color: item.tipo === 'ingreso' ? '#4caf50' : '#f44336' }]}> 
                                            {item.tipo === 'ingreso' ? `+$${item.monto.toFixed(2)}` : `-$${item.monto.toFixed(2)}`}
                                        </Text>
                                        <Text style={estilos.fecha}>{fechaFormateada}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            )}

            {/* Estado vacío cuando no hay transacciones */}
            {!cargando && transacciones.length === 0 && (
                <View style={estilos.estadoVacio}>
                    <Ionicons name="receipt-outline" size={48} color="#666" />
                    <Text style={estilos.textoVacio}>No hay transacciones</Text>
                    <Text style={estilos.subtextoVacio}>Toca el botón + para agregar tu primera transacción</Text>
                </View>
            )}

            {/* Estado de carga */}
            {cargando && (
                <View style={estilos.contenedorCargando}>
                    <ActivityIndicator size="large" color="#9C27B0" />
                    <Text style={estilos.textoCargando}>Cargando datos...</Text>
                </View>
            )}

            {/* Botón flotante */}
            <TouchableOpacity
                style={estilos.botonFlotante}
                onPress={() => router.push('/(tabs)/nueva-transaccion' as any)}
            >
                <Ionicons name="add" size={28} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        paddingTop: 50,
        paddingBottom: 140, // Increased padding to prevent navigation bar overlap
    },
    encabezado: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    saludo: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    subtituloSaludo: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 4,
    },
    // Panel principal consolidado
    panelPrincipal: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    seccionSaldo: {
        marginBottom: 20,
    },
    filaSaldo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    etiquetaSaldo: {
        fontSize: 14,
        color: '#ccc',
        marginBottom: 8,
    },
    montoSaldo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    botonCrear: {
        backgroundColor: '#9C27B0',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoBilleteras: {
        fontSize: 12,
        color: '#999',
    },
    // Resumen de transacciones dentro del panel principal
    resumenTransacciones: {
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#2a2a2a',
    },
    tituloResumen: {
        fontSize: 16,
        color: '#9C27B0',
        fontWeight: '600',
        marginBottom: 12,
    },
    filaResumen: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    estadisticaResumen: {
        alignItems: 'center',
    },
    numeroResumen: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    etiquetaResumen: {
        fontSize: 12,
        color: '#ccc',
        marginTop: 4,
    },
    // Lista de transacciones
    contenedorTransacciones: {
        flex: 1,
    },
    encabezadoTransacciones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    tituloSeccion: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    verTodas: {
        fontSize: 14,
        color: '#9C27B0',
        fontWeight: '600',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        minHeight: 64, // Ensure minimum touch area
        // Add visual feedback for better UX
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    icono: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoria: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
    descripcion: {
        color: '#aaa',
        fontSize: 13,
        marginTop: 2,
    },
    infoDerecha: {
        alignItems: 'flex-end',
    },
    montoItem: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    fecha: {
        fontSize: 12,
        color: '#ccc',
        marginTop: 2,
    },
    // Estados
    contenedorCargando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    textoCargando: {
        color: '#ccc',
        marginTop: 10,
        fontSize: 14,
    },
    estadoVacio: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    textoVacio: {
        color: '#ccc',
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: '600',
    },
    subtextoVacio: {
        color: '#999',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
    // Botón flotante
    botonFlotante: {
        position: 'absolute',
        bottom: 140, // Moved higher to avoid navigation bar
        right: 30,
        backgroundColor: '#9C27B0',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#9C27B0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
});
