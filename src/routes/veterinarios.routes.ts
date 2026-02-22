import { Router } from 'express';
import * as veterinarioscontroller from '../controllers/veterinarios.controller';
import { showVeterinarios } from '../controllers/veterinarios.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const veterinariosrouter: Router = Router();

veterinariosrouter.get('/', showVeterinarios);
veterinariosrouter.post('/create', authorize(['admin']), veterinarioscontroller.createVeterinarios);
veterinariosrouter.put('/update/:id', authorize(['admin']), veterinarioscontroller.updateVeterinarios);
veterinariosrouter.delete('/delete/:id', authorize(['admin']), veterinarioscontroller.deleteVeterinarios);


export default veterinariosrouter;
