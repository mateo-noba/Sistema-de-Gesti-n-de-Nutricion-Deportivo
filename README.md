# 🥗 Sistema de Gestión de Nutrición Deportiva

Sistema para la gestión de turnos y el seguimiento de pacientes de un consultorio de nutrición deportiva. Tiene dos tipos de usuario: **pacientes**, que consultan su turno, su plan nutricional, su rutina y sus avances, y **médicos**, que administran turnos, pacientes, planes y avances. Ambos cuentan con un chatbot de consultas.

---

## 📋 Tabla de contenidos

- [Funcionalidades](#-funcionalidades)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y puesta en marcha](#-instalación-y-puesta-en-marcha)
- [Configuración del backend (.env)](#-configuración-del-backend-env)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Solución de problemas](#-solución-de-problemas)
- [Autores](#-autores)

---

## ✨ Funcionalidades

### 👤 Paciente
- Registro (en dos pasos) e inicio de sesión.
- Visualización de la información de su turno, si tiene uno.
- Cancelación del turno.
- Visualización del plan nutricional y de la rutina de ejercicios, con descarga en formato PDF.
- Visualización de sus avances (notas y peso) con vista de detalle.
- Consultas al chatbot y solicitud de turnos desde el mismo.

### 🩺 Médico
- Listado de turnos con búsqueda y filtros por nombre, teléfono, fecha y hora.
- Creación, edición y eliminación de turnos.
- Listado de pacientes, con acceso a sus datos.
- Modificación de los datos de los pacientes.
- Alta de avances y planes para cada paciente, y modificación de los mismos.
- Consultas al chatbot.

---

## 🛠 Tecnologías utilizadas

### Frontend
| Tecnología | Uso |
|---|---|
| [React Native](https://reactnative.dev/) | Interfaz de la aplicación |
| [Expo](https://expo.dev/) | Entorno de desarrollo y ejecución (web y móvil) |
| [React Native Web](https://necolas.github.io/react-native-web/) | Ejecución de la app en el navegador |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [React Navigation](https://reactnavigation.org/) | Navegación entre pantallas |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Almacenamiento local de la sesión |
| [Expo Vector Icons](https://icons.expo.fyi/) | Iconos |

### Backend
| Tecnología | Uso |
|---|---|
| [Node.js](https://nodejs.org/) | Entorno de ejecución del servidor |
| [Express](https://expressjs.com/) | API REST |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [mysql2](https://github.com/sidorares/node-mysql2) | Conexión con la base de datos |
| [dotenv](https://github.com/motdotla/dotenv) | Variables de entorno |
| [CORS](https://github.com/expressjs/cors) | Comunicación entre frontend y backend |
| [PDFKit](https://pdfkit.org/) | Generación de PDF para las descargas |

### Base de datos y herramientas
| Tecnología | Uso |
|---|---|
| SQL (MySQL / MariaDB) | Almacenamiento de los datos |
| [XAMPP](https://www.apachefriends.org/) | Servidor local de MySQL/MariaDB |
| [phpMyAdmin](https://www.phpmyadmin.net/) | Administración e importación de la base de datos |
| [Git](https://git-scm.com/) y [GitHub](https://github.com/) | Control de versiones |

---

## 📁 Estructura del proyecto

```
Sistema-de-Gesti-n-de-Nutricion-Deportivo/
├── BaseDeDatos/              # Base de datos de prueba (.sql)
├── assets/                   # Imágenes e iconos
├── backend/
│   ├── db/
│   ├── src/
│   │   ├── config/           # Conexión a la base de datos y URL de la API
│   │   ├── controllers/      # Lógica de cada endpoint
│   │   ├── routes/           # Definición de rutas
│   │   └── index.ts          # Servidor Express
│   ├── .env                  # Variables de entorno (no se sube al repositorio)
│   ├── package.json
│   └── tsconfig.json
├── src/
│   ├── interfaces/           # Tipos e interfaces de TypeScript
│   ├── paginas/              # Pantallas de la aplicación
│   │   ├── ChatBot/
│   │   ├── Cliente/
│   │   ├── Login/
│   │   ├── Notas/
│   │   ├── Pacientes/
│   │   ├── Turnos/           # AgregarTurno, EditarTurno, ListaTurnos
│   │   └── Inicio.tsx
│   └── servicios/            # Llamadas a la API (pacienteServicio, turnoServicio)
├── App.tsx                   # Punto de entrada y rutas de navegación
├── app.json                  # Configuración de Expo
├── index.ts
└── package.json
```

---

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/) LTS, versión **22.13.0 o superior**
- [XAMPP](https://www.apachefriends.org/) (incluye MySQL/MariaDB y phpMyAdmin)
- [Git](https://git-scm.com/) (opcional)
- Un navegador web actualizado

---

## 🚀 Instalación y puesta en marcha

### 1. Descargar el proyecto

```bash
git clone https://github.com/mateo-noba/Sistema-de-Gesti-n-de-Nutricion-Deportivo.git
cd Sistema-de-Gesti-n-de-Nutricion-Deportivo
```

También podés descargarlo como `.zip` desde GitHub (**Code → Download ZIP**) y descomprimirlo.

### 2. Descargar e importar la base de datos de prueba

1. Tomá el archivo `agendanutricion.sql` de la carpeta `BaseDeDatos/` del proyecto. <!-- Confirmar nombre de la carpeta y del archivo -->
2. Abrí **XAMPP** e iniciá **Apache** y **MySQL**.
3. Entrá a phpMyAdmin: `http://localhost/phpmyadmin`.
4. Creá una base de datos con el nombre exacto **`agendanutricion`**.
5. Seleccioná esa base, andá a la pestaña **Importar**, elegí el archivo `.sql` y confirmá.

> ⚠️ MySQL debe correr en el puerto **3306** (el predeterminado).

> ℹ️ Para probar el sistema usamos `localhost`. **Esto es opcional:** podés modificar la base de datos y la configuración de conexión (`backend/.env`) según tu entorno.

### 3. Instalar las dependencias del frontend

Desde la **raíz** del proyecto:

```bash
npm i
```

### 4. Instalar las dependencias del backend

```bash
cd backend
npm i
```

### 5. Ejecutar el sistema

Necesitás **dos terminales** abiertas al mismo tiempo.

**Terminal 1: frontend** (en la raíz del proyecto):

```bash
npx expo start
```

**Terminal 2: backend** (dentro de la carpeta `backend`):

```bash
npm run dev
```

Cuando el backend esté listo, vas a ver:

```
🚀 Servidor backend corriendo en http://localhost:3000
```

### 6. Abrir la aplicación

Entrá desde tu navegador a:

```
http://localhost:8081
```

¡Y listo! El sistema ya debería funcionar. 🎉

---

## 🔧 Configuración del backend (.env)

Creá un archivo `.env` dentro de la carpeta `backend`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=agendanutricion
```

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `PORT` | Puerto del servidor backend | `3000` |
| `DB_HOST` | Servidor de la base de datos | `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL (en XAMPP suele estar vacía) | *(vacío)* |
| `DB_NAME` | Nombre de la base de datos | `agendanutricion` |

La URL base que usa el frontend está en `backend/src/config/api.ts` (`API_URL`).

> 🔒 El archivo `.env` no debe subirse al repositorio.

---

## 🔌 Endpoints de la API

Base: `http://localhost:3000/api`

### Autenticación y paciente

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/login` | Inicio de sesión |
| `POST` | `/registro` | Registro de un nuevo paciente |
| `GET` | `/mis-turnos?id_usuario=` | Turno pendiente del usuario |
| `PUT` | `/cancelar-turno` | Cancela el turno del usuario |
| `GET` | `/avances?id_usuario=` | Avances del paciente |

### Turnos (`/turnos`)

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/turnos` | Lista de todos los turnos |
| `GET` | `/turnos/:id` | Detalle de un turno |
| `POST` | `/turnos` | Crear turno |
| `PUT` | `/turnos/:id` | Editar turno |
| `DELETE` | `/turnos/:id` | Eliminar turno |

### Pacientes (`/paciente`)

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/paciente` | Lista de pacientes |
| `GET` | `/paciente/:id` | Datos de un paciente |
| `DELETE` | `/paciente/:id` | Eliminar paciente |

### Utilidad

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/health` | Verifica la conexión con la base de datos |

---

## 🩺 Solución de problemas

**`Access denied for user 'root'@'localhost'`**
El usuario o la contraseña de `backend/.env` no coinciden con los de tu MySQL. Revisá `DB_USER` y `DB_PASSWORD` y reiniciá el backend.

**`ECONNREFUSED` al conectar con la base de datos**
MySQL no está iniciado o está en otro puerto. Verificá en el panel de XAMPP que MySQL esté en verde y ajustá `DB_PORT` si hace falta.

**`Unknown database 'agendanutricion'`**
Falta crear o importar la base de datos. Seguí el paso 2 de la instalación.

**El puerto 3306 está ocupado**
Puede haber otro MySQL instalado como servicio de Windows. Detenelo desde `services.msc`, o cambiá el puerto de XAMPP y definí `DB_PORT` en el `.env`.

**La app no carga en `localhost:8081`**
Verificá que `npx expo start` esté corriendo sin errores en la raíz del proyecto.

**El login falla o no trae datos**
Confirmá que el backend esté corriendo y respondiendo en `http://localhost:3000/api/health`.

**Aviso de versión de Node al correr Expo**
Verificá con `node -v` que tengas la versión 22.13.0 o superior.

**Si probás desde un celular con Expo Go**
Reemplazá `localhost` por la IP local de tu PC en `backend/src/config/api.ts` y en los servicios del frontend. Ambos dispositivos tienen que estar en la misma red.

---

## 👥 Autores

- [mateo-noba](https://github.com/mateo-noba)
- [IvanArevalos](https://github.com/IvanArevalos)
- [CiroIsft220](https://github.com/CiroIsft220)
