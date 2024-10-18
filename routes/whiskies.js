import { Router } from 'express';
import whiskiesController from '../controllers/whiskiesController';
const router = Router();

router.get('/', whiskiesController.getAllWhiskies);
router.post('/', whiskiesController.createWhisky); 
router.get('/:id', whiskiesController.getWhiskyById);
router.put('/:id', whiskiesController.updateWhisky); 
router.patch('/:id', whiskiesController.partialUpdateWhisky); 
router.delete('/:id', whiskiesController.deleteWhisky);

export default router;
