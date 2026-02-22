import { RowDataPacket } from 'mysql2';
import pool from '../database/mysql';
import { AppError } from '../types/appError';
export type historial_clinicoRow = historial_clinico & RowDataPacket;

export interface historial_clinico {
  id: number,
  id_mascota: number,
  id_veterinario: number,
  fecha_registro: Date,
  descripcion: string
}

export interface historial_clinicoDTO {
  id_mascota: number,
  id_veterinario: number,
  fecha_registro: Date,
  descripcion: string
}

export const getAllHistorialClinico = async (id_veterinario: number): Promise<historial_clinicoRow[]> => {
  const [rows] = await pool.query<historial_clinicoRow[]>(`
    SELECT h.id, h.id_mascota, h.id_veterinario, h.fecha_registro, h.descripcion
    FROM historial_clinico h
    WHERE h.id_veterinario = ?
  `, [id_veterinario]);

  return rows;
}

export const createHistorialClinico = async (data: historial_clinicoDTO): Promise<void> => {
  const { id_mascota, id_veterinario, fecha_registro, descripcion } = data;

  await pool.query(
    'INSERT INTO historial_clinico (id_mascota, id_veterinario, fecha_registro, descripcion) VALUES (?, ?, ?, ?)',
    [data.id_mascota, data.id_veterinario, data.fecha_registro, data.descripcion]
  );
}

export const deleteHistorialClinicoById = async (id: number, id_veterinario: number): Promise<void> => {
  const [result] = await pool.query(
    'DELETE FROM historial_clinico WHERE id = ? AND id_veterinario = ?',
    [id, id_veterinario]
  );
  if ((result as any).affectedRows === 0) {
    throw new AppError('No se encontró el historial clínico o no tienes permisos para eliminarlo.', 404);
  }
}

export const updateHistorialClinicoById = async (id: number, data: historial_clinicoDTO, id_veterinario: number): Promise<void> => {
  const { id_mascota, fecha_registro, descripcion } = data;
  const [result] = await pool.query(
    'UPDATE historial_clinico SET id_mascota = ?, fecha_registro = ?, descripcion = ? WHERE id = ? AND id_veterinario = ?',
    [id_mascota, fecha_registro, descripcion, id, id_veterinario]
  );
  if ((result as any).affectedRows === 0) {
    throw new AppError('No se encontró el historial clínico o no tienes permisos para actualizarlo.', 404);
  }
}