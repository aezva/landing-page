# 🧠 `NNIA` – Documentación del Proyecto

### Descripción general
NNIA (Next-level Neural Intelligent Assistant) es una plataforma de IA autónoma enfocada inicialmente en **ventas y atención al cliente**. Su objetivo es ofrecer un asistente inteligente que se integra en webs y plataformas para conversar con clientes, resolver dudas, ofrecer productos y cerrar ventas, de forma automatizada y eficiente.

El proyecto está dividido en tres pilares:
1. **Backend** (FastAPI + Supabase) – Lógica, control, base de datos y conexión con la IA.
2. **Frontend** (Next.js) – Landing page, panel del cliente, y widget.
3. **Widget** – Módulo reutilizable que se integra en sitios externos del cliente.

### Objetivo actual (2025-05-07)
- Desplegar el **client-panel** funcionalmente en Vercel.
- Limpiar y organizar todos los módulos para asegurar su conexión y funcionalidad mínima.
- Probar que NNIA responde correctamente en el widget del panel del cliente.
- Establecer documentación modular por carpeta para evitar errores y repeticiones por parte de herramientas como Cursor.

### No debe hacerse en esta fase:
- Expandir funcionalidades fuera de ventas y atención al cliente.
- Incluir nuevas tecnologías sin planificación.
- Modificar estructuras internas sin actualizar esta documentación y las locales de cada carpeta.

---

### 🧩 Estructura actual

nia/
├── backend/ # API y lógica del asistente
│   ├── ai/ # Motor de IA y procesamiento
│   ├── core/ # Configuración y utilidades
│   ├── migrations/ # Migraciones de base de datos
│   ├── repositories/ # Acceso a datos
│   ├── schemas/ # Modelos y validaciones
│   └── middleware/ # Middleware de la API
├── frontend/
│   ├── client-panel/ # Panel del cliente (Next.js)
│   ├── landing-page/ # Web de presentación (Next.js)
│   ├── nnia_chat_widget/ # Widget de conversación (Vite)
│   └── shared/ # Componentes compartidos
├── docs/ # Documentación del proyecto
├── requirements.txt # Dependencias Python
├── pyproject.toml # Configuración Poetry
├── docker-compose.yml # Configuración Docker
├── railway.toml # Configuración Railway
└── .gitignore

### Tecnologías principales
- **Backend:**
  - FastAPI (API REST)
  - Supabase (Base de datos y autenticación)
  - SQLAlchemy (ORM)
  - Alembic (Migraciones)
- **Frontend:**
  - Next.js 14 (Panel y Landing)
  - Vite (Widget)
  - Tailwind CSS (Estilos)
  - TypeScript
- **DevOps:**
  - Docker
  - Railway (Backend)
  - Vercel (Frontend)
  - GitHub Actions (CI/CD)

---

### Instrucciones para cualquier IA o desarrollador:
- **Este documento debe leerse antes de tocar cualquier parte del proyecto.**
- Cursor y cualquier IA debe revisar este archivo y los `__doc__.md` locales antes de ejecutar cambios.
- Cada cambio relevante debe anotarse en el historial.

---

### 🕒 Historial de versiones

- [2025-05-07] Reestructuración general. Se define NNIA como asistente de ventas y atención al cliente. Se inicia limpieza y conexión de módulos con foco en el panel del cliente.
- [2025-05-07] Actualización de documentación: Se detalla la estructura actual del proyecto y tecnologías utilizadas.

### 📋 Análisis de Prioridades (2025-05-07)

#### Enfoque actual para el client-panel
- **Prioridad Alta:**
  - Sistema de autenticación y login
  - Dashboard base funcional
  - Integración del widget de NNIA
  - Rutas esenciales (profile, messages, conversations, settings)

- **Prioridad Media:**
  - Sistema de facturación
  - Panel de soporte
  - Insights y métricas
  - Configuración de negocio

- **Prioridad Baja:**
  - Roles y permisos avanzados
  - Onboarding personalizado
  - Middleware adicional
  - Sistema de traducciones

#### Notas importantes
- La landing page ya está desplegada y funcional, no requiere modificaciones en esta fase
- Mantener la estructura actual del proyecto, solo enfocarse en la funcionalidad del client-panel
- No eliminar ni modificar componentes existentes, solo priorizar su desarrollo
- Documentar cualquier cambio o avance en el historial de versiones 