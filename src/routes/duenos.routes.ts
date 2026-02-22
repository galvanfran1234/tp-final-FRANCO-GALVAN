import { Router } from 'express';
import * as duenoscontroller from '../controllers/duenos.controller';
import { showDuenos } from '../controllers/duenos.controller';

const duenosrouter: Router = Router();

duenosrouter.get('/', showDuenos);
duenosrouter.post('/create', duenoscontroller.createDuenos);
duenosrouter.put('/update/:id', duenoscontroller.updateDuenos);
duenosrouter.delete('/delete/:id', duenoscontroller.deleteDuenos);

export default duenosrouter;