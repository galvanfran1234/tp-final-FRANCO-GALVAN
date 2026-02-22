"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const duenos_routes_1 = __importDefault(require("./routes/duenos.routes"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
const mascotas_routes_1 = __importDefault(require("./routes/mascotas.routes"));
const historial_clinico_routes_1 = __importDefault(require("./routes/historial_clinico.routes"));
const veterinarios_routes_1 = __importDefault(require("./routes/veterinarios.routes"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Rutas protegidas
app.use('/api/dueno', auth_middleware_1.authenticate, duenos_routes_1.default);
app.use('/api/mascotas', auth_middleware_1.authenticate, mascotas_routes_1.default);
app.use('/api/historial_clinico', auth_middleware_1.authenticate, historial_clinico_routes_1.default);
app.use('/api/veterinarios', auth_middleware_1.authenticate, veterinarios_routes_1.default);
// Rutas públicas
app.use('/api/login', login_routes_1.default);
app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: 'Hola desde la API 🚀' });
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});
// Ruta protegida (requiere autenticación)
app.get('/protected', auth_middleware_1.authenticate, (req, res) => {
    res.json({
        message: 'Acceso permitido',
        user: req.veterinarios,
    });
});
// Ruta de administrador (requiere autenticación y rol admin)
app.get('/admin', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin']), (req, res) => {
    res.json({
        message: 'Acceso de administrador permitido',
        user: req.veterinarios,
    });
});
app.use(error_middleware_1.errorHandler);
