const pool = require('../config/db');

class ZonaModel {
  async listar() {
    const [rows] = await pool.query('SELECT * FROM zonas ORDER BY id');
    return rows;
  }
}

module.exports = new ZonaModel();