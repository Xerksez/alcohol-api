import { Router } from 'express';
import vodkasController from '../controllers/vodkasController.js';
const router = Router();

router.get('/', vodkasController.getAllVodkas);
router.post('/', vodkasController.createVodka);
router.get('/:id', vodkasController.getVodkaById);
router.put('/:id', vodkasController.updateVodka);  
router.patch('/:id', vodkasController.partialUpdateVodka);
router.delete('/:id', vodkasController.deleteVodka);

export default router;
