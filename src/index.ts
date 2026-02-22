import duenosrouter from './routes/duenos.routes';
import express, { Request, Response } from 'express';
import 'dotenv/config';
import loginrouter from './routes/login.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

import mascotasrouter from './routes/mascotas.routes';
import historial_clinico_router from './routes/historial_clinico.routes';
import veterinariosrouter from './routes/veterinarios.routes';
import { authenticate, authorize } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.middleware';
import path from 'path';
import cors from 'cors';

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// Rutas protegidas
app.use('/api/dueno', authenticate, duenosrouter);
app.use('/api/mascotas', authenticate, mascotasrouter);
app.use('/api/historial_clinico', authenticate, historial_clinico_router);
app.use('/api/veterinarios', authenticate, veterinariosrouter);

// Rutas públicas
app.use('/api/login', loginrouter);

app.get('/api/saludo', (req: Request, res: Response) => {
  res.json({ mensaje: 'Hola desde la API 🚀' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});

// Ruta protegida (requiere autenticación)
app.get('/protected', authenticate, (req, res) => {
  res.json({
    message: 'Acceso permitido',
    user: req.veterinarios,
  });
});

// Ruta de administrador (requiere autenticación y rol admin)
app.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({
    message: 'Acceso de administrador permitido',
    user: req.veterinarios,
  });
});

app.use(errorHandler);