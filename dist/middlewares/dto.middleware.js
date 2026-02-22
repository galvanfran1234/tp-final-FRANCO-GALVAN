"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateDto = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    console.log('Validating DTO for request to', errors);
    if (errors.isEmpty()) {
        return next(); // No errors, continue to the controller
    }
    console.log('Errores de validación:', errors.array());
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.default = validateDto;
