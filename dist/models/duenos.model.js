"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDuenoById = exports.deleteDuenoById = exports.createDueno = exports.getAllDuenos = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const appError_1 = require("../types/appError");
const getAllDuenos = async (id_veterinario) => {
    const [rows] = await mysql_1.default.query(`
    SELECT d.id, d.nombre, d.apellido, d.telefono, d.direccion, d.id_veterinario
    FROM duenos d
    WHERE d.id_veterinario = ?
  `, [id_veterinario]);
    return rows;
};
exports.getAllDuenos = getAllDuenos;
const createDueno = async (data) => {
    const { nombre, apellido, telefono, direccion, id_veterinario } = data;
    await mysql_1.default.query('INSERT INTO duenos (nombre, apellido, telefono, direccion, id_veterinario) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, telefono, direccion, id_veterinario]);
};
exports.createDueno = createDueno;
const deleteDuenoById = async (id, id_veterinario) => {
    const [result] = await mysql_1.default.query('DELETE FROM duenos WHERE id = ? AND id_veterinario = ?', [id, id_veterinario]);
    if (result.affectedRows === 0) {
        throw new appError_1.AppError('No se encontró el dueño o no tienes permisos para eliminarlo.', 404);
    }
};
exports.deleteDuenoById = deleteDuenoById;
const updateDuenoById = async (id, data, id_veterinario) => {
    const { nombre, apellido, telefono, direccion } = data;
    const [result] = await mysql_1.default.query('UPDATE duenos SET nombre = ?, apellido = ?, telefono = ?, direccion = ? WHERE id = ? AND id_veterinario = ?', [nombre, apellido, telefono, direccion, id, id_veterinario]);
    if (result.affectedRows === 0) {
        throw new appError_1.AppError('No se encontró el dueño o no tienes permisos para actualizarlo.', 404);
    }
};
exports.updateDuenoById = updateDuenoById;
