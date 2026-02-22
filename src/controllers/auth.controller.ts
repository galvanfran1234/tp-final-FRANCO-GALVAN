import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, apellido, email, password, matricula, especialidad } = req.body;

    console.log('Registering user:', nombre, email);

    await authService.register({
      nombre,
      apellido,
      email,
      password,
      matricula,
      especialidad,
    });

    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    next(error);
  }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const token = await authService.login(email, password);

    return res.json({ token });
  } catch (error) {
    next(error);
  }
};