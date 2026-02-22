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
exports.deleteHistorialClinico = exports.updateHistorialClinico = exports.createHistorialClinico = exports.showHistorialClinico = void 0;
const historial_clinicoService = __importStar(require("../services/historial_clinico.service"));
const showHistorialClinico = async (req, res, next) => {
    try {
        const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
        const historial_clinico = await historial_clinicoService.listHistorialClinico(id_veterinario);
        res.status(200).json(historial_clinico);
    }
    catch (error) {
        next(error);
    }
};
exports.showHistorialClinico = showHistorialClinico;
const createHistorialClinico = async (req, res, next) => {
    try {
        const { nombre, apellido, telefono, direccion } = req.body;
        const newHistorialClinico = {
            id_mascota: req.body.id_mascota,
            id_veterinario: req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0,
            fecha_registro: req.body.fecha_registro,
            descripcion: req.body.descripcion
        };
        await historial_clinicoService.addHistorialClinico(newHistorialClinico);
        res
            .status(201)
            .json({ success: true, message: 'Historial clínico creado correctamente' });
    }
    catch (error) {
        next(error);
    }
};
exports.createHistorialClinico = createHistorialClinico;
const updateHistorialClinico = async (req, res, next) => {
    try {
        const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
        const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
        const { id_mascota, fecha_registro, descripcion } = req.body;
        const updatedHistorialClinico = {
            id_mascota,
            id_veterinario: id_veterinario,
            fecha_registro,
            descripcion
        };
        await historial_clinicoService.modifyHistorialClinicoById(id, updatedHistorialClinico, id_veterinario);
        res
            .status(200)
            .json({ success: true, message: 'Historial clínico actualizado correctamente' });
    }
    catch (error) {
        next(error);
    }
};
exports.updateHistorialClinico = updateHistorialClinico;
const deleteHistorialClinico = async (req, res, next) => {
    try {
        const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
        const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
        await historial_clinicoService.removeHistorialClinicoById(id, id_veterinario);
        res
            .status(200)
            .json({ success: true, message: 'Historial clínico eliminado correctamente' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteHistorialClinico = deleteHistorialClinico;
