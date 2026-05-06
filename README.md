# WikiAir Starter

PWA de aviación con Next.js App Router, TypeScript, Tailwind CSS, Firebase Firestore y una sección de radar en vivo.

## Instalación local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

## Firebase

1. Crea un proyecto en Firebase Console.
2. Crea una app Web y copia la configuración a `.env.local`.
3. Crea una base de datos Firestore en modo Native.
4. Crea la colección `aircraft`.
5. Para seed rápido en desarrollo: configura temporalmente reglas de escritura abiertas o crea un flujo admin; ejecuta `npm run seed:aircraft`; vuelve a dejar `allow write: if false`.
6. Despliega reglas con Firebase CLI si quieres usar `firebase.json` y `firestore.rules`.

## Imágenes

Para capa gratuita estricta, usa `imageUrl` con URLs directas de Wikimedia Commons o coloca imágenes livianas en `public/`. Cloud Storage para Firebase puede requerir Blaze para nuevos buckets.

## Vercel

1. Sube el repositorio a GitHub.
2. En Vercel: Add New Project → Import Git Repository.
3. Selecciona el repo, Framework Preset: Next.js.
4. Agrega las variables de entorno de `.env.local`.
5. Deploy.
6. Cada push a `main` dispara un despliegue de producción.

## Rutas

- `/` inicio
- `/enciclopedia` buscador y catálogo
- `/enciclopedia/[slug]` ficha técnica
- `/historia` línea de tiempo
- `/radar` radar en vivo + tabla OpenSky
