# Widget de Chat NIA

Este es el widget de chat para NIA, un asistente virtual que puede integrarse en cualquier sitio web.

## Instalación

Para integrar el widget en tu sitio web, agrega el siguiente código en la sección `<head>` de tu HTML:

```html
<link rel="stylesheet" href="https://nia-alvaros-projects-6b18c4d2.vercel.app/nia-style.css">
```

Y al final del `<body>`:

```html
<script src="https://nia-alvaros-projects-6b18c4d2.vercel.app/nia-chat.js"></script>
```

## Desarrollo Local

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm start
```

3. Abre http://localhost:3000 en tu navegador

## Construcción

Para construir los archivos para producción:

```bash
npm run build
```

## Despliegue

El widget está configurado para desplegarse automáticamente en Vercel cuando se hace push a la rama principal.

## Personalización

Puedes personalizar los colores y estilos modificando el archivo `public/nia-style.css`.

## Características

- Interfaz de chat moderna y responsive
- Indicador de escritura
- Manejo de errores
- Personalizable mediante CSS
- Fácil integración 