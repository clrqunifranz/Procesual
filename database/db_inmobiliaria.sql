-- Database: db_inmobiliaria
-- Script generado para arquitectura 3-Tier Marketplace Inmobiliario Cochabamba

-- Zonas de Cochabamba con precios referenciales por m²
CREATE TABLE zonas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    macrodistrito VARCHAR(100) NOT NULL,
    precio_m2_usd DECIMAL(10, 2) NOT NULL,
    descripcion TEXT
);

-- Insertar 5 zonas reales de Cochabamba
INSERT INTO zonas (nombre, macrodistrito, precio_m2_usd, descripcion) VALUES
('Tiquipaya - Linde', 'Linde', 135.00, 'Zona residencial creciente en el valle alto'),
('Cala Cala / Queru Queru', 'Centro', 320.00, 'Zona céntrica de alta demanda inmobiliaria'),
('Sacaba - Quintanilla', 'Sacaba', 110.00, 'Zone residencial en transición hacia Sacaba'),
('Quillacollo - El Paso', 'Quillacollo', 85.00, 'Area periurbana con crecimiento gradual'),
('Zona Sur - Tamborada', 'Sur', 65.00, 'Zona residencial consolidada al sur de Cochabamba');

-- Lotes de terrenos disponibles
CREATE TABLE lotes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    zona_id INT NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    superficie_m2 DECIMAL(10, 2) NOT NULL,
    frente_m DECIMAL(10, 2) NOT NULL,
    fondo_m DECIMAL(10, 2) NOT NULL,
    precio_publicado_usd DECIMAL(12, 2),
    servicios_basicos TINYINT(1) DEFAULT 0,
    via_asfaltada TINYINT(1) DEFAULT 0,
    folio_real TINYINT(1) DEFAULT 0,
    propietario VARCHAR(200),
    telefono_contacto VARCHAR(20),
    imagen_url VARCHAR(500),
    FOREIGN KEY (zona_id) REFERENCES zonas(id)
);

-- Insertar 5 lotes realistas distribuidos en las zonas
INSERT INTO lotes (titulo, zona_id, direccion, superficie_m2, frente_m, fondo_m, precio_publicado_usd, servicios_basicos, via_asfaltada, folio_real, propietario, telefono_contacto, imagen_url) VALUES
('Lote Residencial Tiquipaya', 1, 'Av. Principal Tiquipaya', 500.00, 20.00, 25.00, 75000.00, 1, 1, 1, 'Juan Pérez', '+591 44123456', 'https://i.pinimg.com/1200x/9a/4e/8f/9a4e8f17b5b510a4b2891837c8f57665.jpg'),
('Lote Cala Cala Premium', 2, 'Calle Cala Cala #123', 350.00, 15.00, 23.00, 125000.00, 1, 1, 1, 'María González', '+591 447890123', 'https://i.pinimg.com/1200x/3f/42/63/3f4263a47755692d72a8b996851b5470.jpg'),
('Lote Sacaba Quintanilla', 3, 'Calle Quintanilla #456', 420.00, 18.00, 22.00, 52000.00, 1, 0, 0, 'Carlos Sánchez', '+591 445555555', 'https://i.pinimg.com/736x/3c/1b/d2/3c1bd2b880ca82fa261789fe8cfda655.jpg'),
('Lote Quillacollo El Paso', 4, 'Calle El Paso #789', 600.00, 25.00, 30.00, 58000.00, 0, 0, 1, 'Ana Martínez', '+591 443333333', 'https://i.pinimg.com/1200x/28/6a/d0/286ad0208f5f3c2800f92cb9668fbde8.jpg'),
('Lote Zona Sur Tamborada', 5, 'Av. Tamborada #321', 380.00, 16.00, 24.00, 32000.00, 1, 1, 0, 'Roberto Fernández', '+591 442222222', 'https://i.pinimg.com/1200x/4e/df/24/4edf24ac81bf22e99c4169307685bfcb.jpg');

-- Consultas de visita/contacto
CREATE TABLE consultas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lote_id INT NOT NULL,
    nombre_cliente VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    mensaje TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lote_id) REFERENCES lotes(id)
);

-- Verificación de datos
SELECT '--- Zonas ---' AS info;
SELECT * FROM zonas ORDER BY id;

SELECT '--- Lotes ---' AS info;
SELECT l.id, l.titulo, z.nombre AS zona_nombre, z.macrodistrito, z.precio_m2_usd,
       l.superficie_m2, l.frente_m, l.fondo_m, l.precio_publicado_usd,
       l.servicios_basicos, l.via_asfaltada, l.folio_real
FROM lotes l
JOIN zonas z ON l.zona_id = z.id
ORDER BY z.id, l.id;

SELECT '--- Consultas ---' AS info;
SELECT * FROM consultas ORDER BY id DESC LIMIT 5;