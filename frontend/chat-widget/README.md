# NIA Chat Widget

Widget de chat para integrar NIA en cualquier sitio web.

## Instalación

1. Clona este repositorio
2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` con la siguiente configuración:
```
REACT_APP_API_URL=https://tu-api-nia.com
```

4. Construye el widget:
```bash
npm run build
```

## Integración

Para integrar el widget en tu sitio web, agrega el siguiente script:

```html
<script src="https://tu-dominio-vercel.com/widget.js"></script>
```

## Desarrollo

Para ejecutar el widget en modo desarrollo:

```bash
npm start
```

## Características

- Interfaz de chat moderna y responsive
- Indicador de escritura
- Manejo de errores
- Personalizable mediante CSS
- Fácil integración 