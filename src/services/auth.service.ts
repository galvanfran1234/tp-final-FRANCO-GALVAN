import bcrypt from 'bcrypt';
import * as veterinariosModel from '../models/veterinarios.model';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload, UserRole } from '../types/auth';
import { AppError } from '../types/appError';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no definido');
}
const secretKey: string = process.env.JWT_SECRET;

export const register = async (
  data: Omit<veterinariosModel.veterinariosDTO, 'role'>
): Promise<number> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const insertId = await veterinariosModel.createVeterinario({
    ...data,
    password: hashedPassword,
    role: UserRole.USER,
  });

  if (!insertId) {
    throw new AppError('Error al crear veterinario', 500);
  }
  return insertId;
};

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const invalidCredentialsError = new Error('Credenciales inválidas');
  const user = await veterinariosModel.findVeterinarioByEmail(email);

  if (!user) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw invalidCredentialsError;
  }

  const payload: JwtPayload = {
    id: String(user.id),
    role: user.role as UserRole,
    nombre: user.nombre
  };

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1h',
    issuer: 'Franco Galvan - curso-utn-backend',
  };

  return jwt.sign(payload, secretKey, options);
};