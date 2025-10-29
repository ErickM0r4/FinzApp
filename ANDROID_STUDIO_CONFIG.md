Este archivo fue movido a `docs_backup/ANDROID_STUDIO_CONFIG.md`.
Consulta la carpeta `docs_backup/` para ver la documentación completa y los archivos originales.
### ✨ RESULTADO FINAL

Tu app **Mora Finance** debería aparecer en el emulador en 10-20 segundos 🎉

---

## 🔧 TROUBLESHOOTING

### ❌ "adb: command not found"

**Causa:** Las herramientas de Android no están en tu PATH

**Solución:**
1. Abre: **Sistema** (Configuración)
2. Busca: **"Variables de entorno"**
3. Haz clic: **"Editar variables de entorno del sistema"**
4. Haz clic: **"Variables de entorno"** (abajo)
5. En la sección **"Variables del sistema"**, busca: **Path**
6. Haz clic: **Editar**
7. Haz clic: **Nuevo**
8. Agrega: `C:\Users\[TuUsuario]\AppData\Local\Android\Sdk\platform-tools`
9. Haz clic: **OK** en todas las ventanas
10. **Reinicia PowerShell**

Verifica:
```bash
adb devices
# Debería funcionar ahora
```

---

### ❌ "No emulators found"

**Causa:** No creaste ningún emulador

**Solución:**
1. Abre Android Studio
2. Ve a Device Manager
3. Haz clic **Create Device**
4. Sigue PASO 3 de arriba

---

### ❌ Emulador no inicia

**Prueba estas soluciones:**

1. **Cierra y vuelve a abrir:**
   - Device Manager → Haz clic en ⚙️ (gear)
   - Selecciona: **Wipe Data**
   - Vuelve a hacer clic en Play ▶️

2. **Aumenta RAM:**
   - Device Manager → Haz clic en ⚙️
   - Aumenta **Memory** a 4GB o 6GB
   - Aplica cambios
   - Vuelve a lanzar

3. **Cierra otros emuladores:**
   - Es posible que tengas otro corriendo
   - Device Manager → Busca todos los que están "On"
   - Ciérralos todos
   - Lanza solo UNO

---

### ❌ Emulador muy lento

**Soluciones:**

1. **Más RAM:**
   - Device Manager → ⚙️ → Aumenta a 6GB-8GB

2. **Más CPU cores:**
   - Device Manager → ⚙️ → Aumenta CPU cores

3. **Menos apps abiertas:**
   - Cierra Chrome, VS Code, etc.
   - Usa solo PowerShell + Android Studio

4. **Habilita aceleración:**
   - Device Manager → ⚙️ → Verifica HAXM/Hyper-V habilitado

---

### ❌ "Device not responding"

Desconexión temporal:

```bash
# Desconecta
adb disconnect

# Reconecta
adb devices

# Si sigue sin funcionar:
# Cierra el emulador
# Abre de nuevo
```

---

### ❌ La app no aparece en el emulador

1. **Verifica que presionaste `a`:**
   - En el terminal de `npm start`
   - Presiona `a` (no "Android", solo `a`)
   - Luego Enter

2. **Verifica que adb ve el emulador:**
   ```bash
   adb devices
   # Debería mostrar emulator-5554
   ```

3. **Reinicia todo:**
   - Cierra `npm start` (Ctrl+C)
   - Cierra el emulador
   - Vuelve a abrirlo
   - Ejecuta `npm start` de nuevo
   - Presiona `a`

---

## 📋 CHECKLIST FINAL

Antes de ejecutar tu app:

- [ ] ¿Android Studio está instalado?
- [ ] ¿Tienes al menos 1 emulador creado?
- [ ] ¿El emulador está corriendo (ves el homescreen)?
- [ ] ¿`adb devices` muestra `emulator-5554 device`?
- [ ] ¿Tu proyecto está en: `C:\Users\danue\Desktop\FinanzasPersonalesApp-main`?
- [ ] ¿Ejecutaste `npm start`?
- [ ] ¿Presionaste `a` en el menú de Expo?

Si todos los checkboxes están ✅, tu app debería aparecer en 10-20 segundos.

---

## 🚀 FLUJO COMPLETO (Resumen)

```
1. Android Studio abierto
                ↓
2. Device Manager → Device corriendo ▶️
                ↓
3. `adb devices` → Muestra emulator-5554
                ↓
4. `npm start`
                ↓
5. Presiona: a
                ↓
6. 🎉 ¡Tu app en el emulador!
```

---

## 💡 TIPS

1. **Mantén el emulador abierto** mientras trabajas
2. **No cierres la terminal** de `npm start`
3. **Abre otra terminal** para otros comandos
4. **Si cierras todo**, vuelve a hacer: emulador → npm start → a

---

## 🔗 REFERENCIAS

- [Android Studio Official](https://developer.android.com/studio)
- [Expo + Android Studio](https://docs.expo.dev/workflow/android-studio-emulator/)
- [ADB Documentation](https://developer.android.com/studio/command-line/adb)

---

## ❓ ¿Aún tienes problemas?

Tries:
1. Lee este documento de nuevo (especialmente el Troubleshooting)
2. Ejecuta el script: `.\setup-android-emulator.ps1`
3. Revisa ANDROID_SETUP.md

¡Siempre hay una solución! 💪
