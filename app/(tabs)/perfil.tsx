import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function Perfil() {
    const router = useRouter();
    const { usuario, cerrarSesion } = useAuth();

    const manejarCerrarSesion = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de que deseas cerrar sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Cerrar sesión',
                    style: 'destructive',
                    onPress: async () => {
                        await cerrarSesion();
                        router.replace('/');
                    },
                },
            ]
        );
    };

    return (

        <View style={estilos.contenedor}>
            <StatusBar style="light" />

            {/* Encabezado */}
            <Text style={estilos.titulo}>Perfil</Text>
            <FontAwesome name="user-circle" size={80} color="#ffffff" style={{ marginBottom: 10 }} />
            <Text style={estilos.nombre}>{usuario?.nombre} {usuario?.apellido}</Text>
            <Text style={estilos.correo}>{usuario?.correo}</Text>

            {/* Opciones */}
            <TouchableOpacity
                style={estilos.opcion}
                onPress={() => router.push('/(tabs)/editar-perfil')}
            >
                <View style={[estilos.icono, { backgroundColor: '#4caf50' }]}>
                    <Ionicons name="person" size={20} color="#fff" />
                </View>
                <Text style={estilos.textoOpcion}>Editar perfil</Text>
                <Entypo name="chevron-right" size={24} color="white" style={estilos.chevron} />
            </TouchableOpacity>

            <TouchableOpacity
                style={estilos.opcion}
                onPress={() => router.push('/(tabs)/configuracion')}
            >
                <View style={[estilos.icono, { backgroundColor: '#757575' }]}>
                    <Ionicons name="settings" size={20} color="#fff" />
                </View>
                <Text style={estilos.textoOpcion}>Configuración</Text>
                <Entypo name="chevron-right" size={24} color="white" style={estilos.chevron} />
            </TouchableOpacity>

            <TouchableOpacity
                style={estilos.opcion}
                onPress={() => router.push('/(tabs)/privacidad')}
            >
                <View style={[estilos.icono, { backgroundColor: '#3f51b5' }]}>
                    <MaterialCommunityIcons name="lock-outline" size={20} color="#fff" />
                </View>
                <Text style={estilos.textoOpcion}>Privacidad</Text>
                <Entypo name="chevron-right" size={24} color="white" style={estilos.chevron} />
            </TouchableOpacity>


            <TouchableOpacity
                style={estilos.opcion}
                onPress={() => router.push('/(tabs)/cerrar-sesion')}
            >
                <View style={[estilos.icono, { backgroundColor: '#f44336' }]}>
                    <MaterialCommunityIcons name="logout" size={20} color="#fff" />
                </View>
                <Text style={estilos.textoOpcion}>Cerrar sesión</Text>
                <Entypo name="chevron-right" size={24} color="white" style={estilos.chevron} />
            </TouchableOpacity>

        </View>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 100, // Margen para la barra de navegación
    },
    titulo: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    nombre: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    correo: {
        color: '#ccc',
        marginBottom: 30,
    },
    opcion: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 12,
        width: '100%',
    },
    icono: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textoOpcion: {
        color: '#fff',
        fontSize: 16,
        flex: 1,
    },
    chevron: {
        marginLeft: 10,
    },
});
