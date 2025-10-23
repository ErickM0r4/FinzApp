import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { GradientBackground } from '../../components/ui/GradientBackground';
import { GlassCard } from '../../components/ui/GlassCard';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { TextField } from '../../components/ui/TextField';
import { Colors } from '../../constants/Colors';
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
        <GradientBackground>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={estilos.keyboardAvoider}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <ScrollView
                    contentContainerStyle={estilos.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={estilos.contenedor}>
                        <GlassCard style={estilos.card}>
                            <View style={estilos.header}>
                                <View>
                                    <Text style={estilos.etiqueta}>Bienvenido de vuelta</Text>
                            <Text style={estilos.titulo}>Inicia sesión</Text>
                            <Text style={estilos.subtitulo}>Tu tablero financiero te espera con insights renovados.</Text>
                        </View>
                        <View style={estilos.iconWrapper}>
                            <Ionicons name="lock-closed" size={28} color={Colors.white} />
                        </View>
                    </View>

                    <TextField
                        label="Correo electrónico"
                        placeholder="ejemplo@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={correo}
                        onChangeText={setCorreo}
                    />
                    <TextField
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        secureTextEntry
                        value={contrasena}
                        onChangeText={setContrasena}
                    />

                    <TouchableOpacity onPress={() => Alert.alert('Recuperar contraseña', 'Pronto podrás restablecerla desde la aplicación.') }>
                        <Text style={estilos.olvido}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>

                    <PrimaryButton
                        label={cargando ? 'Iniciando...' : 'Iniciar sesión'}
                        onPress={manejarInicioSesion}
                        disabled={cargando}
                    />

                    <View style={estilos.footer}>
                        <Text style={estilos.footerText}>¿No tienes una cuenta?</Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/registro')}>
                            <Text style={estilos.link}>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>
                        </GlassCard>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </GradientBackground>
    );
}

const estilos = StyleSheet.create({
    keyboardAvoider: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    contenedor: {
        flex: 1,
        padding: 32,
        justifyContent: 'center',
        paddingBottom: 48,
    },
    card: {
        rowGap: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.textPrimary,
    },
    subtitulo: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 6,
        marginBottom: 18,
    },
    olvido: {
        color: Colors.textSecondary,
        textAlign: 'right',
        fontSize: 13,
        textDecorationLine: 'underline',
        marginBottom: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 8,
    },
    footerText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    link: {
        color: Colors.secondary,
        fontWeight: '600',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: 16,
    },
    etiqueta: {
        color: Colors.secondary,
        fontWeight: '600',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    iconWrapper: {
        backgroundColor: Colors.primary,
        borderRadius: 16,
        padding: 14,
        shadowColor: Colors.primary,
        shadowOpacity: 0.45,
        shadowOffset: { width: 0, height: 12 },
        shadowRadius: 20,
        elevation: 10,
    },
});
