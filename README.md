osmi-front/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/                         ← Rutas principales (Next.js App Router)
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │       └── page.tsx
│   │   │   └── register/
│   │   │           └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │       └── page.tsx
│   │   │   ├── admin/
│   │   │   │       └── page.tsx
│   │   │   ├── organizador/
│   │   │   │    │    └── crear-evento/
│   │   │   │    │       └── page.tsx
│   │   │   ├── eventos/
│   │   │   │        └── [id]/
│   │   │   │            └── page.tsx
│   │   │   ├── registro/
│   │   │   │   │    └── page.tsx
│   │   │       └── page.tsx
│   │   ├── (info)/
│   │   │   ├── cookies/
│   │   │   │   └── page.tsx
│   │   │   ├── desfragmentado/
│   │   │   │   └── page.tsx
│   │   │   ├── Manitas/
│   │   │   │   └── page.tsx
│   │   │   ├── para-organizadores/
│   │   │   │   └── page.tsx
│   │   │   ├── prensa/
│   │   │   │   └── page.tsx
│   │   │   └── sobre-nosotros/
│   │   │       └── page.tsx

│   │   ├── (public)/
│   │   │   └── events/
│   │   │       ├── [public_id]/
│   │   │       │   └── page.tsx     ← EventPage (detalle evento)
│   │   │       └── page.tsx         ← EventsPage (explorar todos los eventos)
│   │   │   └── page.tsx             ← Página pública principal
│   │   ├── checkout/                ← Página de Checkout
│   │   ├── success/                 ← Página de éxito post-compra
│   │   ├── favicon.ico              ← Ícono de la aplicación
│   │   ├── globals.css              ← Estilos globales
│   │   └── layout.tsx               ← Layout raíz de la app

│   │
│   ├── components/                  ← Componentes UI reutilizables
│   │   ├── events/                  ← Componentes de eventos
│   │   │   ├── BuyTicketCard.tsx
│   │   │   ├── TicketSelector.tsx
│   │   │   └── EventHero.tsx
│   │   ├── home/                    
│   │   │   └── HeroSection.tsx      ← Hero principal de Home
│   │   ├── navigation/
│   │   │   └── Navbar.tsx           ← Barra de navegación
│   │   ├── ui/
│   │   │   └── EventCard.tsx        ← Card de evento
│   │
│   ├── hooks/                       ← Custom hooks
│   │
│   ├── lib/                         ← Utilidades generales
│   │   ├── api.ts                   ← Cliente HTTP
│   │   └── stripe.ts                ← Configuración Stripe
│   │
│   ├── modules/                     ← Lógica por dominio
│   │   ├── auth/
│   │   │   ├── api/                 ← Endpoints de autenticación
│   │   │   ├── hooks/               ← Hooks de auth
│   │   │   ├── store/               ← Estado de auth
│   │   │   ├── types/               ← Tipos de auth
│   │   │   └── utils/               ← Utilidades de auth
│   │   ├── events/
│   │   │   ├── api.ts               ← API de eventos
│   │   │   ├── types.ts             ← Tipos de eventos
│   │   │   └── utils/
│   │   │       └── normalizer.ts    ← Normalizador de datos de eventos
│   │   ├── orders/                  ← Lógica de órdenes
│   │   ├── payments/
│   │   │   └── components/          ← Componentes de pagos
│   │   └── tickets/                 ← Lógica de tickets
│   │
│   ├── services/                    ← Servicios externos #noexiste esta carpeta
│   │    
    ├── store/                       ← Estado global (Zustand)
    │   └── cart.ts    
    ├── styles/                      ← Estilos compartidos
    ├── providers/                   ← Providers de contexto
    ├── types/
    │   └── index.ts                 ← Tipos globales
    └── proxy.ts                     ← Proxy de API
├── .env.local
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json

## 🔄 FLUJO PASO A PASO DEL USUARIO ORGANIZADOR

### **Paso 1: Descubrimiento**
```
Usuario navega por la app
  ↓
Ve el botón "Para Organizadores" en:
  - Navbar (visible siempre)
  - Footer
  - Homepage (sección destacada)
  ↓
Clic → /para-organizadores
```

### **Paso 2: Landing Page**
```
Usuario llega a /para-organizadores
  ↓
Ve los beneficios, testimonios, estadísticas
  ↓
CTA principal: "Registra tu evento" → botón grande y visible
  ↓
Clic → /organizador/registro
```

