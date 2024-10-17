const express = require('express');
const router = express.Router();
const winesController = require('../controllers/winesController');

router.get('/', winesController.getAllWines); 
router.post('/', winesController.createWine); 
router.get('/:id', winesController.getWineById);
router.put('/:id', winesController.updateWine);  
router.patch('/:id', winesController.partialUpdateWine);
router.delete('/:id', winesController.deleteWine);  

module.exports = router;
