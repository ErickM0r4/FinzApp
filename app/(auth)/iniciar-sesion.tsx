import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { iniciarSesion, Usuario } from '../../database';
import { useAuth } from '../../hooks/useAuth';

export default function IniciarSesion() {
    const router = useRouter();
    const { guardarSesion } = useAuth();

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [cargando, setCargando] = useState(false);

    const manejarInicioSesion = () => {
        console.log('Iniciando sesión con:', correo, contrasena);

        if (!correo || !contrasena) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }

        setCargando(true);

        // Iniciar sesión con SQLite
        iniciarSesion(correo, contrasena, async (exito: boolean, mensaje: string, usuario: Usuario | null) => {
            setCargando(false);
            
            if (exito && usuario) {
                console.log('Inicio de sesión exitoso');
                
                // Mostrar mensaje de bienvenida
                Alert.alert(
                    '¡Bienvenido!', 
                    `Hola ${usuario.nombre}!\n\nHas iniciado sesión correctamente.`, 
                    [
                        { 
                            text: 'Continuar', 
                            onPress: async () => {
                                // Guardar sesión del usuario
                                await guardarSesion({
                                    id: usuario.id,
                                    nombre: usuario.nombre,
                                    apellido: usuario.apellido,
                                    correo: usuario.correo
                                });
                                
                                // Redirigir a la app principal
                                router.replace('/(tabs)/inicio' as any);
                            },
                            style: 'default'
                        }
                    ]
                );
            } else {
                console.log('Error en inicio de sesión:', mensaje);
                Alert.alert('Error de Acceso', mensaje);
            }
        });
    };

    return (
        <View style={estilos.contenedor}>
            <StatusBar style="light" />

            <Text style={estilos.titulo}>Hola, Bienvenido</Text>
            <Text style={estilos.subtitulo}>Inicia sesión para gestionar tus finanzas ahora</Text>

            <TextInput
                placeholder="Ingrese su email"
                placeholderTextColor="#999"
                style={estilos.entrada}
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Ingrese su contraseña"
                placeholderTextColor="#999"
                style={estilos.entrada}
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry
            />

            <Text style={estilos.olvido}>¿Olvidó su Contraseña?</Text>

            <TouchableOpacity 
                style={[estilos.boton, cargando && estilos.botonDeshabilitado]} 
                onPress={manejarInicioSesion}
                disabled={cargando}
            >
                <Text style={estilos.textoBoton}>
                    {cargando ? 'Iniciando...' : 'Iniciar Sesión'}
                </Text>
            </TouchableOpacity>

            <Text style={estilos.mensaje}>
                ¿No tienes una cuenta?{' '}
                <Text style={estilos.link} onPress={() => router.push('/(auth)/registro')}>
                    ¡Regístrate!
                </Text>
            </Text>
        </View>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 30,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
    subtitulo: {
        fontSize: 14,
        color: '#cccccc',
        marginBottom: 30,
    },
    entrada: {
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
        fontSize: 16,
        color: '#ffffff',
    },
    olvido: {
        color: '#cccccc',
        textAlign: 'right',
        marginBottom: 25,
        fontSize: 13,
    },
    boton: {
        backgroundColor: '#9C27B0',
        paddingVertical: 14,
        borderRadius: 10,
        marginBottom: 25,
    },
    botonDeshabilitado: {
        backgroundColor: '#666666',
    },
    textoBoton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    mensaje: {
        textAlign: 'center',
        color: '#cccccc',
        fontSize: 14,
    },
    link: {
        color: '#E040FB',
        fontWeight: 'bold',
    },
});
