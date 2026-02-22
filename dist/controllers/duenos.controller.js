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
exports.deleteDuenos = exports.updateDuenos = exports.createDuenos = exports.showDuenos = void 0;
const duenosService = __importStar(require("../services/duenos.service"));
const showDuenos = async (req, res, next) => {
    try {
        const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
        const duenos = await duenosService.listDuenos(id_veterinario);
        res.status(200).json(duenos);
    }
    catch (error) {
        next(error);
    }
};
exports.showDuenos = showDuenos;
const createDuenos = async (req, res, next) => {
    try {
        const { nombre, apellido, telefono, direccion } = req.body;
        const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
        const newDueno = {
            nombre,
            apellido,
            telefono,
            direccion,
            id_veterinario
        };
        await duenosService.addDueno(newDueno);
        res
            .status(201)
            .json({ success: true, message: 'Dueño creado correctamente' });
    }
    catch (error) {
        next(error);
    }
};
exports.createDuenos = createDuenos;
const updateDuenos = async (req, res, next) => {
    try {
        const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
        const { nombre, apellido, telefono, direccion } = req.body;
        const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
        const updatedDueno = {
            nombre,
            apellido,
            telefono,
            direccion,
            id_veterinario
        };
        await duenosService.modifyDuenoById(id, updatedDueno, id_veterinario);
        res
            .status(200)
            .json({ success: true, message: 'Dueño actualizado correctamente' });
    }
    catch (error) {
        next(error);
    }
};
exports.updateDuenos = updateDuenos;
const deleteDuenos = async (req, res, next) => {
    try {
        const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
        const id_veterinario = req.veterinarios ? parseInt(req.veterinarios.id, 10) : 0;
        await duenosService.removeDuenoById(id, id_veterinario);
        res
            .status(200)
            .json({ success: true, message: 'Dueño eliminado correctamente' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteDuenos = deleteDuenos;
