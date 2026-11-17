const zonaModel = require('../models/zonaModel');

async function listar(req, res) {
  try {
    const zonas = await zonaModel.listar();
    res.json(zonas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listar };