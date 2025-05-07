# 🧾 `client-panel`

### Descripción
Este es el **panel de control del cliente** donde podrá gestionar su asistente NNIA, revisar interacciones, configurar opciones y visualizar métricas relevantes.

### Objetivo actual (2025-05-07)
- Desplegar correctamente este módulo en Vercel.
- Asegurar que el panel se conecta al backend ya desplegado en Railway.
- Limpiar rutas y componentes innecesarios del entorno anterior.
- Mostrar una interfaz funcional mínima para acceder e interactuar con NNIA.

### Funcionalidades actuales
- Sistema de autenticación con Supabase (login, registro, recuperación de contraseña).
- Base del dashboard funcionando con múltiples secciones:
  - Perfil y configuración
  - Integraciones
  - Mensajes y conversaciones
  - Soporte y facturación
  - Insights y métricas
  - Configuración de negocio
  - Roles y permisos
  - Onboarding
- Widget de NNIA integrado en el layout general.
- Sistema de rutas dinámicas por cliente (`/client-panel/[clientID]`).

### Estructura de rutas
- **Rutas públicas:**
  - `/login`
  - `/register`
  - `/forgot-password`
  - `/reset-password`
- **Rutas protegidas:**
  - `/client-panel/[clientID]/*` (todas las secciones del panel)
- **Middleware de autenticación:**
  - Redirección automática a login si no hay sesión
  - Redirección al panel si hay sesión activa

---

### No debe hacerse:
- Crear nuevas rutas de backend sin coordinación.
- Modificar la estructura del login sin revisar autenticación JWT ya implementada.
- Cambiar estilos compartidos sin aprobación.

### ⚠️ Restricción visual (Fase actual)

**No modificar diseño visual actual.**
Mantener:
- Componentes visuales existentes
- Estructura del layout
- Estilos, tamaños y distribución actuales

Una vez desplegado correctamente y conectadas todas las partes, se abrirá una fase exclusiva de pulido visual. Hasta entonces, no debe tocarse el diseño.

---

### Instrucciones para IA o colaboradores:
- Leer este documento antes de cualquier cambio.
- Si se agrega o modifica una funcionalidad, debe **anotarse en el historial con la fecha**.
- Siempre validar que los endpoints usados coincidan con el backend real (Railway).

---

### Historial de versiones

- [2025-05-07] Proyecto en fase de limpieza y preparación para despliegue. Login y base del dashboard funcional. NNIA integrado.
- [2025-05-07] Actualización de documentación: Se agregan detalles de autenticación y estructura de rutas. 