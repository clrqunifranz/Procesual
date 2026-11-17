const consultaModel = require('../models/consultaModel');

async function crear(req, res) {
  try {
    const id = await consultaModel.crear(req.body);
    res.status(201).json({ id, mensaje: 'Solicitud de consulta guardada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function porLote(req, res) {
  try {
    const consultas = await consultaModel.porLote(req.params.lote_id);
    res.json(consultas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { crear, porLote };