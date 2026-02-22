const API_URL = 'http://localhost:3000/api';

// Referencias a elementos del DOM
const loginForm = document.getElementById('loginForm');
const authSection = document.getElementById('authSection');
const appSection = document.getElementById('appSection');
const authError = document.getElementById('authError');
const logoutBtn = document.getElementById('logoutBtn');
const mascotasTable = document.getElementById('mascotasList');
const refreshBtn = document.getElementById('refreshBtn');
const mascotaForm = document.getElementById('mascotaForm');
const tableMsg = document.getElementById('tableMsg');
const formTitle = document.getElementById('formTitle');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formFeedback = document.getElementById('formFeedback');

// Variables de estado global
let currentToken = localStorage.getItem('token') || null;
let editingId = null;

// Inicialización de la UI
function checkAuth() {
    if (currentToken) {
        authSection.style.display = 'none';
        appSection.style.display = 'block';
        logoutBtn.style.display = 'inline-block';
        loadMascotas();
    } else {
        authSection.style.display = 'block';
        appSection.style.display = 'none';
        logoutBtn.style.display = 'none';
    }
}
checkAuth();

// ========================
// LOGICA DE AUTENTICACIÓN
// ========================

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    authError.textContent = '';

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/login/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            currentToken = data.token;
            localStorage.setItem('token', currentToken);
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
            checkAuth();
        } else {
            authError.textContent = data.error || data.errors?.[0]?.msg || 'Error al iniciar sesión';
        }
    } catch (err) {
        authError.textContent = 'Hubo un problema de conexión con el backend.';
    }
});

logoutBtn.addEventListener('click', () => {
    currentToken = null;
    localStorage.removeItem('token');
    checkAuth();
});

// ========================
// CRUD DE MASCOTAS
// ========================

async function loadMascotas() {
    tableMsg.textContent = 'Cargando...';
    mascotasTable.innerHTML = '';

    try {
        const response = await fetch(`${API_URL}/mascotas`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        });

        if (response.status === 401 || response.status === 403) {
            // Token expirado o inválido
            logoutBtn.click();
            return;
        }

        const mascotas = await response.json();

        if (mascotas.length === 0) {
            tableMsg.textContent = 'No tienes mascotas registradas.';
        } else {
            tableMsg.textContent = '';
            mascotas.forEach(renderMascotaRow);
        }
    } catch (err) {
        tableMsg.textContent = 'Fallo la conexión con el backend o la autenticación expiró.';
    }
}

function renderMascotaRow(m) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${m.id}</td>
        <td>${m.nombre}</td>
        <td>${m.especie}</td>
        <td>${m.fecha_nacimiento}</td>
        <td class="action-buttons">
            <button onclick="editMascota(${m.id}, '${m.nombre}', '${m.especie}', ${m.fecha_nacimiento}, ${m.id_dueno})" class="btn-edit">Editar</button>
            <button onclick="deleteMascota(${m.id})" class="btn-delete">Borrar</button>
        </td>
    `;
    mascotasTable.appendChild(tr);
}

// Handler de Creación y Edición
mascotaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formFeedback.textContent = 'Procesando...';
    formFeedback.className = 'feedback-msg';

    const payload = {
        nombre: document.getElementById('mNombre').value,
        especie: document.getElementById('mEspecie').value,
        fecha_nacimiento: parseInt(document.getElementById('mFecha').value),
        id_dueno: parseInt(document.getElementById('mDueno').value)
    };

    try {
        const isEditing = editingId !== null;
        const endpoint = isEditing ? `${API_URL}/mascotas/update/${editingId}` : `${API_URL}/mascotas/create`;
        const method = isEditing ? 'PUT' : 'POST';

        const response = await fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            formFeedback.textContent = data.message;
            formFeedback.style.color = '#2ecc71';
            resetForm();
            loadMascotas();
        } else {
            formFeedback.textContent = data.message || data.error || 'Error al guardar.';
            formFeedback.style.color = '#e74c3c';
        }
    } catch (err) {
        formFeedback.textContent = 'Error de conexión con el backend.';
        formFeedback.style.color = '#e74c3c';
    }
});

// Precargar datos para Edición
window.editMascota = function (id, nombre, especie, fecha, id_dueno) {
    editingId = id;
    formTitle.textContent = 'Editando Mascota #' + id;

    document.getElementById('mNombre').value = nombre;
    document.getElementById('mEspecie').value = especie;
    document.getElementById('mFecha').value = fecha;
    document.getElementById('mDueno').value = id_dueno;

    saveBtn.textContent = 'Actualizar';
    cancelBtn.style.display = 'inline-block';
    formFeedback.textContent = '';
};

// Borrado de registros
window.deleteMascota = async function (id) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta mascota? (ID: ' + id + ')')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/mascotas/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        });

        if (response.ok) {
            loadMascotas();
        } else {
            const data = await response.json();
            alert('Error: ' + (data.error || data.message || 'No se pudo eliminar'));
        }
    } catch (err) {
        alert('Hubo un problema de conexión con el backend.');
    }
};

// Funciones Auxiliares
function resetForm() {
    editingId = null;
    formTitle.textContent = 'Agregar Nueva Mascota';
    saveBtn.textContent = 'Guardar';
    cancelBtn.style.display = 'none';

    document.getElementById('mNombre').value = '';
    document.getElementById('mEspecie').value = '';
    document.getElementById('mFecha').value = '';
    document.getElementById('mDueno').value = '';
}

cancelBtn.addEventListener('click', () => {
    resetForm();
    formFeedback.textContent = '';
});

refreshBtn.addEventListener('click', loadMascotas);
