# NIA - Asistente Virtual Inteligente

NIA es un asistente virtual avanzado diseñado para automatizar tareas en negocios digitales.

## Estructura del Proyecto

```
NIA/
├── backend/              # Backend de la aplicación
│   ├── api/             # Endpoints de la API
│   ├── services/        # Servicios de negocio
│   ├── models/          # Modelos de datos
│   ├── ai_engine/       # Motor de IA
│   └── utils/           # Utilidades
│
├── frontend/            # Frontend de la aplicación
│   ├── chat-widget/     # Widget de chat para sitios web
│   ├── client-panel/    # Panel de control para clientes
│   └── admin-panel/     # Panel de administración
│
├── docs/                # Documentación
└── tests/               # Pruebas
```

## Componentes

### Backend
- API RESTful para comunicación con el frontend
- Motor de IA para procesamiento de lenguaje natural
- Servicios de negocio para automatización de tareas
- Integración con OpenAI y otras APIs

### Frontend
- **Widget de Chat**: Componente embebible en cualquier sitio web
- **Panel de Cliente**: Interfaz para gestionar conversaciones y configuraciones
- **Panel de Admin**: Herramientas de administración y análisis

## Instalación

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend
```bash
cd frontend/chat-widget
npm install
npm start
```

## Despliegue

- Backend: Desplegado en Railway
- Frontend: Desplegado en Vercel

## Integración del Widget

Para integrar el widget de chat en tu sitio web:

```html
<!-- En el <head> -->
<link rel="stylesheet" href="https://nia-alvaros-projects-6b18c4d2.vercel.app/nia-style.css">

<!-- Al final del <body> -->
<script src="https://nia-alvaros-projects-6b18c4d2.vercel.app/nia-chat.js"></script>
```

## Licencia

MIT 