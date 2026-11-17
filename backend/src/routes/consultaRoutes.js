const express = require('express');
const router = express.Router();
const { crear, porLote } = require('../controllers/consultaController');

router.post('/', crear);
router.get('/lote/:lote_id', porLote);

module.exports = router;