import { Request, Response, NextFunction } from 'express';
import * as duenosService from '../services/duenos.service';
import { duenosDTO, createDueno } from '../models/duenos.model';

export const showDuenos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
    const duenos = await duenosService.listDuenos(id_veterinario);
    res.status(200).json(duenos);
  } catch (error) {
    next(error);
  }
};

export const createDuenos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre, apellido, telefono, direccion } = req.body;

    const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
    const newDueno: duenosDTO = {
      nombre,
      apellido,
      telefono,
      direccion,
      id_veterinario
    };

    await duenosService.addDueno(newDueno);
    res
      .status(201)
      .json({ success: true, message: 'Dueño creado correctamente' })
  } catch (error) {
    next(error);
  }
};

export const updateDuenos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
    const { nombre, apellido, telefono, direccion } = req.body;
    const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
    const updatedDueno: duenosDTO = {
      nombre,
      apellido,
      telefono,
      direccion,
      id_veterinario
    };
    await duenosService.modifyDuenoById(id, updatedDueno, id_veterinario);
    res
      .status(200)
      .json({ success: true, message: 'Dueño actualizado correctamente' })
  }
  catch (error) {
    next(error);
  }
};

export const deleteDuenos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
    const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
    await duenosService.removeDuenoById(id, id_veterinario);
    res
      .status(200)
      .json({ success: true, message: 'Dueño eliminado correctamente' })
  } catch (error) {
    next(error);
  }
};