require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const pool = require('./src/config/db');
const zonaRoutes = require('./src/routes/zonaRoutes');
const loteRoutes = require('./src/routes/loteRoutes');
const consultaRoutes = require('./src/routes/consultaRoutes');
const principalRoutes = require('./src/routes/principalRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/zonas', zonaRoutes);
app.use('/api/lotes', loteRoutes);
app.use('/api/consultas', consultaRoutes);
app.use('/api', principalRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Backend Marketplace Inmobiliario corriendo en puerto ${PORT}`);
  console.log(`📊 Conectado a MySQL en 127.0.0.1:3306`);
  // Verificar conexión
  (async () => {
    try {
      await pool.query('SELECT 1');
    } catch (err) {
      console.error('Error al verificar conexión a la base de datos:', err);
    }
  })();
  console.log('✅ Base de datos db_inmobiliaria conectada');
});

module.exports = app;