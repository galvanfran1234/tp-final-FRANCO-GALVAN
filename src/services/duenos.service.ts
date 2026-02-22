import * as duenosModel from '../models/duenos.model';
import { duenosDTO, duenos } from '../models/duenos.model';

export const listDuenos = async (id_veterinario: number): Promise<duenos[]> => {
  return duenosModel.getAllDuenos(id_veterinario);
};

export const addDueno = async (data: duenosDTO): Promise<void> => {
  await duenosModel.createDueno(data);
};

export const modifyDuenoById = async (id: number, data: duenosDTO, id_veterinario: number): Promise<void> => {
  await duenosModel.updateDuenoById(id, data, id_veterinario);
};

export const removeDuenoById = async (id: number, id_veterinario: number): Promise<void> => {
  await duenosModel.deleteDuenoById(id, id_veterinario);
};
