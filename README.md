# Sistema de Gestión para Clínica Veterinaria (API REST)

## Descripción General
Este proyecto es una API RESTful desarrollada con Node.js y TypeScript para gestionar las operaciones de una clínica veterinaria. Proporciona una arquitectura robusta que permite crear y administrar **Veterinarios** (usuarios del sistema), **Dueños**, **Mascotas** e **Historiales Clínicos**. Cuenta con un sistema de autenticación seguro basado en JSON Web Tokens (JWT) y Middlewares de validación, garantizando que todas las entidades operadas estén asociadas de forma segura y consistente al usuario en sesión, así como roles (usuario regular vs administrador).

## Tecnologías Utilizadas
* **Entorno de Ejecución**: Node.js
* **Lenguaje**: TypeScript
* **Framework Web**: Express.js
* **Base de Datos**: MySQL (manejado vía `mysql2`)
* **Autenticación y Seguridad**: `jsonwebtoken` (JWT) y `bcrypt` para encriptación de datos sensibles.
* **Validación de Datos**: `express-validator`

## Instrucciones de Instalación
Asegúrate de tener instalado Node.js (idealmente v18+) y MySQL localmente o en un servidor dedicado.

1. Clonar el repositorio en tu máquina local.
2. Abrir una terminal en el directorio raíz del proyecto.
3. Instalar las dependencias ejecutando:
   ```bash
   npm install
   ```

## Variables de Entorno Requeridas
El proyecto depende de ciertas variables de entorno para funcionar que deben ser configuradas en un archivo `.env` en el directorio principal:

```env
# Configuración del Puerto del Servidor
PORT=3000

# Credenciales de Base de Datos MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=stock_db
DB_CONNECTION_LIMIT=10

# Secretos y Tiempos de Expiración de Autenticación
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRES_IN=1h
```

## Pasos para Ejecutar el Proyecto
Una vez configurado el archivo `.env` y levantada tu base de datos MySQL con las tablas apropiadas, puedes ejecutar el proyecto de dos formas:

* **Modo Desarrollo** (con recarga automática mediante `ts-node-dev`):
  ```bash
  npm run dev
  ```
* **Modo Producción** (compila Typecript a JavaScript y luego lo ejecuta):
  ```bash
  npm run build
  npm start
  ```
El servidor escuchará por defecto en `http://localhost:3000`.

## Ejemplos de Endpoints Principales

### Rutas Públicas de Autenticación (`/api/login`)
* **Registro**: `POST /api/login/register`
  Crea una cuenta de veterinario proporcionando `nombre`, `apellido`, `email`, `password`, `matricula` y `especialidad`.
* **Login**: `POST /api/login/login`
  Autentica recibiendo `email` y `password`, y devuelve tu token JWT.

### Rutas Protegidas (Requieren Header `Authorization: Bearer <token>`)
* **Dueños**: 
  * `GET /api/dueno` (Lista dueños registrados por el veterinario logueado).
  * `POST /api/dueno/create` (Crea un nuevo dueño).
* **Mascotas**: 
  * `GET /api/mascotas` (Obtiene mascotas asignadas a tu cuenta).
  * `PUT /api/mascotas/update/:id` (Actualiza datos de la mascota).
* **Historial Clínico**: 
  * `POST /api/historial_clinico/create` (Añade historial a la mascota).
  * `DELETE /api/historial_clinico/delete/:id` (Elimina un historial clínico mediante id de manera segura).

### Rutas Exclusivas por Requisito de Rol "Admin" 
* **Creación de Colega**: `POST /api/veterinarios/create`
  Solo los usuarios autenticados cuyo JWT posea rol de `admin` pueden crear, actualizar o eliminar directamente las cuentas de otros colegas en la base de datos a través de la API reservada.

## Aclaración de la Opción de Frontend
**El proyecto cuenta con un frontend mínimo integrado bajo la modalidad "Opción 1".** 
Dentro de la carpeta `/public` del repositorio se ha desarrollado una interfaz web estática implementando puro `HTML, CSS y JS` (Vanilla JS), la cual es servida desde la raíz de la aplicación de express. 
Este cliente web utiliza la API `fetch()` nativa para conectar con el sistema de autenticación, permitiéndole a los veterinarios logearse, resguardar su sesión (JWT) y realizar un control **CRUD COMPLETO** (Lectura, Creación, Actualización y Borrado) de la entidad **Mascotas**, con la finalidad estricta de avalar y validar el funcionamiento entre backend y frontend requerido en el enunciado principal.
