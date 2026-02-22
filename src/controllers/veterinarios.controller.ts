import { Request, Response, NextFunction } from 'express';
import * as veterinariosService from '../services/veterinarios.service';
import { veterinariosDTO, createVeterinario } from '../models/veterinarios.model';
import { UserRole } from '../types/auth';

export const showVeterinarios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const veterinarios = await veterinariosService.listVeterinarios();
    res.status(200).json(veterinarios);
  } catch (error) {
    next(error);
  }
};

export const createVeterinarios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre, apellido, matricula, especialidad, email, password } = req.body;

    const newVeterinario: veterinariosDTO = {
      nombre,
      apellido,
      matricula,
      especialidad,
      email,
      password,
      role: UserRole.USER
    };

    await veterinariosService.addVeterinario(newVeterinario);
    res
      .status(201)
      .json({ success: true, message: 'Veterinario creado correctamente' })
  } catch (error) {
    next(error);
  }
};

export const updateVeterinarios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
    const { nombre, apellido, matricula, especialidad, email, password } = req.body;
    const updatedVeterinario: veterinariosDTO = {
      nombre,
      apellido,
      matricula,
      especialidad,
      email,
      password,
      role: UserRole.USER
    };
    await veterinariosService.modifyVeterinarioById(id, updatedVeterinario);
    res
      .status(200)
      .json({ success: true, message: 'Veterinario actualizado correctamente' })
  }
  catch (error) {
    next(error);
  }
};

export const deleteVeterinarios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
    await veterinariosService.removeVeterinarioById(id);
    res
      .status(200)
      .json({ success: true, message: 'Veterinario eliminado correctamente' })
  } catch (error) {
    next(error);
  }
};