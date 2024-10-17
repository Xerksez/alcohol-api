const express = require('express');
const router = express.Router();
const vodkasController = require('../controllers/vodkasController');

router.get('/', vodkasController.getAllVodkas); 
router.post('/', vodkasController.createVodka); 
router.get('/:id', vodkasController.getVodkaById); 
router.put('/:id', vodkasController.updateVodka);  
router.patch('/:id', vodkasController.partialUpdateVodka); 
router.delete('/:id', vodkasController.deleteVodka);  

module.exports = router;
