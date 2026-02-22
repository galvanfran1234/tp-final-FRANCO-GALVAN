import * as mascotasModel from '../models/mascotas.model';
import { mascotasDTO, mascotas } from '../models/mascotas.model';

export const listMascotas = async (id_veterinario: number): Promise<mascotas[]> => {
  return mascotasModel.getAllMascotas(id_veterinario);
};

export const addMascota = async (data: mascotasDTO): Promise<void> => {
  await mascotasModel.createMascota(data);
};

export const modifyMascotaById = async (id: number, data: mascotasDTO, id_veterinario: number): Promise<void> => {
  await mascotasModel.updateMascotaById(id, data, id_veterinario);
};

export const removeMascotaById = async (id: number, id_veterinario: number): Promise<void> => {
  await mascotasModel.deleteMascotaById(id, id_veterinario);
};
