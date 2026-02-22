"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVeterinarioById = exports.findVeterinarioByEmail = exports.updateVeterinarioById = exports.deleteVeterinarioById = exports.createVeterinario = exports.getAllVeterinarios = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const getAllVeterinarios = async () => {
    const [rows] = await mysql_1.default.query(`
    SELECT v.id, v.nombre, v.apellido, v.matricula, v.especialidad
    FROM veterinarios v
  `);
    return rows;
};
exports.getAllVeterinarios = getAllVeterinarios;
const createVeterinario = async (data) => {
    const { nombre, apellido, email, password, matricula, especialidad, role } = data;
    const [result] = await mysql_1.default.query('INSERT INTO veterinarios (nombre, apellido, email, password, matricula, especialidad, role) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre, apellido, email, password, matricula, especialidad, role]);
    return result.insertId;
};
exports.createVeterinario = createVeterinario;
const deleteVeterinarioById = async (id) => {
    await mysql_1.default.query('DELETE FROM veterinarios WHERE id = ?', [id]);
};
exports.deleteVeterinarioById = deleteVeterinarioById;
const updateVeterinarioById = async (id, data) => {
    const { nombre, apellido, matricula, especialidad } = data;
    await mysql_1.default.query('UPDATE veterinarios SET nombre = ?,  apellido = ?, matricula = ?, especialidad = ? WHERE id = ?', [nombre, apellido, matricula, especialidad, id]);
};
exports.updateVeterinarioById = updateVeterinarioById;
const findVeterinarioByEmail = async (email) => {
    const [rows] = await mysql_1.default.query('SELECT * FROM veterinarios WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
};
exports.findVeterinarioByEmail = findVeterinarioByEmail;
const findVeterinarioById = async (id) => {
    const [rows] = await mysql_1.default.query('SELECT * FROM veterinarios WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};
exports.findVeterinarioById = findVeterinarioById;
