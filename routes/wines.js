import { Router } from 'express';
const router = Router();
import winesController from '../controllers/winesController.js';

router.get('/', winesController.getAllWines); 
router.post('/', winesController.createWine); 
router.get('/:id', winesController.getWineById);
router.put('/:id', winesController.updateWine);  
router.patch('/:id', winesController.partialUpdateWine);
router.delete('/:id', winesController.deleteWine);  

export default router;
