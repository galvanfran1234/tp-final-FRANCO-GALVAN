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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeHistorialClinicoById = exports.modifyHistorialClinicoById = exports.addHistorialClinico = exports.listHistorialClinico = void 0;
const historial_clinicoModel = __importStar(require("../models/historial_clinico.model"));
const listHistorialClinico = async (id_veterinario) => {
    return historial_clinicoModel.getAllHistorialClinico(id_veterinario);
};
exports.listHistorialClinico = listHistorialClinico;
const addHistorialClinico = async (data) => {
    await historial_clinicoModel.createHistorialClinico(data);
};
exports.addHistorialClinico = addHistorialClinico;
const modifyHistorialClinicoById = async (id, data, id_veterinario) => {
    await historial_clinicoModel.updateHistorialClinicoById(id, data, id_veterinario);
};
exports.modifyHistorialClinicoById = modifyHistorialClinicoById;
const removeHistorialClinicoById = async (id, id_veterinario) => {
    await historial_clinicoModel.deleteHistorialClinicoById(id, id_veterinario);
};
exports.removeHistorialClinicoById = removeHistorialClinicoById;
