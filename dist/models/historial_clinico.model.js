"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHistorialClinicoById = exports.deleteHistorialClinicoById = exports.createHistorialClinico = exports.getAllHistorialClinico = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const appError_1 = require("../types/appError");
const getAllHistorialClinico = async (id_veterinario) => {
    const [rows] = await mysql_1.default.query(`
    SELECT h.id, h.id_mascota, h.id_veterinario, h.fecha_registro, h.descripcion
    FROM historial_clinico h
    WHERE h.id_veterinario = ?
  `, [id_veterinario]);
    return rows;
};
exports.getAllHistorialClinico = getAllHistorialClinico;
const createHistorialClinico = async (data) => {
    const { id_mascota, id_veterinario, fecha_registro, descripcion } = data;
    await mysql_1.default.query('INSERT INTO historial_clinico (id_mascota, id_veterinario, fecha_registro, descripcion) VALUES (?, ?, ?, ?)', [data.id_mascota, data.id_veterinario, data.fecha_registro, data.descripcion]);
};
exports.createHistorialClinico = createHistorialClinico;
const deleteHistorialClinicoById = async (id, id_veterinario) => {
    const [result] = await mysql_1.default.query('DELETE FROM historial_clinico WHERE id = ? AND id_veterinario = ?', [id, id_veterinario]);
    if (result.affectedRows === 0) {
        throw new appError_1.AppError('No se encontró el historial clínico o no tienes permisos para eliminarlo.', 404);
    }
};
exports.deleteHistorialClinicoById = deleteHistorialClinicoById;
const updateHistorialClinicoById = async (id, data, id_veterinario) => {
    const { id_mascota, fecha_registro, descripcion } = data;
    const [result] = await mysql_1.default.query('UPDATE historial_clinico SET id_mascota = ?, fecha_registro = ?, descripcion = ? WHERE id = ? AND id_veterinario = ?', [id_mascota, fecha_registro, descripcion, id, id_veterinario]);
    if (result.affectedRows === 0) {
        throw new appError_1.AppError('No se encontró el historial clínico o no tienes permisos para actualizarlo.', 404);
    }
};
exports.updateHistorialClinicoById = updateHistorialClinicoById;
