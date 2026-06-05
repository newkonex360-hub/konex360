# Bots de Konex 360

Konex 360 tiene dos bots separados:

- Bot de noticias: `POST /api/bots/news`
- Bot de transporte: `POST /api/bots/transport`

Ambos bots guardan contenido con `status = 'pendiente'`. Nada se publica automáticamente.

## Variables de entorno

Configura en Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
KONEX_BOT_TOKEN=
KONEX_ADMIN_TOKEN=
KONEX_ADMIN_USER=
KONEX_ADMIN_PASSWORD=
```

`SUPABASE_SERVICE_ROLE_KEY` solo debe existir en servidor. No la expongas en el navegador.

## Supabase

Ejecuta `supabase/schema.sql` en el SQL editor de Supabase.

Tablas:

- `news_items`
- `transport_alerts`

RLS permite lectura pública solo de registros con `status = 'publicado'`.

## Fuentes

Las fuentes están en:

```txt
lib/bots/sources.ts
```

Activa solo fuentes RSS públicas u oficiales que permitan lectura automatizada. Si una fuente no ofrece RSS, mantenla desactivada hasta crear una integración permitida.

## Ejecutar bots

Prueba sin guardar en Supabase:

```bash
curl -X POST "https://TU-DOMINIO.vercel.app/api/bots/news?dryRun=1"

curl -X POST "https://TU-DOMINIO.vercel.app/api/bots/transport?dryRun=1"
```

Ejecución real con guardado en estado `pendiente`:

Ejemplo:

```bash
curl -X POST https://TU-DOMINIO.vercel.app/api/bots/news \
  -H "x-konex-bot-token: TU_TOKEN"

curl -X POST https://TU-DOMINIO.vercel.app/api/bots/transport \
  -H "x-konex-bot-token: TU_TOKEN"
```

## Panel admin

Abre:

```txt
https://TU-DOMINIO.vercel.app/admin
```

El navegador pedirá usuario y contraseña mediante Basic Auth. Desde ahí puedes:

- Aprobar
- Publicar
- Rechazar / archivar

## Política editorial

Los bots no copian artículos completos. Guardan título, resúmenes propios y enlace original a la fuente.

## Estado de pruebas

El modo `dryRun=1` no guarda datos y sirve para confirmar que las rutas funcionan.

Si en local aparece `fetch failed`, normalmente significa que el entorno local no puede salir a internet. En Vercel, con red externa disponible, las mismas rutas deberían poder leer las fuentes configuradas.

Cuando Supabase esté configurado, la ejecución real insertará registros como `pendiente`; el panel admin decidirá si pasan a `aprobado`, `publicado` o `archivado`.
