import { Request, Response, NextFunction } from 'express';
import * as historial_clinicoService from '../services/historial_clinico.service';
import { historial_clinicoDTO } from '../models/historial_clinico.model';

export const showHistorialClinico = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
    const historial_clinico = await historial_clinicoService.listHistorialClinico(id_veterinario);
    res.status(200).json(historial_clinico);
  } catch (error) {
    next(error);
  }
};

export const createHistorialClinico = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre, apellido, telefono, direccion } = req.body;

    const newHistorialClinico: historial_clinicoDTO = {
      id_mascota: req.body.id_mascota,
      id_veterinario: req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0,
      fecha_registro: req.body.fecha_registro,
      descripcion: req.body.descripcion
    };

    await historial_clinicoService.addHistorialClinico(newHistorialClinico);
    res
      .status(201)
      .json({ success: true, message: 'Historial clínico creado correctamente' })
  } catch (error) {
    next(error);
  }
};

export const updateHistorialClinico = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
    const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
    const { id_mascota, fecha_registro, descripcion } = req.body;
    const updatedHistorialClinico: historial_clinicoDTO = {
      id_mascota,
      id_veterinario: id_veterinario,
      fecha_registro,
      descripcion
    };
    await historial_clinicoService.modifyHistorialClinicoById(id, updatedHistorialClinico, id_veterinario);
    res
      .status(200)
      .json({ success: true, message: 'Historial clínico actualizado correctamente' })
  } catch (error) {
    next(error);
  }
};

export const deleteHistorialClinico = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
    const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
    await historial_clinicoService.removeHistorialClinicoById(id, id_veterinario);
    res
      .status(200)
      .json({ success: true, message: 'Historial clínico eliminado correctamente' })
  } catch (error) {
    next(error);
  }
};