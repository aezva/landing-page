# NIA - Asistente de IA para Negocios

NIA es un asistente de IA avanzado diseñado para ayudar a negocios en tareas de ventas y atención al cliente.

## Estructura del Proyecto

```
NIA/
├── backend/              # Backend del proyecto
│   ├── api/             # API principal
│   ├── ai_engine/       # Motor de IA
│   ├── models/          # Modelos de datos
│   ├── services/        # Servicios de negocio
│   └── utils/           # Utilidades
├── frontend/            # Frontend del proyecto
│   ├── client-panel/    # Panel de cliente
│   ├── admin-panel/     # Panel de administración
│   └── chat-widget/     # Widget de chat
├── docs/                # Documentación
└── tests/               # Tests
```

## Requisitos

- Python 3.10+
- Node.js (para el frontend)
- OpenAI API Key

## Configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/nia.git
cd nia
```

2. Configurar el backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del backend con:
```
OPENAI_API_KEY=tu_api_key
```

4. Ejecutar el servidor:
```bash
uvicorn backend.api.main:app --reload
```

## Despliegue

El proyecto está configurado para desplegarse automáticamente en Railway cuando se hace push a la rama main.

## Licencia

MIT 