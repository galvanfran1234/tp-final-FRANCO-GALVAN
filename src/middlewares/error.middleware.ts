import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/appError';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Errores operacionales personalizados (AppError)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    // Errores de MySQL: Entrada Duplicada (ER_DUP_ENTRY)
    if ((err as any).code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
            status: 'error',
            message: 'El registro ya existe en la base de datos (valor duplicado).',
        });
    }

    // Errores de MySQL: Violación de llave foránea (ER_ROW_IS_REFERENCED / ER_NO_REFERENCED_ROW)
    if ((err as any).code === 'ER_ROW_IS_REFERENCED_2' || (err as any).code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
            status: 'error',
            message: 'Error de integridad referencial. El recurso depende o es dependido por otro.',
        });
    }

    // Errores inesperados
    console.error('ERROR 💥:', err);
    return res.status(500).json({
        status: 'error',
        message: 'Algo salió mal en el servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};
