-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 28-Abr-2022 às 23:46
-- Versão do servidor: 8.0.28-0ubuntu0.20.04.3
-- versão do PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projeto`
--
CREATE DATABASE IF NOT EXISTS `projeto` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `projeto`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Empresas`
--

CREATE TABLE `Empresas` (
  `id_empresas` int NOT NULL,
  `nome` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Vagas`
--

CREATE TABLE `Vagas` (
  `id_vagas` int NOT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  `salario` float DEFAULT NULL,
  `descricao` text,
  `empresas_id_fk` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `Empresas`
--
ALTER TABLE `Empresas`
  ADD PRIMARY KEY (`id_empresas`);

--
-- Índices para tabela `Vagas`
--
ALTER TABLE `Vagas`
  ADD PRIMARY KEY (`id_vagas`),
  ADD KEY `empresas_id_fk` (`empresas_id_fk`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Empresas`
--
ALTER TABLE `Empresas`
  MODIFY `id_empresas` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Vagas`
--
ALTER TABLE `Vagas`
  MODIFY `id_vagas` int NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `Vagas`
--
ALTER TABLE `Vagas`
  ADD CONSTRAINT `Vagas_ibfk_1` FOREIGN KEY (`empresas_id_fk`) REFERENCES `Empresas` (`id_empresas`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
