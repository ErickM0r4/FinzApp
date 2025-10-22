import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useAuth } from '../../hooks/useAuth';

export default function TabLayout() {
  const { estaAutenticado, cargando } = useAuth();
  const router = useRouter();

  // Redirect to main screen if not authenticated
  useEffect(() => {
    console.log('TabLayout - Auth check:', { estaAutenticado, cargando });
    if (!cargando && !estaAutenticado) {
      console.log('Not authenticated in tabs, redirecting to main...');
      router.replace('/');
    }
  }, [estaAutenticado, cargando]);

  // Don't render tabs until authentication is checked
  if (cargando) {
    return null;
  }

  // Don't render tabs if not authenticated
  if (!estaAutenticado) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#1e1e1e',
          borderTopColor: '#333',
          ...Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        },
        tabBarActiveTintColor: '#9C27B0',
        tabBarInactiveTintColor: '#666',
      }}>
      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="billetera"
        options={{
          title: 'Billeteras',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="wallet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="estadisticas"
        options={{
          title: 'Estadísticas',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="stats-chart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="person" color={color} />,
        }}
      />

      {/* Páginas ocultas pero accesibles */}
      <Tabs.Screen
        name="configuracion"
        options={{
          href: null, // Oculta de la barra de navegación
        }}
      />
      <Tabs.Screen
        name="nueva-billetera"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="detalle-billetera"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="editar-billetera"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="nueva-transaccion"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="editar-transaccion"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="estadisticas-usuario"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="editar-perfil"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="privacidad"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="cerrar-sesion"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="buscar"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
