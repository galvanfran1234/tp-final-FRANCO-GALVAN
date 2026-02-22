import { body } from 'express-validator';
import { ValidationChain } from 'express-validator';
import { getAllVeterinarios } from '../models/veterinarios.model';
import { validateEmail, validatePassword } from './auth.validator';


const nombre: ValidationChain[] = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre del veterinario es obligatorio')
    .isString()
    .withMessage('El nombre del veterinario debe ser una cadena de texto')
    .isLength({ max: 50, min: 3 })
    .withMessage(
      'El nombre del veterinario debe tener entre 3 y 50 caracteres',
    ),
];

const apellido: ValidationChain[] = [
  body('apellido')
    .notEmpty()
    .withMessage('El apellido del veterinario es obligatorio')
    .isString()
    .withMessage('El apellido del veterinario debe ser una cadena de texto')
    .isLength({ max: 15, min: 3 })
    .withMessage(
      'El apellido del veterinario debe tener entre 3 y 15 caracteres',
    ),
];

const matricula: ValidationChain[] = [
  body('matricula')
    .notEmpty()
    .withMessage('La matrícula del veterinario es obligatoria')
    .isString()
    .withMessage('La matrícula del veterinario debe ser una cadena de texto')
    .isLength({ max: 50, min: 3 })
    .withMessage(
      'La matrícula del veterinario debe tener entre 3 y 50 caracteres',
    ),
];
const especialidad: ValidationChain[] = [
  body('especialidad')
    .optional()
    .isString()
    .withMessage('La especialidad debe ser una cadena de texto')
    .isLength({ max: 200 })
    .withMessage('La especialidad no puede exceder los 200 caracteres'),
];

export const getVeterinariosbyidValidator: ValidationChain[] = [
  body('id')
    .notEmpty()
    .withMessage('El ID del veterinario es obligatorio')
    .isInt({ gt: 0 })
    .withMessage('El ID del veterinario debe ser un número entero positivo'),
];

export const createVeterinarioValidator: ValidationChain[] = [
  ...nombre,
  ...apellido,
  ...matricula,
  ...especialidad,
  ...validateEmail,
  ...validatePassword,
];

export const updateVeterinarioValidator: ValidationChain[] = [
  ...nombre,
  ...apellido,
  ...matricula,
  ...especialidad,
  ...validateEmail,
  ...validatePassword,
];

export const deleteVeterinarioBynombreValidator: ValidationChain[] = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre del veterinario es obligatorio')
    .isString()
    .withMessage('El nombre del veterinario debe ser una cadena de texto')
    .isLength({ max: 50, min: 3 })
    .withMessage('El nombre del veterinario debe tener entre 3 y 50 caracteres',)
];
