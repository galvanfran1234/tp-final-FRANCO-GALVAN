-- ========================================================
-- Base de Datos: veterinaria_patitas_felices
-- Proyecto: Sistema de Gestión Veterinaria (API REST)
-- ========================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `historial_clinico`;
DROP TABLE IF EXISTS `mascotas`;
DROP TABLE IF EXISTS `duenos`;
DROP TABLE IF EXISTS `veterinarios`;
SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------
-- 1. Tabla: veterinarios
-- --------------------------------------------------------
CREATE TABLE `veterinarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 2. Tabla: duenos
-- --------------------------------------------------------
CREATE TABLE `duenos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `id_veterinario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_veterinario` (`id_veterinario`),
  CONSTRAINT `fk_duenos_veterinario` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinarios` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. Tabla: mascotas
-- --------------------------------------------------------
CREATE TABLE `mascotas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `especie` varchar(30) NOT NULL,
  `fecha_nacimiento` varchar(20) DEFAULT NULL,
  `id_dueno` int(11) DEFAULT NULL,
  `id_veterinario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_dueno` (`id_dueno`),
  KEY `id_veterinario` (`id_veterinario`),
  CONSTRAINT `fk_mascotas_dueno` FOREIGN KEY (`id_dueno`) REFERENCES `duenos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_mascotas_veterinario` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinarios` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. Tabla: historial_clinico
-- --------------------------------------------------------
CREATE TABLE `historial_clinico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_mascota` int(11) DEFAULT NULL,
  `id_veterinario` int(11) DEFAULT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descripcion` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_mascota` (`id_mascota`),
  KEY `id_veterinario` (`id_veterinario`),
  CONSTRAINT `fk_historial_mascota` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_historial_veterinario` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinarios` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- DATOS SEMILLA (Seed Data para Pruebas / Portfolio)
-- Contraseña para ambos usuarios demo: Password123!
-- ========================================================

INSERT INTO `veterinarios` (`id`, `nombre`, `apellido`, `matricula`, `especialidad`, `email`, `password`, `role`) VALUES
(1, 'Franco', 'Demo', 'VET-DEMO-01', 'Medicina General', 'demo@veterinaria.com', '$2b$10$y7h4tfPPk1CBaeFFReW8E.YQS4EdpQ50dI9gtE97ICjrl9lD849fG', 'user'),
(2, 'Admin', 'Veterinaria', 'VET-ADMIN-01', 'Cirugía y Administración', 'admin@veterinaria.com', '$2b$10$y7h4tfPPk1CBaeFFReW8E.YQS4EdpQ50dI9gtE97ICjrl9lD849fG', 'admin');

INSERT INTO `duenos` (`id`, `nombre`, `apellido`, `telefono`, `direccion`, `id_veterinario`) VALUES
(1, 'Juan', 'Perez', '1145678901', 'Av. Corrientes 1234', 1),
(2, 'Maria', 'Gomez', '1198765432', 'Calle Belgrano 456', 1),
(3, 'Carlos', 'Lopez', '1134567890', 'Boulevard San Martín 789', 2);

INSERT INTO `mascotas` (`id`, `nombre`, `especie`, `fecha_nacimiento`, `id_dueno`, `id_veterinario`) VALUES
(1, 'Firulais', 'Perro', '2019', 1, 1),
(2, 'Michi', 'Gato', '2021', 2, 1),
(3, 'Luna', 'Conejo', '2022', 1, 1);

INSERT INTO `historial_clinico` (`id`, `id_mascota`, `id_veterinario`, `fecha_registro`, `descripcion`) VALUES
(1, 1, 1, '2026-02-10 10:30:00', 'Chequeo anual y vacunación antirrábica aplicada con éxito.'),
(2, 2, 1, '2026-02-15 16:45:00', 'Desparasitación preventiva y control de peso.');
