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
exports.deleteVeterinarios = exports.updateVeterinarios = exports.createVeterinarios = exports.showVeterinarios = void 0;
const veterinariosService = __importStar(require("../services/veterinarios.service"));
const auth_1 = require("../types/auth");
const showVeterinarios = async (req, res, next) => {
    try {
        const veterinarios = await veterinariosService.listVeterinarios();
        res.status(200).json(veterinarios);
    }
    catch (error) {
        next(error);
    }
};
exports.showVeterinarios = showVeterinarios;
const createVeterinarios = async (req, res, next) => {
    try {
        const { nombre, apellido, matricula, especialidad, email, password } = req.body;
        const newVeterinario = {
            nombre,
            apellido,
            matricula,
            especialidad,
            email,
            password,
            role: auth_1.UserRole.USER
        };
        await veterinariosService.addVeterinario(newVeterinario);
        res
            .status(201)
            .json({ success: true, message: 'Veterinario creado correctamente' });
    }
    catch (error) {
        next(error);
    }
};
exports.createVeterinarios = createVeterinarios;
const updateVeterinarios = async (req, res, next) => {
    try {
        const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
        const { nombre, apellido, matricula, especialidad, email, password } = req.body;
        const updatedVeterinario = {
            nombre,
            apellido,
            matricula,
            especialidad,
            email,
            password,
            role: auth_1.UserRole.USER
        };
        await veterinariosService.modifyVeterinarioById(id, updatedVeterinario);
        res
            .status(200)
            .json({ success: true, message: 'Veterinario actualizado correctamente' });
    }
    catch (error) {
        next(error);
    }
};
exports.updateVeterinarios = updateVeterinarios;
const deleteVeterinarios = async (req, res, next) => {
    try {
        const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
        await veterinariosService.removeVeterinarioById(id);
        res
            .status(200)
            .json({ success: true, message: 'Veterinario eliminado correctamente' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteVeterinarios = deleteVeterinarios;
