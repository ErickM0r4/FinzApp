# AppGastos

Aplicación móvil para el control de gastos personales y administración de múltiples billeteras, desarrollada con Expo y React Native.

---

## Descripción General
AppGastos permite a los usuarios registrar, visualizar y analizar sus gastos e ingresos de manera intuitiva, con soporte para múltiples billeteras (efectivo, banco, etc.), estadísticas visuales y una experiencia moderna y responsiva.

---

## Tecnologías Utilizadas
- **React Native** (Expo SDK 53+)
- **TypeScript**
- **expo-router** (Navegación)
- **expo-sqlite/legacy** (Base de datos local persistente)
- **@react-native-picker/picker** (Selector de billetera)
- **react-native-chart-kit** (Gráficas y estadísticas)
- **@expo/vector-icons** (Iconografía)
- **React Native Paper** (opcional, para UI)

---

## Estructura del Proyecto
- `app/` Pantallas principales y navegación
- `components/` Componentes reutilizables
- `database/` Lógica de base de datos multiplataforma (SQLite)
- `hooks/` Custom hooks (autenticación, temas, etc.)
- `assets/` Imágenes y fuentes

---

## Funcionalidades Principales
- **Multi-billetera:** Crea y administra varias billeteras independientes
- **Transacciones:** Registra ingresos y gastos con categoría, monto, fecha y descripción
- **Estadísticas:** Visualiza gráficos de gastos/ingresos por billetera o globales
- **Edición y eliminación:** Modifica o elimina transacciones y billeteras fácilmente
- **Feedback visual y háptico:** Animaciones y vibración para mejor experiencia
- **Filtros avanzados:** Filtra por billetera, tipo de transacción y fecha
- **Manejo de errores:** Mensajes claros y estados de carga amigables
- **Sin backend:** Todos los datos se almacenan localmente en el dispositivo

---

## Instalación y Ejecución
1. Clona el repositorio
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia el proyecto:
   ```bash
   npm start
   ```
4. Escanea el QR con Expo Go o ejecuta en emulador Android/iOS

---

## Estructura de Base de Datos (SQLite)
- **Tablas:**
  - `billeteras` (id, nombre, saldo, color, fecha_creacion)
  - `transacciones` (id, billetera_id, tipo, categoria, monto, descripcion, fecha)
- **Consultas principales:**
  - Obtener todas las transacciones de usuario
  - Filtrar transacciones por billetera
  - Estadísticas por categoría y fecha

---

## Autenticación
- Simulada/local (puede integrarse con backend si se requiere)
- Hook `useAuth` para gestión de usuario

---

## Buenas Prácticas y Detalles Técnicos
- Código modular y reutilizable
- Manejo de estados con hooks y callbacks
- Navegación optimizada con expo-router
- UI responsiva y accesible
- Feedback visual/háptico en acciones clave
- Sin dependencias innecesarias ni scripts de ejemplo

---

## Ejemplo de Uso
1. Crea una billetera (ej: "Efectivo")
2. Agrega ingresos y gastos con categoría
3. Visualiza estadísticas y gráficos filtrando por billetera
4. Edita o elimina transacciones según necesidad

---

## Créditos y Autoría
- Desarrollado por: Marco Campos, Erick Mora y Alejandro Aguilar
- Profesor: Francisco Cervantes
- Fecha: Junio 2025

---

## Notas Finales
- Compatible con Expo Go y emuladores Android/iOS
- No requiere conexión a internet
- Código limpio, comentado y fácil de mantener
- ¡Ideal para proyectos escolares y personales!

---

¡Gracias por revisar el proyecto!
