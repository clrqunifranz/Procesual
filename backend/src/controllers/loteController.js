const loteModel = require('../models/loteModel');

async function listar(req, res) {
  try {
    const filtros = {
      zona_id: req.query.zona_id,
      superficie_min: req.query.superficie_min,
      precio_max: req.query.precio_max,
    };
    const lotes = await loteModel.listar(filtros);
    res.json(lotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function crear(req, res) {
  try {
    const id = await loteModel.crear(req.body);
    res.status(201).json({ id, mensaje: 'Lote registrado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function obtenerConZona(req, res) {
  try {
    const lote = await loteModel.obtenerConZona(req.params.id);
    if (!lote) return res.status(404).json({ error: 'Lote no encontrado' });
    res.json(lote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listar, crear, obtenerConZona };