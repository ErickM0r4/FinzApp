import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { actualizarUsuario, Usuario } from '../../database';
import { useAuth } from '../../hooks/useAuth';

export default function EditarPerfil() {
    const router = useRouter();
    const { usuario, guardarSesion } = useAuth();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cargando, setCargando] = useState(false);

    // Cargar datos del usuario al inicio
    useEffect(() => {
        if (usuario) {
            setNombre(usuario.nombre || '');
            setApellido(usuario.apellido || '');
        }
    }, [usuario]);

    const actualizarPerfil = () => {
        if (!nombre.trim() || !apellido.trim()) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }

        if (!usuario) {
            Alert.alert('Error', 'No se pudo cargar la información del usuario.');
            return;
        }

        // Verificar si hay cambios
        if (nombre.trim() === usuario.nombre && apellido.trim() === usuario.apellido) {
            Alert.alert('Info', 'No hay cambios para guardar.');
            return;
        }

        setCargando(true);

        actualizarUsuario(usuario.id, nombre.trim(), apellido.trim(), async (exito: boolean, mensaje: string, usuarioActualizado?: Usuario) => {
            setCargando(false);
            
            if (exito && usuarioActualizado) {
                // Actualizar la sesión con los nuevos datos
                await guardarSesion(usuarioActualizado);
                Alert.alert('Éxito', mensaje, [
                    { text: 'OK', onPress: () => router.back() }
                ]);
            } else {
                Alert.alert('Error', mensaje);
            }
        });
    };

    return (
        <View style={estilos.contenedor}>
            <StatusBar style="light" />
            <TouchableOpacity onPress={() => router.back()} style={estilos.retroceso}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <Text style={estilos.titulo}>Actualizar Perfil</Text>

            <View style={estilos.iconoPerfilContainer}>
                <FontAwesome name="user-circle" size={100} color="white" />
                <TouchableOpacity style={estilos.editarIcono}>
                    <Ionicons name="create" size={20} color="#121212" />
                </TouchableOpacity>
            </View>

            <Text style={estilos.etiqueta}>Nombre</Text>
            <TextInput
                placeholder="Nombre..."
                placeholderTextColor="#aaa"
                style={estilos.input}
                value={nombre}
                onChangeText={setNombre}
                editable={!cargando}
            />

            <Text style={estilos.etiqueta}>Apellido</Text>
            <TextInput
                placeholder="Apellido..."
                placeholderTextColor="#aaa"
                style={estilos.input}
                value={apellido}
                onChangeText={setApellido}
                editable={!cargando}
            />

            <TouchableOpacity 
                style={[estilos.boton, cargando && { opacity: 0.6 }]} 
                onPress={actualizarPerfil}
                disabled={cargando}
            >
                {cargando ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={estilos.textoBoton}>Actualizar Perfil</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        paddingTop: Platform.OS === 'android' ? 50 : 60,
    },
    retroceso: {
        marginBottom: 10,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
    },
    iconoPerfilContainer: {
        alignSelf: 'center',
        position: 'relative',
        marginBottom: 30,
    },
    editarIcono: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 4,
    },
    etiqueta: {
        color: '#ccc',
        marginBottom: 5,
        fontSize: 14,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    boton: {
        backgroundColor: '#9C27B0',
        borderRadius: 10,
        paddingVertical: 14,
        marginTop: 20,
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});