### **Paso 3: Registro como Organizador**
```
Usuario llega a /organizador/registro
  ↓
Completa formulario:
  - Datos personales (nombre, email, teléfono)
  - Datos de organización (nombre, descripción, web)
  - Tipos de eventos que organiza
  - Acepta términos y condiciones
  ↓
Clic "Registrarme como organizador"
  ↓
✅ Registro exitoso → Redirige a /organizador
```

### **Paso 4: Dashboard del Organizador**
```
Usuario llega a /organizador
  ↓
Ve su panel de control:
  - Resumen: eventos totales, boletos vendidos, ingresos
  - Lista de eventos creados (con estado: activo/pendiente/borrador)
  - Botón "Crear nuevo evento"
  - Enlace a configuración de perfil
  ↓
Clic "Crear nuevo evento" → /organizador/crear-evento
```

### **Paso 5: Crear Evento**
```
Usuario llega a /organizador/crear-evento
  ↓
Completa formulario del evento:
  - Nombre, descripción, ubicación
  - Fecha y hora
  - Imagen (Cloudinary)
  - Categorías, tags
  - Configuración de boletos
  ↓
Clic "Crear evento"
  ↓
✅ Evento creado → Redirige a /organizador/eventos/[id]
```

### **Paso 6: Detalle/Edición del Evento**
```
Usuario llega a /organizador/eventos/[id]
  ↓
Ve información completa del evento
  ↓
Puede:
  - Editar datos
  - Gestionar boletos
  - Ver estadísticas de ventas
  - Publicar/Ocultar evento
  - Compartir evento
  ↓
Clic "Volver al dashboard" → /organizador
```

---

## 🎯 PUNTOS CLAVE DE LA ESTRATEGIA

### **1. Control de Spam**
```
Cualquier usuario puede registrarse como organizador
  ↓
Pero los eventos creados quedan en estado "PENDIENTE"
  ↓
Admin revisa y aprueba/recibe
  ↓
Solo eventos aprobados son públicos
```

### **2. Visibilidad del Botón "Registra tu evento"**
```
📍 Navbar → siempre visible (para todos los usuarios)
📍 Footer → enlace secundario
📍 Landing page → CTA principal (varias veces)
📍 Dashboard → si ya es organizador, mostrar "Crear evento"
📍 Homepage → sección de llamado a la acción
```

### **3. Estados del Evento**
```
BORRADOR → Creado pero no visible
  ↓
PENDIENTE → Enviado a revisión por admin
  ↓
PUBLICADO → Visible en la plataforma
  ↓
CANCELADO → Oculto (evento cancelado)
  ↓
FINALIZADO → Evento ya pasado
```

### **4. Mensajes de Feedback**
```
✅ "Tu evento ha sido creado y está en revisión"
✅ "Recibirás un correo cuando sea aprobado"
✅ "Tu evento ya está visible para el público"
⚠️ "Faltan datos obligatorios para publicar"
❌ "Error al crear el evento. Intenta de nuevo"
```

---

## 📝 RESUMEN DE TAREAS PENDIENTES

| Prioridad | Tarea | Archivo |
|-----------|-------|---------|
| 🔴 Alta | Mejorar Navbar (agregar botón) | `Navbar.tsx` |
| 🔴 Alta | Mejorar Footer (agregar enlace) | `Footer.tsx` |
| 🔴 Alta | Crear registro de organizador | `organizador/registro/page.tsx` |
| 🟡 Media | Mejorar dashboard organizador | `organizador/page.tsx` |
| 🟡 Media | Mejorar crear evento | `organizador/crear-evento/page.tsx` |
| 🟢 Baja | Crear detalle de evento | `organizador/eventos/[id]/page.tsx` |

---

## ❓ PREGUNTAS ANTES DE EMPEZAR

1. **¿Los eventos creados deben quedar en "PENDIENTE" automáticamente?** 
   - Sí, para control de spam

2. **¿El botón "Registra tu evento" debe llevar a `/organizador/registro` o a `/para-organizadores`?**
   - Debe estar en ambos lugares:
     - Navbar/Footer → `/para-organizadores` (landing)
     - Dentro de landing → `/organizador/registro` (registro)

3. **¿El dashboard del organizador debe mostrar eventos aunque estén en "PENDIENTE"?**
   - Sí, para que el organizador sepa que está en revisión

4. **¿Tienes ya implementado el rol de "admin" para aprobar eventos?**
   - Para ahora, los eventos se crean como "PUBLICADOS" directamente (simplificado)

   Mejoras aplicadas al Dashboard
