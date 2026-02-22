export interface JwtPayload {
  //jsonwebtoken Payload personalizado
  id: string;
  nombre: string;
  role: UserRole;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface AuthRequest extends Request {
  user?: JwtPayload; // Agrega la propiedad user al tipo Request
}

export interface LoginRequest {
  nombre: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  password: string;
  role: UserRole;
}
