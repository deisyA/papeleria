-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-07-2021 a las 17:26:04
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ppapeleria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `id_documento` varchar(30) NOT NULL,
  `id_usuario` int(15) NOT NULL,
  `tipo_documento` varchar(30) NOT NULL,
  `primer_nombre` varchar(30) NOT NULL,
  `segundo_nombre` varchar(30) DEFAULT NULL,
  `primer_apellido` varchar(30) NOT NULL,
  `segundo_apellido` varchar(30) DEFAULT NULL,
  `telefono` int(20) NOT NULL,
  `direccion` varchar(60) DEFAULT NULL,
  `eps` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada_producto`
--

CREATE TABLE `entrada_producto` (
  `id_entrada_producto` int(15) NOT NULL,
  `id_producto` int(15) NOT NULL,
  `id_factura` int(15) NOT NULL,
  `concepto_entrada` varchar(30) NOT NULL,
  `cantidad_entrada` int(15) NOT NULL,
  `garantia` date NOT NULL,
  `vencimiento` date NOT NULL,
  `costo` float NOT NULL,
  `costo_unitario` float NOT NULL,
  `precio_venta_unitario` float NOT NULL,
  `prcio_venta` float NOT NULL,
  `porcentaje_ganancia` float NOT NULL,
  `ganancia` float NOT NULL,
  `ganancia_unitario` float NOT NULL,
  `creador_registro` int(15) NOT NULL,
  `fecha_creacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `existencia`
--

CREATE TABLE `existencia` (
  `id_existencia` int(15) NOT NULL,
  `id_entrada_producto` int(15) NOT NULL,
  `cantidad_lote` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id_factura` int(11) NOT NULL,
  `id_proveedor` int(15) NOT NULL,
  `id_documento` varchar(30) NOT NULL,
  `fecha_factura` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `valor_factura` int(15) NOT NULL,
  `forma` varchar(30) NOT NULL,
  `creador_registro` int(15) NOT NULL,
  `fecha_ingreso` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

CREATE TABLE `modulo` (
  `id_modulo` int(15) NOT NULL,
  `nombre_modulo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `id_permiso` int(15) NOT NULL,
  `nombre_permiso` varchar(30) NOT NULL,
  `id_modulo` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(15) NOT NULL,
  `nombre_producto` varchar(50) NOT NULL,
  `referencia_producto` varchar(100) NOT NULL,
  `marca_producto` varchar(60) NOT NULL,
  `color_producto` varchar(30) NOT NULL,
  `presentacion` varchar(30) NOT NULL,
  `imagen` varchar(20) NOT NULL,
  `peso` int(15) NOT NULL,
  `tipo_medida` varchar(15) NOT NULL,
  `tamaño` varchar(15) NOT NULL,
  `descripcion_producto` varchar(200) NOT NULL,
  `palabras_clave` varchar(200) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `creador_registro` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id_proveedor` int(15) NOT NULL,
  `nombre_proveedor` varchar(30) NOT NULL,
  `telefono_proveedor` int(20) DEFAULT NULL,
  `telefono_dos` int(20) DEFAULT NULL,
  `nit` varchar(60) DEFAULT NULL,
  `direccion` varchar(60) DEFAULT NULL,
  `productos_proveedor` varchar(200) DEFAULT NULL,
  `descripcion_proveedor` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(15) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre`) VALUES
