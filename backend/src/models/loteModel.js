const pool = require('../config/db');

class LoteModel {
  async listar(filtros = {}) {
    let query = 'SELECT l.*, z.nombre AS zona_nombre, z.macrodistrito, z.precio_m2_usd FROM lotes l JOIN zonas z ON l.zona_id = z.id WHERE 1=1';
    const params = [];

    if (filtros.zona_id) {
      query += ' AND l.zona_id = ?';
      params.push(filtros.zona_id);
    }
    if (filtros.superficie_min) {
      query += ' AND l.superficie_m2 >= ?';
      params.push(filtros.superficie_min);
    }
    if (filtros.precio_max) {
      query += ' AND l.precio_publicado_usd <= ?';
      params.push(filtros.precio_max);
    }

    query += ' ORDER BY z.id, l.id';
    const [rows] = await pool.query(query, params);
    return rows;
  }

  async crear(data) {
    const result = await pool.query(
      'INSERT INTO lotes (titulo, zona_id, direccion, superficie_m2, frente_m, fondo_m, precio_publicado_usd, servicios_basicos, via_asfaltada, folio_real, propietario, telefono_contacto, imagen_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.titulo,
        data.zona_id,
        data.direccion,
        data.superficie_m2,
        data.frente_m,
        data.fondo_m,
        data.precio_publicado_usd,
        data.servicios_basicos,
        data.via_asfaltada,
        data.folio_real,
        data.propietario,
        data.telefono_contacto,
        data.imagen_url,
      ]
    );
    return result[0].insertId;
  }

  async obtenerConZona(id) {
    const [rows] = await pool.query(
      'SELECT l.*, z.nombre AS zona_nombre, z.macrodistrito, z.precio_m2_usd FROM lotes l JOIN zonas z ON l.zona_id = z.id WHERE l.id = ?',
      [id]
    );
    return rows[0];
  }
}

module.exports = new LoteModel();