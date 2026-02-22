import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '../database/mysql';
import { UserRole } from '../types/auth';
export type veterinariosRow = veterinarios & RowDataPacket;


export interface veterinarios {
  role: UserRole;
  password: string;
  id: number,
  nombre: string,
  apellido: string,
  email: string,
  matricula: string,
  especialidad: string
}

export interface veterinariosDTO {
  nombre: string,
  apellido: string,
  email: string,
  password: string,
  matricula: string,
  especialidad: string
  role: UserRole;
}

export const getAllVeterinarios = async (): Promise<veterinariosRow[]> => {
  const [rows] = await pool.query<veterinariosRow[]>(`
    SELECT v.id, v.nombre, v.apellido, v.matricula, v.especialidad
    FROM veterinarios v
  `);

  return rows;
}

export const createVeterinario = async (data: veterinariosDTO): Promise<number> => {
  const { nombre, apellido, email, password, matricula, especialidad, role } = data;

  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO veterinarios (nombre, apellido, email, password, matricula, especialidad, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, apellido, email, password, matricula, especialidad, role]
  );
  return result.insertId;
}

export const deleteVeterinarioById = async (id: number): Promise<void> => {
  await pool.query(
    'DELETE FROM veterinarios WHERE id = ?',
    [id]
  );
}

export const updateVeterinarioById = async (id: number, data: veterinariosDTO): Promise<void> => {
  const { nombre, apellido, matricula, especialidad } = data;
  await pool.query(
    'UPDATE veterinarios SET nombre = ?,  apellido = ?, matricula = ?, especialidad = ? WHERE id = ?',
    [nombre, apellido, matricula, especialidad, id]
  );
}

export const findVeterinarioByEmail = async (email: string): Promise<veterinariosRow | null> => {
  const [rows] = await pool.query<veterinariosRow[]>(
    'SELECT * FROM veterinarios WHERE email = ?',
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const findVeterinarioById = async (id: number): Promise<veterinariosRow | null> => {
  const [rows] = await pool.query<veterinariosRow[]>(
    'SELECT * FROM veterinarios WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};
