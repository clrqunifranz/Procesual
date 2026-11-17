const express = require('express');
const router = express.Router();
const { estimarPrecio, chatbot } = require('../controllers/principalController');

router.post('/estimar-precio', estimarPrecio);
router.post('/chatbot', chatbot);

module.exports = router;