Aspecto	Antes	Ahora
Diseño	Básico y funcional	Premium con glassmorphism y gradientes
Estadísticas	Sin información	4 tarjetas con datos clave
Lista de eventos	Simple tabla	Grid/List toggle con tarjetas visuales
Estado	Sin indicador	Badges con colores e íconos por estado
Búsqueda	No	Buscador integrado
Filtros	No	Filtro por estado de evento
Acciones	Solo crear	Ver, editar, eliminar, ver público
Feedback	Básico	Carga, error, vacío con CTAs
Responsive	Limitado	100% responsive con grid adaptativo
🎯 Estados de los eventos
Estado	Color	Descripción
published	🟢 Verde	Visible al público
pending	🟡 Amarillo	En revisión por admin
draft	⚪ Gris	Borrador, no visible
cancelled	🔴 Rojo	Cancelado
finished	⚪ Gris oscuro	Finalizado









Excelente pregunta. Analizando tu `AdminPage` actual y tu estructura, te doy mi opinión y la mejor solución:

---

## 🧠 ANÁLISIS DEL PANEL DE ADMIN

| Aspecto | Estado | Observación |
|---------|--------|-------------|
| **URL** | `/admin` | Pública, cualquiera puede intentar acceder |
| **Seguridad** | ❌ NINGUNA | No verifica si el usuario es admin |
| **API** | `http://localhost:8083` | Hardcodeado, debería usar `.env` |
| **Diseño** | 🟡 Básico | Funcional pero sin estilo premium |
| **Funcionalidad** | ✅ Aprobar/Rechazar | Funciona pero sin feedback visual |

---

## 🔒 ¿CÓMO DEBE LLEGAR UN ADMIN AL PANEL?

### ❌ Opción 1: URL oculta (NO recomendada)
```
/admin-secreto-xyz123
```
**Problema:** No es seguro, cualquiera puede adivinarla o encontrarla en logs.

### ✅ Opción 2: Verificación por rol (RECOMENDADA)
```
/admin
```
**Requisito:** Solo usuarios con rol `admin` pueden acceder.

### ✅ Opción 3: Botón en Navbar (SOLO PARA ADMINS)
```
Solo visible si el usuario tiene rol admin
```

---

## 📁 ESTRUCTURA PARA ADMIN

```
src/app/(dashboard)/
├── admin/
│   ├── page.tsx          ← Panel de admin (ya existe)
│   ├── layout.tsx        ← Layout con verificación de admin (NUEVO)
│   └── organizadores/
│       └── [id]/
│           └── page.tsx  ← Detalle de organizador (opcional)
```

---

## 🛡️ SEGURIDAD RECOMENDADA

### 1. Verificar rol en el servidor (BACKEND)
```tsx
// En la API, el endpoint /v1/admin/... debe validar que el usuario sea admin
```

### 2. Verificar rol en el cliente (FRONTEND)
```tsx
// Al cargar /admin, verificar si el usuario tiene rol admin
// Si no, redirigir a /dashboard
```

### 3. Ocultar el botón en Navbar
```tsx
// Solo mostrar "Admin" en Navbar si el usuario es admin
```

---

## 💡 MI RECOMENDACIÓN

### ¿Cómo debe llegar el admin al panel?

**Opción A (Simple):**
1. El admin conoce la URL `/admin`
2. Al entrar, el sistema verifica su rol
3. Si no es admin → redirigir a `/dashboard`

**Opción B (Premium):**
1. En el Navbar, SOLO si es admin, aparece un botón "Admin"
2. Al hacer clic → `/admin`
3. Si alguien escribe `/admin` manualmente, igual verifica rol

---

## 🔧 MEJORAS QUE DEBO HACER A TU ADMIN PAGE

| Mejora | Prioridad |
|--------|-----------|
| Verificar rol de admin al cargar | 🔴 ALTA |
| Usar `NEXT_PUBLIC_API_URL` en lugar de hardcode | 🔴 ALTA |
| Rediseñar con estilo premium | 🟡 MEDIA |
| Feedback visual al aprobar/rechazar | 🟡 MEDIA |
| Mostrar estadísticas de organizadores | 🟢 BAJA |

---

## ❓ PREGUNTA PARA TI

**¿Cómo quieres que funcione el acceso al Admin?**

1. **Solo con URL conocida** (tú la compartes a quien quieras)
   - Cualquiera que conozca `/admin` puede entrar
   - ❌ Menos seguro

2. **Con verificación de rol en el backend**
   - Solo usuarios con `role: "admin"` pueden entrar
   - ✅ Más seguro y profesional

3. **Botón en Navbar SOLO para admins**
   - El botón aparece automáticamente si eres admin
   - ✅ La mejor experiencia de usuario

**Mi recomendación: Opción 2 + 3 combinadas.**

---

**¿Quieres que mejore el Admin Page con estas protecciones y diseño premium?**