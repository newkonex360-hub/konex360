# Konex 360

Primera version de una plataforma web moderna, accesible y multilingue para inmigrantes en Alemania, noticias locales, recursos de integracion y campanas sociales.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase preparado por variables de entorno
- Manifest PWA y service worker basico

## Ejecutar en local

```bash
npm install
npm run dev
```

Despues abre `http://localhost:3000`.

## Supabase

Copia `.env.example` a `.env.local` y completa:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

El cliente esta en `lib/supabase.ts` y devuelve `null` si las variables no estan configuradas, para que la primera version pueda renderizar sin credenciales.

## Incluye

- Hero con imagen local generada para Konex360.
- Selector de idioma visible: espanol, aleman, ingles, arabe, ruso y ucraniano.
- Secciones de noticias, integracion, LOTSE, directorio de ayuda y eventos.
- Controles de alto contraste y tamano de letra.
- Estructura semantica, textos ALT, navegacion por teclado y enlaces de salto.
- Base PWA con `manifest.webmanifest`, icono y `sw.js`.

## Bots y panel admin

La estructura para bot de noticias, bot de transporte y revisión humana está documentada en `docs/bots.md`.
