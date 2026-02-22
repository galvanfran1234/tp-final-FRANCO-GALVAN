"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVeterinarioBynombreValidator = exports.updateVeterinarioValidator = exports.createVeterinarioValidator = exports.getVeterinariosbyidValidator = void 0;
const express_validator_1 = require("express-validator");
const auth_validator_1 = require("./auth.validator");
const nombre = [
    (0, express_validator_1.body)('nombre')
        .notEmpty()
        .withMessage('El nombre del veterinario es obligatorio')
        .isString()
        .withMessage('El nombre del veterinario debe ser una cadena de texto')
        .isLength({ max: 50, min: 3 })
        .withMessage('El nombre del veterinario debe tener entre 3 y 50 caracteres'),
];
const apellido = [
    (0, express_validator_1.body)('apellido')
        .notEmpty()
        .withMessage('El apellido del veterinario es obligatorio')
        .isString()
        .withMessage('El apellido del veterinario debe ser una cadena de texto')
        .isLength({ max: 15, min: 3 })
        .withMessage('El apellido del veterinario debe tener entre 3 y 15 caracteres'),
];
const matricula = [
    (0, express_validator_1.body)('matricula')
        .notEmpty()
        .withMessage('La matrícula del veterinario es obligatoria')
        .isString()
        .withMessage('La matrícula del veterinario debe ser una cadena de texto')
        .isLength({ max: 50, min: 3 })
        .withMessage('La matrícula del veterinario debe tener entre 3 y 50 caracteres'),
];
const especialidad = [
    (0, express_validator_1.body)('especialidad')
        .optional()
        .isString()
        .withMessage('La especialidad debe ser una cadena de texto')
        .isLength({ max: 200 })
        .withMessage('La especialidad no puede exceder los 200 caracteres'),
];
exports.getVeterinariosbyidValidator = [
    (0, express_validator_1.body)('id')
        .notEmpty()
        .withMessage('El ID del veterinario es obligatorio')
        .isInt({ gt: 0 })
        .withMessage('El ID del veterinario debe ser un número entero positivo'),
];
exports.createVeterinarioValidator = [
    ...nombre,
    ...apellido,
    ...matricula,
    ...especialidad,
    ...auth_validator_1.validateEmail,
    ...auth_validator_1.validatePassword,
];
exports.updateVeterinarioValidator = [
    ...nombre,
    ...apellido,
    ...matricula,
    ...especialidad,
    ...auth_validator_1.validateEmail,
    ...auth_validator_1.validatePassword,
];
exports.deleteVeterinarioBynombreValidator = [
    (0, express_validator_1.body)('nombre')
        .notEmpty()
        .withMessage('El nombre del veterinario es obligatorio')
        .isString()
        .withMessage('El nombre del veterinario debe ser una cadena de texto')
        .isLength({ max: 50, min: 3 })
        .withMessage('El nombre del veterinario debe tener entre 3 y 50 caracteres')
];
