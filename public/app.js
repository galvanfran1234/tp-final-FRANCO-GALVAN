// URL relativa para funcionar en localhost y en cualquier hosting en la nube (Render, Railway, etc.)
const API_URL = '/api';

// Referencias del DOM
const authSection = document.getElementById('authSection');
const appSection = document.getElementById('appSection');
const logoutBtn = document.getElementById('logoutBtn');
const userGreeting = document.getElementById('userGreeting');

// Formularios y Pestañas
const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const btnQuickDemo = document.getElementById('btnQuickDemo');
const authError = document.getElementById('authError');
const authSuccess = document.getElementById('authSuccess');

// Elementos CRUD
const mascotasTable = document.getElementById('mascotasList');
const refreshBtn = document.getElementById('refreshBtn');
const mascotaForm = document.getElementById('mascotaForm');
const tableMsg = document.getElementById('tableMsg');
const formTitle = document.getElementById('formTitle');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formFeedback = document.getElementById('formFeedback');
const statsBadge = document.getElementById('statsBadge');

// Estado global
let currentToken = localStorage.getItem('vet_token') || null;
let currentUserName = localStorage.getItem('vet_user_name') || null;
let editingId = null;

// ========================
// INICIALIZACIÓN
// ========================

function checkAuth() {
    if (currentToken) {
        authSection.style.display = 'none';
        appSection.style.display = 'block';
        logoutBtn.style.display = 'inline-block';
        if (currentUserName) {
            userGreeting.textContent = `Dr(a). ${currentUserName}`;
            userGreeting.style.display = 'inline-block';
        }
        loadMascotas();
    } else {
        authSection.style.display = 'flex';
        appSection.style.display = 'none';
        logoutBtn.style.display = 'none';
        userGreeting.style.display = 'none';
    }
}

// Alternar entre pestañas Login y Registro
tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    authError.textContent = '';
    authSuccess.textContent = '';
});

tabRegister.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    authError.textContent = '';
    authSuccess.textContent = '';
});

// Botón de Acceso Rápido Demo (1-Click para Evaluadores y Reclutadores)
btnQuickDemo.addEventListener('click', () => {
    tabLogin.click();
    document.getElementById('loginEmail').value = 'demo@veterinaria.com';
    document.getElementById('loginPassword').value = 'Password123!';
    loginForm.dispatchEvent(new Event('submit'));
});

// ========================
// AUTENTICACIÓN
// ========================

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    authError.textContent = '';
    authSuccess.textContent = '';

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/login/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            currentToken = data.token;
            localStorage.setItem('vet_token', currentToken);

            // Intentar leer datos básicos del payload JWT
            try {
                const base64Url = currentToken.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const payload = JSON.parse(jsonPayload);
                currentUserName = payload.nombre || 'Colega';
                localStorage.setItem('vet_user_name', currentUserName);
            } catch (err) {
                currentUserName = 'Colega';
            }

            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
            checkAuth();
        } else {
            authError.textContent = data.message || data.error || (data.errors && data.errors[0]?.msg) || 'Error al iniciar sesión';
        }
    } catch (err) {
        authError.textContent = 'No se pudo conectar con el servidor. Verifica que el backend esté activo.';
    }
});

