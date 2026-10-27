import { RowDataPacket } from 'mysql2';
import pool from '../database/mysql';
import { AppError } from '../types/appError';
export type mascotasRow = mascotas & RowDataPacket;

export interface mascotas {
  id: number;
  nombre: string;
  especie: string;
  fecha_nacimiento: string | number;
  id_dueno: number;
  id_veterinario: number;
}

export interface mascotasDTO {
  nombre: string;
  especie: string;
  fecha_nacimiento: string | number;
  id_dueno: number;
  id_veterinario: number;
}

export const getAllMascotas = async (id_veterinario: number): Promise<mascotasRow[]> => {
  const [rows] = await pool.query<mascotasRow[]>(`
    SELECT m.id, m.nombre, m.especie, m.fecha_nacimiento, m.id_dueno, m.id_veterinario
    FROM mascotas m
    WHERE m.id_veterinario = ?
  `, [id_veterinario]);

  return rows;
};

export const createMascota = async (data: mascotasDTO): Promise<void> => {
  const { nombre, especie, fecha_nacimiento, id_dueno, id_veterinario } = data;

  await pool.query(
    'INSERT INTO mascotas (nombre, especie, fecha_nacimiento, id_dueno, id_veterinario) VALUES (?, ?, ?, ?, ?)',
    [nombre, especie, fecha_nacimiento, id_dueno, id_veterinario]
  );
};

export const deleteMascotaById = async (id: number, id_veterinario: number): Promise<void> => {
  const [result] = await pool.query(
    'DELETE FROM mascotas WHERE id = ? AND id_veterinario = ?',
    [id, id_veterinario]
  );
  if ((result as any).affectedRows === 0) {
    throw new AppError('No se encontró la mascota o no tienes permisos para eliminarla.', 404);
  }
};

export const updateMascotaById = async (id: number, data: mascotasDTO, id_veterinario: number): Promise<void> => {
  const { nombre, especie, fecha_nacimiento, id_dueno } = data;
  const [result] = await pool.query(
    'UPDATE mascotas SET nombre = ?, especie = ?, fecha_nacimiento = ?, id_dueno = ? WHERE id = ? AND id_veterinario = ?',
    [nombre, especie, fecha_nacimiento, id_dueno, id, id_veterinario]
  );
  if ((result as any).affectedRows === 0) {
    throw new AppError('No se encontró la mascota o no tienes permisos para actualizarla.', 404);
  }
};
