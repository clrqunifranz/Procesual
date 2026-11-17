const express = require('express');
const router = express.Router();
const { listar } = require('../controllers/zonaController');

router.get('/', listar);

module.exports = router;