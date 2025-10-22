import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { registrarUsuario } from '../../database';

export default function Registro() {
    const router = useRouter();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [cargando, setCargando] = useState(false);

    const manejarRegistro = () => {
        console.log('Registrando:', nombre, apellido, correo, contrasenia, confirmar);

        if (!nombre || !apellido || !correo || !contrasenia || !confirmar) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }

        if (contrasenia !== confirmar) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        if (contrasenia.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        // Validar formato de correo básico
        // Esta expresión regular valida si un string tiene formato de correo electrónico.
        // Detalle del patrón:
        // ^         => Inicio del texto
        // [^\s@]+   => Uno o más caracteres que NO sean espacios ni arrobas (parte del nombre del correo)
        // @         => Debe haber una arroba
        // [^\s@]+   => Uno o más caracteres que NO sean espacios ni arrobas (parte del dominio)
        // \.        => Un punto literal (ej. el punto de ".com")
        // [^\s@]+   => Uno o más caracteres que NO sean espacios ni arrobas (ej. "com", "org")
        // $         => Fin del texto
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            Alert.alert('Error', 'Por favor ingresa un correo válido.');
            return;
        }

        setCargando(true);

        // Registrar usuario en SQLite
        registrarUsuario(nombre, apellido, correo, contrasenia, (exito: boolean, mensaje: string) => {
            setCargando(false);
            
            if (exito) {
                console.log('Registro exitoso');
                // Mostrar mensaje de éxito más visible
                Alert.alert(
                    '🎉 ¡Registro Exitoso!', 
                    'Tu cuenta ha sido creada correctamente.\n\nYa puedes iniciar sesión con tus credenciales.', 
                    [
                        { 
                            text: 'Continuar', 
                            onPress: () => router.replace('/(auth)/iniciar-sesion' as any),
                            style: 'default'
                        }
                    ]
                );
            } else {
                console.log('Error en registro:', mensaje);
                Alert.alert('Error en Registro', mensaje);
            }
        });
    };

    return (
        <View style={estilos.contenedor}>
            <StatusBar style="light" />

            <Text style={estilos.titulo}>Regístrate</Text>
            <Text style={estilos.subtitulo}>Crea tu cuenta para comenzar</Text>

            <TextInput
                placeholder="Ingrese su nombre"
                placeholderTextColor="#999"
                style={estilos.entrada}
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                placeholder="Ingrese su apellido"
                placeholderTextColor="#999"
                style={estilos.entrada}
                value={apellido}
                onChangeText={setApellido}
            />
            <TextInput
                placeholder="Ingrese su correo"
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
                value={contrasenia}
                onChangeText={setContrasenia}
                secureTextEntry
            />
            <TextInput
                placeholder="Verifique su contraseña"
                placeholderTextColor="#999"
                style={estilos.entrada}
                value={confirmar}
                onChangeText={setConfirmar}
                secureTextEntry
            />

            <TouchableOpacity 
                style={[estilos.boton, cargando && estilos.botonDeshabilitado]} 
                onPress={manejarRegistro}
                disabled={cargando}
            >
                <Text style={estilos.textoBoton}>
                    {cargando ? 'Registrando...' : 'Registrarse'}
                </Text>
            </TouchableOpacity>

            <Text style={estilos.mensaje}>
                Ya tienes una cuenta?{' '}
                <Text style={estilos.link} onPress={() => router.push('/(auth)/iniciar-sesion')}>
                    ¡Inicia Sesión!
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
