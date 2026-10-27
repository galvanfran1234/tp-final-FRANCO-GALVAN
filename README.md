# 🐾 Sistema de Gestión para Clínica Veterinaria (API REST & Web App)

> **Proyecto Full-Stack** desarrollado con **Node.js**, **Express**, **TypeScript** y **MySQL**, con arquitectura en capas, autenticación robusta mediante **JWT**, control de acceso por roles (RBAC) y cliente frontend integrado.

---

## 🌟 Demo en Vivo y Credenciales de Prueba

* 🌐 **Demo en vivo:** `https://tu-proyecto.onrender.com` *(reemplazar por tu enlace de Render)*
* ⚡ **Acceso Rápido Demo:** Puedes pulsar el botón *"Entrar como Demo"* en la pantalla de inicio o usar:
  * **Usuario:** `demo@veterinaria.com`
  * **Contraseña:** `Password123!`
* 🛡️ **Usuario Administrador:** `admin@veterinaria.com` / `Password123!`

---

## 🛠️ Tecnologías y Arquitectura

* **Backend:** Node.js, Express.js, TypeScript
* **Base de Datos:** MySQL (con pool de conexiones vía `mysql2/promise`)
* **Seguridad & Auth:** JSON Web Tokens (`jsonwebtoken`), hashing con `bcrypt`, validación de esquemas con `express-validator`
* **Arquitectura de Software:** Arquitectura en capas limpia:
  * `Routes` -> `Middlewares` (Auth, Validación DTO, Manejador Global de Errores) -> `Controllers` -> `Services` -> `Models` (Consultas SQL parametrizadas)
* **Frontend:** Vanilla HTML5, CSS3 moderno y JavaScript (Fetch API con persistencia de sesión JWT y CRUD completo).

---

## 📁 Estructura del Proyecto

```text
├── public/                 # Cliente Web estático (servido por Express)
│   ├── index.html          # Interfaz de usuario (Login/Registro y CRUD)
│   ├── styles.css          # Estilos modernos y responsivos
│   └── app.js              # Lógica de consumo de API (Fetch API & JWT)
├── src/
│   ├── controllers/        # Controladores de las rutas
│   ├── database/           # Configuración del pool de MySQL (con soporte SSL)
│   ├── middlewares/        # Middlewares de autenticación, roles y errores
│   ├── models/             # Acceso a datos con consultas parametrizadas
│   ├── routes/             # Definición modular de rutas
│   ├── services/           # Lógica de negocio (Auth, Hashing, Tokens)
│   ├── types/              # Tipos e interfaces de TypeScript
│   ├── validators/         # Validadores de entrada (express-validator)
│   └── index.ts            # Punto de entrada del servidor Express
├── DUMP (Veterinaria Patitas Felices).sql  # Esquema y datos semilla
├── package.json
└── tsconfig.json
```

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/galvanfran1234/tp-intermedio-Franco-Galvan.git
cd tp-intermedio-Franco-Galvan
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz (puedes guiarte con `.env.example`):
```env
PORT=3000

# Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=veterinaria_patitas_felices
DB_CONNECTION_LIMIT=10
DB_SSL=false

# Autenticación JWT
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRES_IN=1d
```

### 4. Importar la Base de Datos
Ejecuta el archivo `DUMP (Veterinaria Patitas Felices).sql` en tu gestor de base de datos preferido (phpMyAdmin, MySQL Workbench, DBeaver o CLI).

### 5. Iniciar la aplicación
* **Modo desarrollo (con recarga en vivo):**
  ```bash
  npm run dev
  ```
* **Modo producción (compilación TypeScript):**
  ```bash
  npm run build
  npm start
  ```

Abre tu navegador en `http://localhost:3000` para acceder a la aplicación web.

---

## ☁️ Guía de Despliegue Gratuito en la Nube

### Paso 1: Base de Datos en la Nube
1. Crea una base de datos gratuita en [Aiven.io](https://aiven.io/) o [TiDB Cloud](https://tidbcloud.com/).
2. Copia los datos de conexión: Host, Puerto, Usuario, Contraseña y Nombre de la base de datos.
3. Importa el archivo `DUMP (Veterinaria Patitas Felices).sql`.

### Paso 2: Despliegue en Render
1. Sube tu código a GitHub.
2. Ingresa a [Render.com](https://render.com) y crea un nuevo **Web Service**.
3. Selecciona tu repositorio y configura:
   * **Runtime:** Node
   * **Build Command:** `npm run build`
   * **Start Command:** `npm start`
4. En **Environment Variables**, agrega:
   * `DB_HOST`: tu host remoto
   * `DB_PORT`: tu puerto remoto (ej: 12345 o 3306)
   * `DB_USER`: tu usuario
   * `DB_PASSWORD`: tu contraseña
   * `DB_NAME`: veterinaria_patitas_felices
   * `DB_SSL`: `true`
   * `JWT_SECRET`: una clave secreta segura
   * `JWT_EXPIRES_IN`: `1d`
5. ¡Listo! Render te proporcionará la URL pública para compartir en tu portafolio.

---

## 📖 Endpoints de la API

Para probar la API directamente mediante consola, revisa el archivo [curl.md](file:///g:/PROGRAMACION-FRANCO-BACK-END/tp-final-FRANCO-GALVAN/curl.md).

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `POST` | `/api/login/register` | Registro de nuevos veterinarios | Público |
| `POST` | `/api/login/login` | Inicio de sesión y obtención de JWT | Público |
| `GET` | `/api/mascotas` | Listar mascotas del veterinario en sesión | Requiere Token |
| `POST` | `/api/mascotas/create` | Crear una nueva mascota | Requiere Token |
| `PUT` | `/api/mascotas/update/:id` | Modificar datos de una mascota | Requiere Token |
| `DELETE` | `/api/mascotas/delete/:id` | Eliminar mascota de forma segura | Requiere Token |
| `GET` | `/api/dueno` | Listar dueños registrados | Requiere Token |
| `POST` | `/api/dueno/create` | Registrar un dueño | Requiere Token |
| `GET` | `/api/historial_clinico` | Listar historiales clínicos | Requiere Token |
| `POST` | `/api/historial_clinico/create` | Crear nuevo historial clínico | Requiere Token |
| `GET` | `/api/veterinarios` | Listar colegas | Solo Administrador |

---

## 👨‍💻 Autor
* **Franco Galvan**
