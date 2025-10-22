import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { useAuth } from '../hooks/useAuth';

export default function WelcomeScreen() {
  const router = useRouter();
  const { estaAutenticado, cargando } = useAuth();  // Redirigir automáticamente si el usuario ya está autenticado
  useEffect(() => {
    console.log('🔄 Index.tsx - Auth check:', { estaAutenticado, cargando });
    if (!cargando) {
      if (estaAutenticado) {
        console.log('✅ User is authenticated, redirecting to tabs...');
        // Small delay to ensure the session is properly set
        setTimeout(() => {
          router.replace('/(tabs)/inicio');
        }, 100);
      } else {
        console.log('❌ User not authenticated, staying on welcome screen');
      }
    }
  }, [estaAutenticado, cargando]);

  if (cargando) {
    return null; // El loading se maneja en _layout.tsx
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/money.png')} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(auth)/iniciar-sesion')}>
        <Text style={styles.buttonText}>COMENZAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});