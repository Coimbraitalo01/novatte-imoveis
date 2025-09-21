const express = require('express');
const router = express.Router();
const controller = require('../controllers/imoveisController');

// Rotas para imóveis
router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;