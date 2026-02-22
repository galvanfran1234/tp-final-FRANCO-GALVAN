"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryValidator = exports.createCategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const name = [
    (0, express_validator_1.body)('nombre')
        .notEmpty()
        .withMessage('El nombre de la categoría es obligatorio')
        .isString()
        .withMessage('El nombre de la categoría debe ser una cadena de texto')
        .isLength({ max: 50, min: 3 })
        .withMessage('El nombre de la categoría debe tener entre 3 y 50 caracteres'),
];
const apellido = [
    (0, express_validator_1.body)('apellido')
        .optional()
        .isString()
        .withMessage('El apellido debe ser una cadena de texto')
        .isLength({ max: 50 })
        .withMessage('El apellido no puede exceder los 50 caracteres'),
];
const telefono = [
    (0, express_validator_1.body)('telefono')
        .optional()
        .isString()
        .withMessage('El teléfono debe ser una cadena de texto')
        .isLength({ max: 20 })
        .withMessage('El teléfono no puede exceder los 20 caracteres'),
];
const direccion = [
    (0, express_validator_1.body)('direccion')
        .optional()
        .isString()
        .withMessage('La dirección debe ser una cadena de texto')
        .isLength({ max: 100 })
        .withMessage('La dirección no puede exceder los 100 caracteres'),
];
exports.createCategoryValidator = [
    ...name,
    ...apellido,
    ...telefono,
    ...direccion,
];
exports.updateCategoryValidator = [
    ...name,
    ...apellido,
    ...telefono,
    ...direccion,
];
