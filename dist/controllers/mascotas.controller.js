"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMascotas = exports.updateMascotas = exports.createMascotas = exports.showMascotas = void 0;
const mascotasService = __importStar(require("../services/mascotas.service"));
const showMascotas = async (req, res, next) => {
    try {
        const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
        const mascotas = await mascotasService.listMascotas(id_veterinario);
        res.status(200).json(mascotas);
    }
    catch (error) {
        next(error);
    }
};
exports.showMascotas = showMascotas;
const createMascotas = async (req, res, next) => {
    try {
        const { nombre, especie, fecha_nacimiento, id_dueno } = req.body;
        const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
        const newMascota = {
            nombre,
            especie,
            fecha_nacimiento,
            id_dueno,
            id_veterinario
        };
        await mascotasService.addMascota(newMascota);
        res
            .status(201)
            .json({ success: true, message: 'Mascota creada correctamente' });
    }
    catch (error) {
        next(error);
    }
};
exports.createMascotas = createMascotas;
const updateMascotas = async (req, res, next) => {
    try {
        const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
        const { nombre, especie, fecha_nacimiento, id_dueno } = req.body;
        const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
        const updatedMascota = {
            nombre,
            especie,
            fecha_nacimiento,
            id_dueno,
            id_veterinario
        };
        await mascotasService.modifyMascotaById(id, updatedMascota, id_veterinario);
        res
            .status(200)
            .json({ success: true, message: 'Mascota actualizada correctamente' });
    }
    catch (error) {
        next(error);
    }
};
exports.updateMascotas = updateMascotas;
const deleteMascotas = async (req, res, next) => {
    try {
        const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
        const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
        await mascotasService.removeMascotaById(id, id_veterinario);
        res
            .status(200)
            .json({ success: true, message: 'Mascota eliminada correctamente' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMascotas = deleteMascotas;
