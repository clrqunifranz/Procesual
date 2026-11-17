const pool = require('../config/db');

class ConsultaModel {
  async crear(data) {
    const result = await pool.query(
      'INSERT INTO consultas (lote_id, nombre_cliente, telefono, mensaje) VALUES (?, ?, ?, ?)',
      [data.lote_id, data.nombre_cliente, data.telefono, data.mensaje]
    );
    return result[0].insertId;
  }

  async porLote(loteId) {
    const [rows] = await pool.query(
      'SELECT * FROM consultas WHERE lote_id = ? ORDER BY fecha DESC',
      [loteId]
    );
    return rows;
  }
}

module.exports = new ConsultaModel();