# 🔧 GUÍA - Ejecutar en Android Studio Emulator

## ✅ Pasos para Configurar Android Studio

### PASO 1: Verificar que Android Studio esté instalado
```bash
# Verifica que tienes Android Studio
# Windows: Busca "Android Studio" en inicio
```

---

### PASO 2: Crear o Abrir un Emulador

#### Opción A: Abrir Android Studio
1. Busca **Android Studio** en tu menú Inicio
2. Haz clic para abrir

#### Opción B: Desde Terminal (Línea de comandos)
```bash
# Si tienes Android Studio instalado en default
"C:\Program Files\Android\Android Studio\bin\studio64.exe"
```

---

### PASO 3: Crear un Emulador (si no tienes uno)

En Android Studio:
1. Ve a **AVD Manager** (esquina superior derecha)
2. O ve a: **Tools** → **Device Manager** → **Virtual**
3. Haz clic en **"Create Device"**
4. Selecciona un dispositivo (ej: **Pixel 5**)
5. Selecciona una imagen del sistema (ej: **Android 14**)
6. Completa la configuración
7. Haz clic en **"Finish"**

---

### PASO 4: Iniciar el Emulador

#### Opción A: Desde Android Studio
1. En **Device Manager**, busca tu emulador
2. Haz clic en el triángulo de **Play** ▶️
3. Espera a que cargue (~30-60 segundos)

#### Opción B: Desde Terminal
```bash
# Lista emuladores disponibles
emulator -list-avds

# Inicia un emulador (reemplaza "nombre" con tu emulador)
emulator -avd nombre_del_emulador
```

**Ejemplo:**
```bash
emulator -avd Pixel_5_API_34
```

---

### PASO 5: Verificar que el Emulador esté conectado

En **otra ventana de terminal**, ejecuta:
```bash
adb devices
```

**Deberías ver algo como:**
```
List of attached devices
emulator-5554           device
```

Si ves `emulator-5554 device` → ✅ **Está conectado**

---

### PASO 6: Ejecutar la App en el Emulador

En tu terminal del proyecto:
```bash
cd c:\Users\danue\Desktop\FinanzasPersonalesApp-main

# Opción 1: Comando directo
npm start

# Luego en el menú que aparece:
# Presiona: a  (para Android)
```

O:

```bash
# Opción 2: Comando específico para Android
npx expo start --android
```

---

## 🚨 Problemas Comunes

### ❌ "Emulator not found"
**Solución:**
```bash
# Verifica la ruta de Android SDK
echo %ANDROID_HOME%

# Si no está configurada, agrega a Variables de Entorno:
# ANDROID_HOME: C:\Users\[TuUsuario]\AppData\Local\Android\Sdk
# PATH: ...;%ANDROID_HOME%\emulator;%ANDROID_HOME%\platform-tools
```

Luego reinicia la terminal.

---

### ❌ "adb: command not found"
**Solución:**
```bash
# Agrega adb a tu PATH:
# Variable ANDROID_HOME debe estar configurada

# Alternativa: Usa la ruta completa
"C:\Users\[TuUsuario]\AppData\Local\Android\Sdk\platform-tools\adb" devices
```

---

### ❌ El emulador es muy lento
**Soluciones:**
1. Cierra otras aplicaciones
2. Aumenta RAM asignada al emulador:
   - Android Studio → Device Manager → ⚙️ (engranaje) → Editar
   - Aumenta **RAM** a 4GB o 6GB
   - Aumenta **VM Heap** a 512MB

3. Habilita aceleración de hardware:
   - Device Manager → ⚙️ → Ver detalles
   - Verifica que esté habilitado HAXM o Hyper-V

---

### ❌ El emulador no inicia
**Soluciones:**
1. Cierra todos los emuladores
2. Abre Device Manager
3. Haz clic en ⚙️ (Wipe Data)
4. Intenta nuevamente

---

## 📋 Checklist Rápido

- [ ] ¿Tienes Android Studio instalado?
- [ ] ¿Tienes un emulador creado?
- [ ] ¿El emulador está corriendo (ej: emulator-5554)?
- [ ] ¿`adb devices` muestra tu emulador?
- [ ] ¿Ejecutaste `npm start` o `npx expo start --android`?
- [ ] ¿Presionaste `a` para Android?

Si todo está verde ✅, tu app debería aparecer en el emulador!

---

## 🎯 Resumen Rápido

```bash
# Terminal 1: Inicia el emulador
emulator -avd Pixel_5_API_34

# Terminal 2: Verifica que esté conectado
adb devices

# Terminal 3: Corre la app (en tu carpeta del proyecto)
cd c:\Users\danue\Desktop\FinanzasPersonalesApp-main
npm start
# Presiona: a
```

---

## 💡 Tips

1. **Mantén el emulador abierto** mientras trabajas
2. **No cierres la terminal** de `npm start`
3. **Abre otra terminal** para otros comandos
4. **Si rompes algo**, ejecuta: `npm start` de nuevo

---

## 🔗 Referencias

- Android Studio: https://developer.android.com/studio
- Expo Android: https://docs.expo.dev/workflow/android-studio-emulator
- ADB Docs: https://developer.android.com/studio/command-line/adb

---

¿Necesitas ayuda con algún paso específico? 🤔
