import * as veterinariosModel from '../models/veterinarios.model';
import { veterinariosDTO, veterinarios } from '../models/veterinarios.model';
import { UserRole } from '../types/auth';
import bcrypt from 'bcrypt';


export const listVeterinarios = async (): Promise<veterinarios[]> => {
  return veterinariosModel.getAllVeterinarios();
};

export const addVeterinario = async (data: veterinariosDTO): Promise<void> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  await veterinariosModel.createVeterinario({
    ...data,
    password: hashedPassword,
    role: data.role as UserRole,
  });
};

export const modifyVeterinarioById = async (id: number, data: veterinariosDTO): Promise<void> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  await veterinariosModel.updateVeterinarioById(id, {
    ...data,
    password: hashedPassword,
    role: data.role as UserRole,
  });
};

export const removeVeterinarioById = async (id: number): Promise<void> => {
  await veterinariosModel.deleteVeterinarioById(id);
};