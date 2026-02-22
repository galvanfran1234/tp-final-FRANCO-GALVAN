import { RowDataPacket } from 'mysql2';
import pool from '../database/mysql';
import { AppError } from '../types/appError';
export type duenosRow = duenos & RowDataPacket;


export interface duenos {
  id: number,
  nombre: string,
  apellido: string,
  telefono: number,
  direccion: string,
  id_veterinario: number
}

export interface duenosDTO {
  nombre: string,
  apellido: string,
  telefono: number,
  direccion: string,
  id_veterinario: number
}

export const getAllDuenos = async (id_veterinario: number): Promise<duenosRow[]> => {
  const [rows] = await pool.query<duenosRow[]>(`
    SELECT d.id, d.nombre, d.apellido, d.telefono, d.direccion, d.id_veterinario
    FROM duenos d
    WHERE d.id_veterinario = ?
  `, [id_veterinario]);

  return rows;
}

export const createDueno = async (data: duenosDTO): Promise<void> => {
  const { nombre, apellido, telefono, direccion, id_veterinario } = data;

  await pool.query(
    'INSERT INTO duenos (nombre, apellido, telefono, direccion, id_veterinario) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, telefono, direccion, id_veterinario]
  );
}

export const deleteDuenoById = async (id: number, id_veterinario: number): Promise<void> => {
  const [result] = await pool.query(
    'DELETE FROM duenos WHERE id = ? AND id_veterinario = ?',
    [id, id_veterinario]
  );
  if ((result as any).affectedRows === 0) {
    throw new AppError('No se encontró el dueño o no tienes permisos para eliminarlo.', 404);
  }
}

export const updateDuenoById = async (id: number, data: duenosDTO, id_veterinario: number): Promise<void> => {
  const { nombre, apellido, telefono, direccion } = data;
  const [result] = await pool.query(
    'UPDATE duenos SET nombre = ?, apellido = ?, telefono = ?, direccion = ? WHERE id = ? AND id_veterinario = ?',
    [nombre, apellido, telefono, direccion, id, id_veterinario]
  );
  if ((result as any).affectedRows === 0) {
    throw new AppError('No se encontró el dueño o no tienes permisos para actualizarlo.', 404);
  }
}