(1, 'administradora'),
(2, 'trabajadora'),
(3, 'invitada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_permiso`
--

CREATE TABLE `rol_permiso` (
  `id_rol_permiso` int(15) NOT NULL,
  `id_permiso` int(15) NOT NULL,
  `id_rol` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida_producto`
--

CREATE TABLE `salida_producto` (
  `id_salida_producto` int(15) NOT NULL,
  `id_producto` int(15) NOT NULL,
  `concepto_salida` varchar(30) NOT NULL,
  `cantidad_salida` int(15) NOT NULL,
  `precio_venta` int(15) NOT NULL,
  `precio_venta_unitario` int(15) NOT NULL,
  `responsable_salida` varchar(30) NOT NULL,
  `creador_registro` int(15) NOT NULL,
  `fecha_registro` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(15) NOT NULL,
  `nombre_usuario` varchar(30) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `password` varchar(80) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_rol` int(15) NOT NULL DEFAULT 3,
  `id_empleado` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `correo`, `password`, `fecha`, `id_rol`, `id_empleado`) VALUES
(1, '', '', '', '2021-06-01 00:00:00', 1, 0),
(2, 'dei', '', '', '2021-06-01 00:00:00', 3, 0),
(11, 'deisy', 'deisy@deisy', '$2a$08$ecnaJAVRdSLpoGC3fnWt/uS', '2021-06-01 00:00:00', 1, 0),
(12, 'jean', 'jean@jean', '$2a$08$oiz4uFFKlObZ2nBJPSqdT.A', '2021-06-01 00:00:00', 3, 0),
(13, 'manu', 'manu', '$2a$08$XXmFkIi9V7DVQodn/MCzDeG', '2021-06-01 00:00:00', 1, 0),
(14, 'admin', 'admin@admin', '1234', '0000-00-00 00:00:00', 1, 1),
(16, 'admin1', 'admin1@admin', '$2a$08$9XOlH.QcmhEnDI.6bXGRjuG', '2021-06-02 00:00:00', 1, 0),
(17, 'empl1', 'empl1@empleada', '$2a$08$AgaXnYCZIF21bj3/5ZmjbuW', '2021-06-02 00:00:00', 2, 0),
(18, 'dani', 'dani', '$2a$08$rtWfwjM6k2Qs6rDd6FpWK.D', '2021-06-02 00:00:00', 1, 0),
(19, 'admin2', 'admin2', '$2a$08$HB9fAGfJdwuhH3FAWbm4MeI7Zg1FdClJNyyUkqRztpGsyVEXmIGhC', '2021-06-08 13:37:13', 1, 1),
(20, 'visit1', 'visit1', '$2a$08$ZeNG4Frhr6lYa9SKxpEA9eJnw.Ch7ye1dIyW/Hs8mU9UJfyXIka6G', '2021-06-08 13:42:36', 3, 3),
(21, 'visit3', 'visit3', '$2a$08$Lsgr8p95RJa9xJmdw9rDcOvUlbQbjOIPhcrmt/49q1qq0K2WgNqiC', '2021-06-16 04:08:16', 3, 3),
(22, 'policarpa', 'policarpa@gmail.com', '$2a$08$2OPyLw2o.BcIe0Ys/3RxiOl.rHZMOxQ8gzOu7IssxTs8.fIbFKm0i', '2021-06-18 17:14:17', 1, 1),
(23, 'lina', 'lina@gmail.com', '$2a$08$egm6NQDIHhyk9JmI3ldSqOAW/1doa6IoL5THYGsbmAExZOW1ZCmtS', '2021-06-18 17:56:17', 2, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id_documento`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `entrada_producto`
--
ALTER TABLE `entrada_producto`
  ADD PRIMARY KEY (`id_entrada_producto`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_factura` (`id_factura`),
  ADD KEY `creador_registro` (`creador_registro`);

--
-- Indices de la tabla `existencia`
--
ALTER TABLE `existencia`
  ADD PRIMARY KEY (`id_existencia`),
  ADD KEY `id_entrada_producto` (`id_entrada_producto`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id_factura`),
  ADD KEY `id_proveedor` (`id_proveedor`),
  ADD KEY `id_empleado` (`id_documento`),
  ADD KEY `creador_registro` (`creador_registro`);

--
-- Indices de la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD PRIMARY KEY (`id_modulo`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD PRIMARY KEY (`id_permiso`),
  ADD KEY `id_modulos` (`id_modulo`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `creador_registro` (`creador_registro`),
  ADD KEY `creador_registro_2` (`creador_registro`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `rol_permiso`
--
ALTER TABLE `rol_permiso`
  ADD PRIMARY KEY (`id_rol_permiso`),
  ADD KEY `id_permisos` (`id_permiso`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indices de la tabla `salida_producto`
--
ALTER TABLE `salida_producto`
  ADD PRIMARY KEY (`id_salida_producto`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `creador_registro` (`creador_registro`),
  ADD KEY `responsable_salida` (`responsable_salida`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `entrada_producto`
--
ALTER TABLE `entrada_producto`
  MODIFY `id_entrada_producto` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `existencia`
--
ALTER TABLE `existencia`
  MODIFY `id_existencia` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `id_factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `modulo`
--
ALTER TABLE `modulo`
  MODIFY `id_modulo` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `id_permiso` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id_proveedor` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rol_permiso`
--
ALTER TABLE `rol_permiso`
  MODIFY `id_rol_permiso` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `salida_producto`
--
ALTER TABLE `salida_producto`
  MODIFY `id_salida_producto` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `entrada_producto`
--
ALTER TABLE `entrada_producto`
  ADD CONSTRAINT `entrada_producto_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `entrada_producto_ibfk_2` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id_factura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `entrada_producto_ibfk_3` FOREIGN KEY (`creador_registro`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `existencia`
--
ALTER TABLE `existencia`
  ADD CONSTRAINT `existencia_ibfk_1` FOREIGN KEY (`id_entrada_producto`) REFERENCES `entrada_producto` (`id_entrada_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`id_documento`) REFERENCES `empleado` (`id_documento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factura_ibfk_3` FOREIGN KEY (`creador_registro`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD CONSTRAINT `permiso_ibfk_1` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id_modulo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`creador_registro`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rol_permiso`
--
ALTER TABLE `rol_permiso`
  ADD CONSTRAINT `rol_permiso_ibfk_3` FOREIGN KEY (`id_permiso`) REFERENCES `permiso` (`id_permiso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rol_permiso_ibfk_4` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `salida_producto`
--
ALTER TABLE `salida_producto`
  ADD CONSTRAINT `salida_producto_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `salida_producto_ibfk_2` FOREIGN KEY (`creador_registro`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
