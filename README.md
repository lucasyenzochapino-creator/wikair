# WikiAir V2 Visual

PWA de aviación con diseño dark luxury, imágenes reales cargadas desde Wikipedia/Wikimedia, buscador, filtros por uso, fichas técnicas y radar en vivo.

## Rutas

- `/` Inicio premium
- `/enciclopedia` Catálogo con buscador y filtros
- `/avion/[slug]` Ficha técnica individual
- `/historia` Línea de tiempo histórica
- `/radar` Radar embebido

## Instalación local

```bash
npm install
npm run dev
```

## Despliegue

Subir los archivos extraídos a GitHub y conectar con Vercel. Framework: Next.js. No requiere variables de entorno para esta versión.

## Imágenes reales

Las tarjetas cargan miniaturas automáticamente desde la API pública de Wikipedia según el título de cada aeronave.
