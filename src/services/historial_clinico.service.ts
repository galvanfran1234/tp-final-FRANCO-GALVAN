import * as historial_clinicoModel from '../models/historial_clinico.model';
import { historial_clinicoDTO, historial_clinico } from '../models/historial_clinico.model';

export const listHistorialClinico = async (id_veterinario: number): Promise<historial_clinico[]> => {
  return historial_clinicoModel.getAllHistorialClinico(id_veterinario);
};

export const addHistorialClinico = async (data: historial_clinicoDTO): Promise<void> => {
  await historial_clinicoModel.createHistorialClinico(data);
};

export const modifyHistorialClinicoById = async (id: number, data: historial_clinicoDTO, id_veterinario: number): Promise<void> => {
  await historial_clinicoModel.updateHistorialClinicoById(id, data, id_veterinario);
};

export const removeHistorialClinicoById = async (id: number, id_veterinario: number): Promise<void> => {
  await historial_clinicoModel.deleteHistorialClinicoById(id, id_veterinario);
}
