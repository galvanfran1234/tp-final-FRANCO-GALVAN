import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/auth';
import * as veterinariosModel from '../models/veterinarios.model';

declare global {
  namespace Express {
    interface Request {
      veterinarios?: JwtPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Middleware de autenticación
 *
 * Verifica que el token sea válido y lo almacena en req.user
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    console.log('Token recibido en authenticate:', token);

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Verificación Activa: Comprobar que el usuario aún existe en la base de datos
    const userExists = await veterinariosModel.findVeterinarioById(parseInt(decoded.id, 10));
    if (!userExists) {
      return res.status(401).json({ message: 'El usuario ya no existe o fue eliminado. Acceso denegado.' });
    }

    req.veterinarios = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token or expired' });
  }
};

/**
 * Middleware de autorización
 *
 * Verifica que el usuario tenga uno de los roles permitidos
 */
export const authorize = (roles: Array<'user' | 'admin'>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.veterinarios || !roles.includes(req.veterinarios.role)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  };
};
