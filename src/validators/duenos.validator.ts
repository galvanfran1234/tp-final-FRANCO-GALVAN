import { body } from 'express-validator';
import { ValidationChain } from 'express-validator';


const name: ValidationChain[] = [
  body('nombre')
  .notEmpty()
  .withMessage('El nombre de la categoría es obligatorio')
  .isString()
  .withMessage('El nombre de la categoría debe ser una cadena de texto')
  .isLength({ max: 50, min: 3 })
  .withMessage(
    'El nombre de la categoría debe tener entre 3 y 50 caracteres',
  ),
];

const apellido: ValidationChain[] = [
body('apellido')
    .optional()
    .isString()
    .withMessage('El apellido debe ser una cadena de texto')
    .isLength({ max: 50 })
    .withMessage('El apellido no puede exceder los 50 caracteres'),
];

const telefono: ValidationChain[] = [
  body('telefono')
    .optional()
    .isString()
    .withMessage('El teléfono debe ser una cadena de texto')
    .isLength({ max: 20 })
    .withMessage('El teléfono no puede exceder los 20 caracteres'),
];

const direccion: ValidationChain[] = [
  body('direccion')
    .optional()
    .isString()
    .withMessage('La dirección debe ser una cadena de texto')
    .isLength({ max: 100 })
    .withMessage('La dirección no puede exceder los 100 caracteres'),
];

export const createCategoryValidator: ValidationChain[] = [
  ...name,
  ...apellido, 
  ...telefono,
  ...direccion,
];

export const updateCategoryValidator: ValidationChain[] = [
  ...name,
  ...apellido,
  ...telefono,
  ...direccion,
];