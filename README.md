# app-web-gps-frontend

Aplicación web **mobile-first** para el rastreo y gestión de flotillas GPS, reportes de servicio y asignación de unidades. Empresa con base en Veracruz. El nombre completo de una unidad se construye como `VRCZ-{modelName}-{economicNumber}` (campo derivado, no almacenado en BD).

---

## Stack Tecnológico

| Herramienta | Versión | Rol |
|---|---|---|
| React | 19+ | UI framework |
| TypeScript | 5+ | Tipado estático |
| Vite | 6+ | Bundler y dev server |
| Tailwind CSS | v4 | Estilizado utility-first |
| Zustand | 5+ | Estado global (Auth, UI) |
| TanStack Query | v5 | Caché y sincronización con el servidor |
| TanStack Table | v8 | Tablas de datos complejas |
| Axios | 1+ | Cliente HTTP con soporte de cookies |

---

## Relación con el Backend

Este repositorio es el **frontend**. Consume la API REST del backend `app-web-gps-backend` que corre en Node.js + Express v5 + TypeScript sobre Supabase.

**Base URL de la API:** `http://localhost:{PORT}/api`

| Prefijo | Rebanada |
|---|---|
| `/api/auth` | Autenticación (signup, signin, signout, profile) |
| `/api/gps` | Modelos GPS y módulos GPS (trackers) |
| `/api/vehicles` | Modelos de vehículo y unidades |
| `/api/gps-details` | Asignación GPS ↔ Unidad |
| `/api/reports` | Reportes de servicio |

La autenticación usa **cookies `httpOnly`** con JWT. Axios debe configurarse con `withCredentials: true`.

---

## Esquema de Base de Datos (referencia)

Supabase (PostgreSQL). Tablas en español:

- `usuarios` — perfil público, relación 1:1 con `auth.users`. Trigger auto-crea el perfil al registrarse.
- `modelos_gps` — catálogo de modelos de rastreador GPS.
- `modulos_gps` — rastreadores físicos (serial, IMEI, línea). ENUM `estatus_gps`: `ACTIVO | DESHUESE`.
- `modelos_vehiculos` — catálogo de modelos de vehículo. ENUM `tipo`: `TRANSPORTE | DISTRIBUCION | STAFF | DIRECTIVOS | CAJA SECA`.
- `unidades` — vehículos de la flotilla. ENUM `estatus_unidad`: `ACTIVA | BAJA`.
- `detalles_gps_unidades` — tabla puente: asignación de rastreador a vehículo con fechas de instalación/retiro.
- `reportes` — reportes de servicio vinculados a un detalle GPS. ENUM `tipo_reporte`: `INSTALACION | REPARACION | DESINSTALACION`. Trigger auto-establece `fecha_cierre` al cerrar.

RLS activo en todas las tablas. Política general: `auth.uid() IS NOT NULL`. `usuarios` tiene política propia `auth.uid() = id`.

---

## Convenciones del Proyecto

- **Idioma del código:** TypeScript/React en **Inglés**.
- **Idioma de la BD:** Supabase en **Español**.
- **Arquitectura:** Clean Architecture con Vertical Slicing (mirrors del backend).
- **Cookies:** el token JWT viaja solo en cookies `httpOnly` — nunca en `localStorage`.

---

## Requisitos Previos

- Node.js >= 20
- npm >= 10
- Acceso al backend corriendo localmente o en producción

---

## Instalación y Arranque Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/<tu-usuario>/app-web-gps-frontend.git
cd app-web-gps-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend

# 4. Arrancar el servidor de desarrollo
npm run dev
```

---

## Variables de Entorno

Crear un archivo `.env` en la raíz con:

```env
VITE_API_URL=http://localhost:3000/api
```

> El archivo `.env` está en `.gitignore`. Nunca subas credenciales reales al repositorio.

---

## Estructura de Carpetas (planeada)

```
src/
├── auth/               # Login, registro, perfil
├── gps/                # Modelos GPS y trackers
├── vehicle/            # Modelos de vehículo y unidades
├── gps-detail/         # Asignación GPS ↔ Unidad
├── reports/            # Reportes de servicio
├── shared/
│   ├── api/            # instancia de Axios
│   ├── components/     # Componentes reutilizables
│   ├── hooks/          # Custom hooks globales
│   └── types/          # Tipos globales
├── store/              # Stores de Zustand (auth, ui)
└── main.tsx
```

---

## Subir el Repositorio a GitHub

### Paso 1 — Inicializar Git localmente

```bash
git init
git add .
git commit -m "chore: initial project setup"
```

### Paso 2 — Crear el repositorio en GitHub

1. Ir a [github.com/new](https://github.com/new).
2. Nombre: `app-web-gps-frontend`.
3. Visibilidad: **Private** (recomendado mientras está en desarrollo).
4. **No** marcar "Add a README file" ni ".gitignore" — ya los tienes localmente.
5. Clic en **Create repository**.

### Paso 3 — Conectar y subir

```bash
git remote add origin https://github.com/<tu-usuario>/app-web-gps-frontend.git
git branch -M main
git push -u origin main
```

### Paso 4 — Configurar `.gitignore`

Asegúrate de tener en `.gitignore`:

```
node_modules/
dist/
.env
.env.local
.env.*.local
```

### Paso 5 — Verificar

```bash
git status        # debe mostrar "nothing to commit"
git log --oneline # debe mostrar tu commit inicial
```

---

## Scripts Disponibles

| Comando | Acción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo en `localhost:5173` |
| `npm run build` | Genera el build de producción en `/dist` |
| `npm run preview` | Previsualiza el build de producción localmente |
| `npm run lint` | Ejecuta ESLint sobre el código fuente |

---

## Proyecto Relacionado

- **Backend:** `app-web-gps-backend` — Node.js + Express v5 + TypeScript + Supabase
