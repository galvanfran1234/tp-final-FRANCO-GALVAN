import { Request, Response, NextFunction } from 'express';
import * as mascotasService from '../services/mascotas.service';
import { mascotasDTO, createMascota } from '../models/mascotas.model';

export const showMascotas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
    const mascotas = await mascotasService.listMascotas(id_veterinario);
    res.status(200).json(mascotas);
  } catch (error) {
    next(error);
  }
};

export const createMascotas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre, especie, fecha_nacimiento, id_dueno } = req.body;

    const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
    const newMascota: mascotasDTO = {
      nombre,
      especie,
      fecha_nacimiento,
      id_dueno,
      id_veterinario
    };

    await mascotasService.addMascota(newMascota);
    res
      .status(201)
      .json({ success: true, message: 'Mascota creada correctamente' })
  } catch (error) {
    next(error);
  }
};

export const updateMascotas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
    const { nombre, especie, fecha_nacimiento, id_dueno } = req.body;
    const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
    const updatedMascota: mascotasDTO = {
      nombre,
      especie,
      fecha_nacimiento,
      id_dueno,
      id_veterinario
    };
    await mascotasService.modifyMascotaById(id, updatedMascota, id_veterinario);
    res
      .status(200)
      .json({ success: true, message: 'Mascota actualizada correctamente' })
  }
  catch (error) {
    next(error);
  }
};

export const deleteMascotas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
    const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
    await mascotasService.removeMascotaById(id, id_veterinario);
    res
      .status(200)
      .json({ success: true, message: 'Mascota eliminada correctamente' })
  } catch (error) {
    next(error);
  }
};