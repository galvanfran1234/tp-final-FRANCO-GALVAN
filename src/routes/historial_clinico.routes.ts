import { Router } from 'express';
import * as historial_clinicocontroller from '../controllers/historial_clinico.controller';
import { showHistorialClinico } from '../controllers/historial_clinico.controller';

const historial_clinico_router: Router = Router();

historial_clinico_router.get('/', showHistorialClinico);
historial_clinico_router.post('/create', historial_clinicocontroller.createHistorialClinico);
historial_clinico_router.put('/update/:id', historial_clinicocontroller.updateHistorialClinico);
historial_clinico_router.delete('/delete/:id', historial_clinicocontroller.deleteHistorialClinico);

export default historial_clinico_router;