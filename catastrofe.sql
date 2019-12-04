-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 04, 2019 at 07:21 PM
-- Server version: 5.5.20
-- PHP Version: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `catastrofe`
--

-- --------------------------------------------------------

--
-- Table structure for table `catastrofe`
--

CREATE TABLE IF NOT EXISTS `catastrofe` (
  `id_catastrofe` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `local` varchar(100) NOT NULL,
  `morte` int(11) NOT NULL,
  `sobrevivente` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `data_ocorrida` date NOT NULL,
  `area_abrangente` varchar(100) NOT NULL,
  PRIMARY KEY (`id_catastrofe`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=53 ;

--
-- Dumping data for table `catastrofe`
--

INSERT INTO `catastrofe` (`id_catastrofe`, `nome`, `local`, `morte`, `sobrevivente`, `descricao`, `data_ocorrida`, `area_abrangente`) VALUES
(47, 'tsunami', 'japÃ£o', 567, 0, 'ondas gigantes', '2019-12-26', 'todo lugar'),
(48, 'maremoto', 'oceano', 73, 24, 'ondas muito fortes', '2019-12-28', 'oceano'),
(49, 'teremoto', 'india', 2035, 3701, 'movimento das placas tectoniccas', '2019-12-20', 'india'),
(50, 'erupÃ§Ã£o vulcanica', 'ponpeia', 30023, 0, 'o monte vesÃºvio entrou em erupÃ§Ã£o', '0078-05-10', 'italia'),
(51, 'furacÃ£o ', 'nova york', 4503, 225536, 'furacÃ£o', '2005-06-04', 'cidade inteira');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
