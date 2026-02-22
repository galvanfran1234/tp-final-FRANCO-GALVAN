### 🔐 Autenticación (Público)

**Registrar un usuario**
```bash
curl -X POST http://localhost:3000/api/login/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "Juan_Perez",
    "email": "juan@example.com",
    "password": "Password123!"
  }'
```

**Iniciar sesión (Login)**
*(Este te devuelve el token que vas a usar en las demás peticiones)*
```bash
curl -X POST http://localhost:3000/api/login/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "Password123!"
  }'
```

---

### 👨‍⚕️ Veterinarios

**Obtener todos los veterinarios** (Protegido)
```bash
curl -X GET http://localhost:3000/api/veterinarios/ \
  -H "Authorization: Bearer $TOKEN"
```

**Crear un veterinario** (Protegido - Requiere rol de admin)
```bash
curl -X POST http://localhost:3000/api/veterinarios/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Dr. Carlos",
    "especialidad": "Cirugía"
  }'
```

**Actualizar un veterinario** (Protegido - Requiere rol de admin)
```bash
curl -X PUT http://localhost:3000/api/veterinarios/update/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "especialidad": "Medicina General"
  }'
```

**Eliminar un veterinario** (Protegido - Requiere rol de admin)
```bash
curl -X DELETE http://localhost:3000/api/veterinarios/delete/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

### 🧍 Dueños

**Obtener todos los dueños** (Protegido)
```bash
curl -X GET http://localhost:3000/api/dueno/ \
  -H "Authorization: Bearer $TOKEN"
```

**Crear un dueño** (Protegido)
```bash
curl -X POST http://localhost:3000/api/dueno/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Maria Gomez",
    "telefono": "123456789"
  }'
```

**Actualizar un dueño** (Protegido)
```bash
curl -X PUT http://localhost:3000/api/dueno/update/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telefono": "987654321"
  }'
```

**Eliminar un dueño** (Protegido)
```bash
curl -X DELETE http://localhost:3000/api/dueno/delete/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

### 🐶 Mascotas

**Obtener todas las mascotas** (Protegido)
```bash
curl -X GET http://localhost:3000/api/mascotas/ \
  -H "Authorization: Bearer $TOKEN"
```

**Crear una mascota** (Protegido)
```bash
curl -X POST http://localhost:3000/api/mascotas/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Firulais",
    "especie": "Perro",
    "raza": "Mestizo",
    "dueno_id": 1
  }'
```

**Actualizar una mascota** (Protegido)
```bash
curl -X PUT http://localhost:3000/api/mascotas/update/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "peso": 15.5
  }'
```

**Eliminar una mascota** (Protegido)
```bash
curl -X DELETE http://localhost:3000/api/mascotas/delete/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

### 📋 Historial Clínico

**Obtener historiales clínicos** (Protegido)
```bash
curl -X GET http://localhost:3000/api/historial_clinico/ \
  -H "Authorization: Bearer $TOKEN"
```

**Crear una entrada de historial** (Protegido)
```bash
curl -X POST http://localhost:3000/api/historial_clinico/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "mascota_id": 1,
    "descripcion": "Chequeo de rutina",
    "fecha": "2023-11-20"
  }'
```

**Actualizar una entrada de historial** (Protegido)
```bash
curl -X PUT http://localhost:3000/api/historial_clinico/update/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "descripcion": "Chequeo de rutina + Vancuna Antirrábica"
  }'
```

**Eliminar una entrada de historial** (Protegido)
```bash
curl -X DELETE http://localhost:3000/api/historial_clinico/delete/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

### ⚙️ Otras Rutas de Prueba

**API Saludo** (Público)
```bash
curl -X GET http://localhost:3000/api/saludo
```

**Ruta Protegida General** (Protegido)
```bash
curl -X GET http://localhost:3000/protected \
  -H "Authorization: Bearer $TOKEN"
```

**Ruta Admin General** (Protegido - Requiere rol de admin)
```bash
curl -X GET http://localhost:3000/admin \
  -H "Authorization: Bearer $TOKEN"
```
