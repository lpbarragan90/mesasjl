
# Mesas J&L — PWA + Sincronización en la nube (Firestore)

Este paquete contiene todo para publicar tu app en **GitHub Pages** y activar la **sincronización entre iPhones** con **Firebase Firestore**.

## Archivos incluidos
- `index.html` — App móvil con PWA y Firestore integrados.
- `manifest.webmanifest` — Metadatos PWA.
- `sw.js` — Service Worker (offline).
- `icons/icon-192.png`, `icons/icon-512.png` — Íconos PWA.
- `.nojekyll` — Evita Jekyll en GitHub Pages.
- `firestore.rules` — Reglas de prueba para Firestore (NO usar en producción sin cambios).

---

## PASO A PASO — Publicar en GitHub Pages (iPhone instalable)

1) **Crea un repositorio** público en GitHub (ej. `mesas-jl`).  
2) **Sube** TODOS los archivos de esta carpeta a la **raíz** del repo (`index.html`, `sw.js`, `manifest.webmanifest`, `icons/`, `.nojekyll`).  
3) En el repo: **Settings → Pages → Build and deployment**  
   - **Source**: *Deploy from a branch*  
   - **Branch**: `main` y carpeta **/root**  
4) Abre la URL que te da GitHub Pages: `https://TU-USUARIO.github.io/mesas-jl/`  
5) En iPhone (Safari), abre la URL → **Compartir** → **Añadir a pantalla de inicio**.  

> Ya tienes la app como PWA, con uso offline y guardado local.

---

## PASO A PASO — Activar sincronización entre iPhones (Firestore)

### 1. Crear proyecto y obtener configuración
- Ve a **https://console.firebase.google.com** → **Add project** (ej. `MesasJL`).  
- En **Build → Firestore Database** → **Create database** (modo de prueba por ahora).  
- En **Project settings → General**, en *Your apps* crea una **Web app** (</>).  
- Copia el **objeto de configuración** (apiKey, authDomain, projectId, etc.).

### 2. Pegar config en `index.html`
- Abre `index.html` y **busca**: `const FIREBASE_CONFIG = { ... }`  
- **Reemplaza** `REPLACE_API_KEY` y `REPLACE_PROJECT_ID` con tus valores reales.  
- (Si tu config trae más campos, puedes pegarlos tal cual.)

### 3. Reglas de Firestore para pruebas
- En la consola de Firebase → **Firestore → Rules** → pega el contenido de `firestore.rules` para pruebas.  
  > **Advertencia:** son reglas **abiertas**. Cámbialas antes de producción.

### 4. Publica el repo (si hiciste cambios)
- `Commit` y `push` de `index.html` con tu config.  
- Espera a que GitHub Pages actualice.

### 5. Probar en dos iPhones
- Abre la URL en ambos iPhones (Safari).  
- Mueve o edita en uno: en segundos se verá en el otro.

### 6. Cambiar de plan por URL
- El **PLAN_ID** se toma del `hash` de la URL.  
- Ejemplo: `https://TU-USUARIO.github.io/mesas-jl/#boda-jl`  
- Si no hay `hash`, usa `plan-jl-default`.

---

## Notas y tips

- **PDF/Excel/CSV** siguen funcionando (requieren conexión para cargar las librerías la primera vez).  
- **Offline**: el `app shell` queda cacheado.  
- **Forzar actualización**: cambia `CACHE` en `sw.js` (p.ej., `-v2`) y sube cambios.  
- **Privacidad**: usa reglas seguras en Firestore antes de compartir; por ejemplo, restringe por un código secreto almacenado en el documento, o habilita Auth (puedo darte un ejemplo).

¡Listo! Publica, pega tu config y sincroniza entre iPhones.
