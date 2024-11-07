import { Router } from 'express';
import rumsController from '../controllers/rumsController.js';
const router = Router();

router.get('/', rumsController.getAllRums);  
router.post('/', rumsController.createRum); 
router.get('/:id', rumsController.getRumById); 
router.put('/:id', rumsController.updateRum); 
router.patch('/:id', rumsController.partialUpdateRum); 
router.delete('/:id', rumsController.deleteRum);  

export default router;
