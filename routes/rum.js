const express = require('express');
const router = express.Router();
const rumController = require('../controllers/rumController.js');

router.get('/', rumController.getAllRum);  
router.post('/', rumController.createRum); 
router.get('/:id', rumController.getRumById); 
router.put('/:id', rumController.updateRum); 
router.patch('/:id', rumController.partialUpdateRum); 
router.delete('/:id', rumController.deleteRum);  

module.exports = router;
