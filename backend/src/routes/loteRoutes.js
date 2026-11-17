const express = require('express');
const router = express.Router();
const { listar, crear, obtenerConZona } = require('../controllers/loteController');

router.get('/', listar);
router.post('/', crear);
router.get('/:id', obtenerConZona);

module.exports = router;