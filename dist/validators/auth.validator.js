"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = exports.validateEmail = exports.validatePassword = void 0;
const express_validator_1 = require("express-validator");
exports.validatePassword = [
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/\d/)
        .withMessage('La contraseña debe contener al menos un número')
        .matches(/[A-Z]/)
        .withMessage('La contraseña debe contener al menos una mayúscula')
        .matches(/[^A-Za-z0-9]/)
        .withMessage('La contraseña debe contener al menos un carácter especial'),
];
exports.validateEmail = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Debe ser un email válido')
        .normalizeEmail(),
];
exports.registerValidator = [
    ...exports.validateEmail,
    ...exports.validatePassword,
    (0, express_validator_1.body)('nombre')
        .isLength({ min: 3, max: 50 })
        .withMessage('Nombre debe tener entre 3 y 50 caracteres')
        .matches(/^[a-zA-Z0-9_ -]+$/)
        .withMessage('Nombre solo puede contener letras, números, espacios y guiones'),
    (0, express_validator_1.body)('apellido')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isString().withMessage('El apellido debe ser una cadena de texto')
        .isLength({ max: 15, min: 3 }).withMessage('El apellido debe tener entre 3 y 15 caracteres'),
    (0, express_validator_1.body)('matricula')
        .notEmpty().withMessage('La matrícula es obligatoria')
        .isString().withMessage('La matrícula debe ser una cadena de texto')
        .isLength({ max: 50, min: 3 }).withMessage('La matrícula debe tener entre 3 y 50 caracteres'),
    (0, express_validator_1.body)('especialidad')
        .optional()
        .isString().withMessage('La especialidad debe ser una cadena de texto')
        .isLength({ max: 200 }).withMessage('La especialidad no puede exceder los 200 caracteres'),
];
exports.loginValidator = [
    ...exports.validateEmail,
    (0, express_validator_1.body)('password').notEmpty().withMessage('La contraseña es requerida'),
];
