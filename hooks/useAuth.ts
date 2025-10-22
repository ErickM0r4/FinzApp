import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
}

export const useAuth = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  // Verificar si hay una sesión guardada al iniciar
  useEffect(() => {
    verificarSesion();
  }, []);

  const verificarSesion = async () => {
    try {
      const sesionGuardada = await AsyncStorage.getItem('sesion_usuario');
      if (sesionGuardada) {
        const usuario = JSON.parse(sesionGuardada);
        setUsuario(usuario);
      }
    } catch (error) {
      console.error('Error al verificar sesión:', error);
    } finally {
      setCargando(false);
    }
  };

  const guardarSesion = async (usuario: Usuario) => {
    try {
      await AsyncStorage.setItem('sesion_usuario', JSON.stringify(usuario));
      setUsuario(usuario);
    } catch (error) {
      console.error('Error al guardar sesión:', error);
    }
  };

  const cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem('sesion_usuario');
      setUsuario(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return {
    usuario,
    cargando,
    guardarSesion,
    cerrarSesion,
    estaAutenticado: !!usuario
  };
};
