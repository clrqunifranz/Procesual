const loteModel = require('../models/loteModel');
const consultaModel = require('../models/consultaModel');

async function estimarPrecio(req, res) {
  try {
    const {
      zona_id,
      superficie_m2,
      frente_m,
      fondo_m,
      servicios_basicos,
      via_asfaltada,
      folio_real,
    } = req.body;

    // Consultar zona precio_m2_usd
    const [zonas] = await pool.query('SELECT * FROM zonas WHERE id = ?', [zona_id]);
    if (zonas.length === 0) {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }
    const zona = zonas[0];
    const precio_m2_base = zona.precio_m2_usd;

    // Calcular coeficientes
    const c_servicios = servicios_basicos === true ? 1.10 : 0.90;
    const c_via = via_asfaltada === true ? 1.08 : 0.95;
    const c_legal = folio_real === true ? 1.05 : 0.85;
    const c_forma = frente_m >= 10 ? 1.03 : 0.97;

    // Aplicar fórmula: V_est = S × P_zona × Cs × Cv × Cl × Cf
    const precio_m2_ajustado = precio_m2_base * c_servicios * c_via * c_legal * c_forma;
    const valor_estimado_total_usd = Math.round(superficie_m2 * precio_m2_ajustado * 100) / 100;

    res.json({
      zona_nombre: zona.nombre,
      precio_m2_base,
      coeficientes: {
        c_servicios,
        c_via,
        c_legal,
        c_forma,
      },
      precio_m2_ajustado,
      valor_estimado_total_usd,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function chatbot(req, res) {
  try {
    const { mensaje } = req.body;
    if (!mensaje) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    // Consultar zonas y lotes para contexto
    const [zonas] = await pool.query('SELECT * FROM zonas ORDER BY id');
    const [lotes] = await pool.query('SELECT l.*, z.nombre AS zona_nombre FROM lotes l JOIN zonas z ON l.zona_id = z.id');

    // Construir contexto para el modelo
    const contextoZonas = zonas.map(z => `- ${z.nombre} (${z.macrodistrito}): $${z.precio_m2_usd}/m²`).join('\n');
    const contextoLotes = lotes.slice(0, 5).map(l => `- ${l.titulo} en ${l.zona_nombre}: $${l.precio_publicado_usd} (${l.superficie_m2} m²)`).join('\n');

    const prompt = `Eres el asistente oficial de la Plataforma Marketplace Inmobiliaria de Lotes y Terrenos en Cochabamba. Responde ÚNICAMENTE consultas relacionadas con esta plataforma, lotes disponibles en Cochabamba, precios referenciales por metro cuadrado, coeficientes de tasación o publicación/visita de terrenos usando los datos proporcionados.

Datos del sistema:
Zonas con precios por m²:
${contextoZonas}

Lotes disponibles:
${contextoLotes}

Usuario pregunta: ${mensaje}

Respuesta:`;

    // Llamar a Ollama gemma3:1b
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma3:1b',
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    res.json({ respuesta: data.response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { estimarPrecio, chatbot };