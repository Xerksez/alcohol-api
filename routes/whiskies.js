const express = require('express');
const router = express.Router();
const whiskiesController = require('../controllers/whiskiesController');

router.get('/', whiskiesController.getAllWhiskies);
router.post('/', whiskiesController.createWhisky); 
router.get('/:id', whiskiesController.getWhiskyById);
router.put('/:id', whiskiesController.updateWhisky); 
router.patch('/:id', whiskiesController.partialUpdateWhisky); 
router.delete('/:id', whiskiesController.deleteWhisky);

module.exports = router;
