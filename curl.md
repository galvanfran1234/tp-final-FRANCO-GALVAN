# Guía de Pruebas con cURL

Esta guía contiene peticiones `cURL` para probar manualmente todos los endpoints de la API.

---

### 🔐 1. Autenticación (Rutas Públicas)

**Registrar un nuevo veterinario**
```bash
curl -X POST http://localhost:3000/api/login/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Franco",
    "apellido": "Galvan",
    "matricula": "VET-12345",
    "especialidad": "Cirugía",
    "email": "franco@example.com",
    "password": "Password123!"
  }'
```

**Iniciar sesión (Login)**  
Devuelve el token JWT que debes usar en las rutas protegidas:
```bash
curl -X POST http://localhost:3000/api/login/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@veterinaria.com",
    "password": "Password123!"
  }'
```

---

### 🐾 2. Mascotas (Protegido - Requiere Token)

> Exporta tu token en la terminal: `TOKEN="tu_token_aqui"`

**Obtener mascotas de tu cuenta**
```bash
curl -X GET http://localhost:3000/api/mascotas \
  -H "Authorization: Bearer $TOKEN"
```

**Crear una mascota**
```bash
curl -X POST http://localhost:3000/api/mascotas/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Firulais",
    "especie": "Perro",
    "fecha_nacimiento": "2020",
    "id_dueno": 1
  }'
```

**Actualizar una mascota**
```bash
curl -X PUT http://localhost:3000/api/mascotas/update/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Firulais Actualizado",
    "especie": "Perro",
    "fecha_nacimiento": "2020",
    "id_dueno": 1
  }'
```

**Eliminar una mascota**
```bash
curl -X DELETE http://localhost:3000/api/mascotas/delete/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

### 🧍 3. Dueños (Protegido)

**Obtener dueños**
```bash
curl -X GET http://localhost:3000/api/dueno \
  -H "Authorization: Bearer $TOKEN"
```

**Crear un dueño**
```bash
curl -X POST http://localhost:3000/api/dueno/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Perez",
    "telefono": 1145678901,
    "direccion": "Av. Corrientes 1234"
  }'
```

---

### 📋 4. Historial Clínico (Protegido)

**Obtener historiales**
```bash
curl -X GET http://localhost:3000/api/historial_clinico \
  -H "Authorization: Bearer $TOKEN"
```

**Crear historial clínico**
```bash
curl -X POST http://localhost:3000/api/historial_clinico/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id_mascota": 1,
    "descripcion": "Vacunación antirrábica aplicada correctamente."
  }'
```

---

### 👨‍⚕️ 5. Gestión de Colegas (Exclusivo Administradores)

**Listar todos los veterinarios**
```bash
curl -X GET http://localhost:3000/api/veterinarios \
  -H "Authorization: Bearer $TOKEN_ADMIN"
```
