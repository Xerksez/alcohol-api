import { Router } from 'express';
import rumController from '../controllers/rumController.js';
const router = Router();

router.get('/', rumController.getAllRum);  
router.post('/', rumController.createRum); 
router.get('/:id', rumController.getRumById); 
router.put('/:id', rumController.updateRum); 
router.patch('/:id', rumController.partialUpdateRum); 
router.delete('/:id', rumController.deleteRum);  

export default router;
