"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const veterinariosModel = __importStar(require("../models/veterinarios.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../types/auth");
const appError_1 = require("../types/appError");
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no definido');
}
const secretKey = process.env.JWT_SECRET;
const register = async (data) => {
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    const insertId = await veterinariosModel.createVeterinario({
        ...data,
        password: hashedPassword,
        role: auth_1.UserRole.USER,
    });
    if (!insertId) {
        throw new appError_1.AppError('Error al crear veterinario', 500);
    }
    return insertId;
};
exports.register = register;
const login = async (email, password) => {
    const invalidCredentialsError = new Error('Credenciales inválidas');
    const user = await veterinariosModel.findVeterinarioByEmail(email);
    if (!user) {
        throw new appError_1.AppError('Credenciales inválidas', 401);
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw invalidCredentialsError;
    }
    const payload = {
        id: String(user.id),
        role: user.role,
        nombre: user.nombre
    };
    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        issuer: 'Franco Galvan - curso-utn-backend',
    };
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.login = login;