// Registro
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    authError.textContent = '';
    authSuccess.textContent = '';

    const payload = {
        nombre: document.getElementById('regNombre').value.trim(),
        apellido: document.getElementById('regApellido').value.trim(),
        matricula: document.getElementById('regMatricula').value.trim(),
        especialidad: document.getElementById('regEspecialidad').value.trim() || 'General',
        email: document.getElementById('regEmail').value.trim(),
        password: document.getElementById('regPassword').value
    };

    try {
        const response = await fetch(`${API_URL}/login/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            authSuccess.textContent = '¡Cuenta creada con éxito! Ya puedes iniciar sesión.';
            document.getElementById('loginEmail').value = payload.email;
            document.getElementById('loginPassword').value = payload.password;
            registerForm.reset();
            tabLogin.click();
        } else {
            const errorMsg = data.message || (data.errors && data.errors.map(err => err.msg).join(', ')) || 'Error al registrar usuario';
            authError.textContent = errorMsg;
        }
    } catch (err) {
        authError.textContent = 'Error al conectar con el servidor.';
    }
});

// Cerrar sesión
logoutBtn.addEventListener('click', () => {
    currentToken = null;
    currentUserName = null;
    localStorage.removeItem('vet_token');
    localStorage.removeItem('vet_user_name');
    checkAuth();
});

// ========================
// CRUD DE MASCOTAS
// ========================

async function loadMascotas() {
    tableMsg.textContent = 'Cargando mascotas...';
    mascotasTable.innerHTML = '';

    try {
        const response = await fetch(`${API_URL}/mascotas`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        });

        if (response.status === 401 || response.status === 403) {
            logoutBtn.click();
            return;
        }

        const mascotas = await response.json();

        if (!Array.isArray(mascotas) || mascotas.length === 0) {
            tableMsg.textContent = 'Aún no tienes mascotas registradas. ¡Agrega una desde el formulario!';
            if (statsBadge) statsBadge.textContent = '0 pacientes registrados';
        } else {
            tableMsg.textContent = '';
            if (statsBadge) statsBadge.textContent = `${mascotas.length} paciente${mascotas.length > 1 ? 's' : ''} registrado${mascotas.length > 1 ? 's' : ''}`;
            mascotas.forEach(renderMascotaRow);
        }
    } catch (err) {
        tableMsg.textContent = 'Error al cargar mascotas. Verifica la conexión con el servidor.';
    }
}

function renderMascotaRow(m) {
    const tr = document.createElement('tr');
    const fecha = m.fecha_nacimiento ? String(m.fecha_nacimiento).split('T')[0] : 'N/A';
    const idDueno = m.id_dueno || 'Sin asignar';

    tr.innerHTML = `
        <td><strong>#${m.id}</strong></td>
        <td>${escapeHtml(m.nombre)}</td>
        <td>${escapeHtml(m.especie)}</td>
        <td>${escapeHtml(fecha)}</td>
        <td>${escapeHtml(String(idDueno))}</td>
        <td class="action-buttons">
            <button class="btn-edit" data-id="${m.id}" data-nombre="${escapeAttr(m.nombre)}" data-especie="${escapeAttr(m.especie)}" data-fecha="${escapeAttr(fecha)}" data-dueno="${escapeAttr(String(idDueno))}">Editar</button>
            <button class="btn-delete" data-id="${m.id}">Borrar</button>
        </td>
    `;

    // Event listeners directos para evitar problemas de comillas en onclick
    tr.querySelector('.btn-edit').addEventListener('click', (e) => {
        const btn = e.currentTarget;
        editMascota(
            btn.getAttribute('data-id'),
            btn.getAttribute('data-nombre'),
            btn.getAttribute('data-especie'),
            btn.getAttribute('data-fecha'),
            btn.getAttribute('data-dueno')
        );
    });

    tr.querySelector('.btn-delete').addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        deleteMascota(id);
    });

    mascotasTable.appendChild(tr);
}

// Guardar / Editar Mascota
mascotaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formFeedback.textContent = 'Guardando...';
    formFeedback.style.color = '#2563eb';

    const payload = {
        nombre: document.getElementById('mNombre').value.trim(),
        especie: document.getElementById('mEspecie').value.trim(),
        fecha_nacimiento: document.getElementById('mFecha').value.trim(),
        id_dueno: parseInt(document.getElementById('mDueno').value, 10)
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
            formFeedback.textContent = data.message || 'Operación completada con éxito.';
            formFeedback.style.color = '#10b981';
            resetForm();
            loadMascotas();
        } else {
            formFeedback.textContent = data.message || data.error || 'Error al procesar la solicitud.';
            formFeedback.style.color = '#ef4444';
        }
    } catch (err) {
        formFeedback.textContent = 'Error de conexión con el backend.';
        formFeedback.style.color = '#ef4444';
    }
});

function editMascota(id, nombre, especie, fecha, id_dueno) {
    editingId = id;
    formTitle.textContent = `Editando Mascota #${id}`;

    document.getElementById('mNombre').value = nombre;
    document.getElementById('mEspecie').value = especie;
    document.getElementById('mFecha').value = fecha !== 'N/A' ? fecha : '';
    document.getElementById('mDueno').value = id_dueno !== 'Sin asignar' ? id_dueno : '';

    saveBtn.textContent = 'Actualizar Mascota';
    cancelBtn.style.display = 'inline-block';
    formFeedback.textContent = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteMascota(id) {
    if (!confirm(`¿Estás seguro de que deseas eliminar la mascota #${id}?`)) {
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
            alert('Error: ' + (data.message || data.error || 'No se pudo eliminar'));
        }
    } catch (err) {
        alert('Hubo un problema de conexión con el backend.');
    }
}

function resetForm() {
    editingId = null;
    formTitle.textContent = 'Agregar Nueva Mascota';
    saveBtn.textContent = 'Guardar Mascota';
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

// Helpers de escape para evitar inyecciones XSS
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeAttr(str) {
    if (!str) return '';
    return String(str)
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Iniciar aplicación
checkAuth();
