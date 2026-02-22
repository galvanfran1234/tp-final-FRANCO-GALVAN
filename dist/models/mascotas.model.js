"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMascotaById = exports.deleteMascotaById = exports.createMascota = exports.getAllMascotas = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const appError_1 = require("../types/appError");
const getAllMascotas = async (id_veterinario) => {
    const [rows] = await mysql_1.default.query(`
    SELECT m.id, m.nombre, m.especie, m.fecha_nacimiento, m.id_dueno, m.id_veterinario
    FROM mascotas m
    WHERE m.id_veterinario = ?
  `, [id_veterinario]);
    return rows;
};
exports.getAllMascotas = getAllMascotas;
const createMascota = async (data) => {
    const { nombre, especie, fecha_nacimiento, id_dueno, id_veterinario } = data;
    await mysql_1.default.query('INSERT INTO mascotas (nombre, especie, fecha_nacimiento, id_dueno, id_veterinario) VALUES (?, ?, ?, ?, ?)', [nombre, especie, fecha_nacimiento, id_dueno, id_veterinario]);
};
exports.createMascota = createMascota;
const deleteMascotaById = async (id, id_veterinario) => {
    const [result] = await mysql_1.default.query('DELETE FROM mascotas WHERE id = ? AND id_veterinario = ?', [id, id_veterinario]);
    if (result.affectedRows === 0) {
        throw new appError_1.AppError('No se encontró la mascota o no tienes permisos para eliminarla.', 404);
    }
};
exports.deleteMascotaById = deleteMascotaById;
const updateMascotaById = async (id, data, id_veterinario) => {
    const { nombre, especie, fecha_nacimiento, id_dueno } = data;
    const [result] = await mysql_1.default.query('UPDATE mascotas SET nombre = ?, especie = ?, fecha_nacimiento = ?, id_dueno = ? WHERE id = ? AND id_veterinario = ?', [nombre, especie, fecha_nacimiento, id_dueno, id, id_veterinario]);
    if (result.affectedRows === 0) {
        throw new appError_1.AppError('No se encontró la mascota o no tienes permisos para actualizarla.', 404);
    }
};
exports.updateMascotaById = updateMascotaById;
