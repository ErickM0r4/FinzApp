import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Bienvenida() {
    const router = useRouter();

    const comenzar = () => {
        router.push('/(auth)/iniciar-sesion');
    };

    return (
        <View style={estilos.contenedor}>
            <StatusBar style="light" />

            <Image
                source={require('../../assets/images/money.png')}
                style={estilos.imagen}
                resizeMode="contain"
            />

            <Text style={estilos.titulo}>Toma el control de tus Finanzas</Text>
            <Text style={estilos.subtitulo}>
                Haga clic en el botón para empezar este nuevo hábito
            </Text>

            <TouchableOpacity style={estilos.boton} onPress={comenzar}>
                <Text style={estilos.textoBoton}>COMENZAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        padding: 30,
    },
    imagen: {
        width: 200,
        height: 200,
        marginBottom: 40,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitulo: {
        fontSize: 14,
        color: '#cccccc',
        textAlign: 'center',
        marginBottom: 30,
    },
    boton: {
        backgroundColor: '#9C27B0',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    textoBoton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
