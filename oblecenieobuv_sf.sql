-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 23, 2019 at 06:22 PM
-- Server version: 5.7.24
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oblecenieobuv_sf`
--

-- --------------------------------------------------------

--
-- Table structure for table `artikel`
--

DROP TABLE IF EXISTS `artikel`;
CREATE TABLE IF NOT EXISTS `artikel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aktivny` tinyint(1) NOT NULL,
  `schovany` tinyint(1) NOT NULL,
  `vymazany` tinyint(1) NOT NULL,
  `datum_pridania` datetime NOT NULL,
  `datum_aktualizacie` datetime DEFAULT NULL,
  `expiracia_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(10) NOT NULL,
  `artikel_typ_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `gallery_id` int(11) DEFAULT NULL,
  `katalog_id` int(11) DEFAULT NULL,
  `znacka_id` int(11) DEFAULT NULL,
  `titulok` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cena` decimal(9,2) DEFAULT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `popis` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_A4375C33DFEB2608` (`katalog_id`),
  KEY `IDX_A4375C33113C1FD1` (`znacka_id`),
  KEY `IDX_A4375C33ED70AA70` (`artikel_typ_id`),
  KEY `IDX_A4375C3338248176` (`currency_id`),
  KEY `IDX_A4375C334E7AF8F` (`gallery_id`),
  KEY `IDX_A4375C334A20E996` (`expiracia_id`),
  KEY `fk_artikel_user_dx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `artikel_typ`
--

DROP TABLE IF EXISTS `artikel_typ`;
CREATE TABLE IF NOT EXISTS `artikel_typ` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `popis` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `artikel_typ`
--

INSERT INTO `artikel_typ` (`id`, `popis`) VALUES
('ARTICLE_DRESS', 'Artikle pre oblečenie'),
('ARTICLE_SHOES', 'Artikle pre obuv');

-- --------------------------------------------------------

--
-- Table structure for table `artikel_x_material`
--

DROP TABLE IF EXISTS `artikel_x_material`;
CREATE TABLE IF NOT EXISTS `artikel_x_material` (
  `artikel_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  PRIMARY KEY (`artikel_id`,`material_id`),
  KEY `IDX_A7DF768FEEDF290A` (`artikel_id`),
  KEY `IDX_A7DF768FE308AC6F` (`material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `artikel_x_obdobie`
--

DROP TABLE IF EXISTS `artikel_x_obdobie`;
CREATE TABLE IF NOT EXISTS `artikel_x_obdobie` (
  `artikel_id` int(11) NOT NULL,
  `obdobie_id` int(11) NOT NULL,
  PRIMARY KEY (`artikel_id`,`obdobie_id`),
  KEY `IDX_B227EDA6EEDF290A` (`artikel_id`),
  KEY `IDX_B227EDA6DC4AAC9A` (`obdobie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `artikel_x_prekoho`
--

DROP TABLE IF EXISTS `artikel_x_prekoho`;
CREATE TABLE IF NOT EXISTS `artikel_x_prekoho` (
  `artikel_id` int(11) NOT NULL,
  `prekoho_id` int(11) NOT NULL,
  PRIMARY KEY (`artikel_id`,`prekoho_id`),
  KEY `IDX_6373F6F1EEDF290A` (`artikel_id`),
  KEY `IDX_6373F6F17089CA09` (`prekoho_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `artikel_x_stav`
--

DROP TABLE IF EXISTS `artikel_x_stav`;
CREATE TABLE IF NOT EXISTS `artikel_x_stav` (
  `artikel_id` int(11) NOT NULL,
  `stav_id` int(11) NOT NULL,
  PRIMARY KEY (`artikel_id`,`stav_id`),
  KEY `IDX_C9FE4D00EEDF290A` (`artikel_id`),
  KEY `IDX_C9FE4D00A359E780` (`stav_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `credit`
--

DROP TABLE IF EXISTS `credit`;
CREATE TABLE IF NOT EXISTS `credit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency_id` int(11) DEFAULT NULL,
  `user_id` int(10) NOT NULL,
  `date_create` datetime NOT NULL,
  `id_credit_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `used` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_1CC16EFE77153098` (`code`),
  KEY `IDX_1CC16EFE38248176` (`currency_id`),
  KEY `IDX_1CC16EFE930E25E3` (`id_credit_type`),
  KEY `IDX_1CC16EFE9B3651C6` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `credit_type`
--

DROP TABLE IF EXISTS `credit_type`;
CREATE TABLE IF NOT EXISTS `credit_type` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(9,2) NOT NULL,
  `currency_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_8B1CE81438248176` (`currency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `credit_type`
--

INSERT INTO `credit_type` (`id`, `description`, `price`, `currency_id`) VALUES
('SINGLE', 'Jednorázový kredit', '1.69', 1),
('URL', 'URL kredit', '13.00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
CREATE TABLE IF NOT EXISTS `currency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sign` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `valid_from` date NOT NULL,
  `valid_to` date NOT NULL,
  `date_create` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`id`, `name`, `description`, `sign`, `valid_from`, `valid_to`, `date_create`) VALUES
(1, 'EUR', 'Euro', '€', '0000-00-00', '0000-00-00', '2016-10-30 14:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `expiracia`
--

DROP TABLE IF EXISTS `expiracia`;
CREATE TABLE IF NOT EXISTS `expiracia` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `day_interval` int(11) NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `expiracia`
--

INSERT INTO `expiracia` (`id`, `description`, `day_interval`, `zorad`) VALUES
('HALF_YEAR', '183 dní (pol roka)', 183, 20),
('ONE_MONTH', '30 dní (mesiac)', 30, 10),
('ONE_WEEK', '7 dní (týždeň)', 7, 1),
('ONE_YEAR', '365 dní (rok)', 365, 25),
('THREE_MONTHS', '90 dní (3 mesiace)', 90, 15),
('TWO_WEEKS', '14 dní (2 týždne)', 14, 2);

-- --------------------------------------------------------

--
-- Table structure for table `katalog`
--

DROP TABLE IF EXISTS `katalog`;
CREATE TABLE IF NOT EXISTS `katalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `titulok` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `datum_pridania` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_28C37C209B3651C6` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
CREATE TABLE IF NOT EXISTS `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `material`
--

INSERT INTO `material` (`id`, `nazov`) VALUES
(1, 'Bavlna'),
(2, 'Guma'),
(3, 'Riflovina'),
(4, 'Flanel'),
(5, 'Silon'),
(6, 'Froté'),
(7, 'Menčester'),
(8, 'Semiš'),
(9, 'Umelý semiš'),
(10, 'Koža'),
(11, 'Polokožená'),
(12, 'Umelá koža/Imitácia kože'),
(13, 'Textil'),
(14, 'Kožušina'),
(15, 'Hodváb'),
(16, 'Kašmír'),
(17, 'Teflón'),
(18, 'Zamat'),
(19, 'Polyester'),
(20, 'Lisovaný polypropylen'),
(21, 'Termo'),
(22, 'Ľan'),
(23, 'Nubuck'),
(24, 'Satén'),
(25, 'Nylon'),
(26, 'Syntetika'),
(27, 'Mikrovlákno'),
(28, 'Penová živica'),
(29, 'Plátno'),
(30, 'Polyretaun'),
(31, 'PVC'),
(32, 'Acetát'),
(33, 'Alpaka'),
(34, 'Angora'),
(35, 'Anilínová koža'),
(36, 'Batist'),
(37, 'Bangalín'),
(38, 'Brokát'),
(39, 'Buklé'),
(40, 'Buret'),
(41, 'Climalite'),
(42, 'Cordura'),
(43, 'Crepe'),
(44, 'Crinkle'),
(45, 'Cupro'),
(46, 'Denim'),
(47, 'Dégradé'),
(48, 'Dorlastan'),
(49, 'Dralon'),
(50, 'Elastan'),
(51, 'Etamín'),
(52, 'Flis'),
(53, 'Fulár'),
(54, 'Gabardén'),
(55, 'Gaufré'),
(56, 'Changeant'),
(57, 'Charmeuse'),
(58, 'Chenille'),
(59, 'Chintz'),
(60, 'Indické plátno'),
(61, 'Jahňacia kožušina'),
(62, 'Jahňacia koža Napa'),
(63, 'Japonský hodváb'),
(64, 'Kloké'),
(65, 'Kotelé'),
(66, 'Koža Chevreaux'),
(67, 'Koža Napa'),
(68, 'Krčený zamat'),
(69, 'Krepdešín'),
(70, 'Kreš'),
(71, 'Lamé'),
(72, 'Limon'),
(73, 'Lycra'),
(74, 'Madrasové káro'),
(75, 'Mako'),
(76, 'Marokén'),
(77, 'Matlasé'),
(78, 'Melanž'),
(79, 'Mikrovlákno Meryl'),
(80, 'Moaré'),
(81, 'Modal'),
(82, 'Mohér'),
(83, 'Náplne z dutého vlákna'),
(84, 'Natté'),
(85, 'Nubuková koža'),
(86, 'Ombré'),
(87, 'Organtín'),
(88, 'Organza'),
(89, 'Piké'),
(90, 'Polyakryl/Akryl'),
(91, 'Polyamid'),
(92, 'Polynosic'),
(93, 'Polyuretán'),
(94, 'Popelín'),
(95, 'Satén double'),
(96, 'Seersucker'),
(97, 'Serž'),
(98, 'Stone washed'),
(99, 'Streč'),
(100, 'Strečová bavlna'),
(101, 'Strihaná vlna'),
(102, 'Šanžán'),
(103, 'Šifón'),
(104, 'Štiepenková useň'),
(105, 'Tactel'),
(106, 'Tencel'),
(107, 'Tvíd'),
(108, 'Tvil'),
(109, 'Used washed'),
(110, 'Velúr'),
(111, 'Velúr - Kozinka'),
(112, 'Velveteen'),
(113, 'Viskóza'),
(114, 'Vlna Merino'),
(115, 'Voál'),
(116, 'Zmesová tkanina'),
(117, 'Žakár'),
(118, 'Žarzej'),
(119, 'Žoržet'),
(120, 'ostatné'),
(121, 'Nepremokavý'),
(125, 'Novy mat'),
(126, 'Super'),
(127, 'Moj materiál'),
(128, 'Dasdsad'),
(129, 'Sd asd'),
(135, 'Jds'),
(136, 'Bav');

-- --------------------------------------------------------

--
-- Table structure for table `migration_versions`
--

DROP TABLE IF EXISTS `migration_versions`;
CREATE TABLE IF NOT EXISTS `migration_versions` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `obdobie`
--

DROP TABLE IF EXISTS `obdobie`;
CREATE TABLE IF NOT EXISTS `obdobie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `obdobie`
--

INSERT INTO `obdobie` (`id`, `nazov`, `zorad`) VALUES
(1, 'Jarné', 10),
(2, 'Letné', 20),
(3, 'Jesenné', 30),
(4, 'Zimné', 40),
(5, 'Indoorové', 50),
(6, 'Nezáleží', 60);

-- --------------------------------------------------------

--
-- Table structure for table `oblecenie`
--

DROP TABLE IF EXISTS `oblecenie`;
CREATE TABLE IF NOT EXISTS `oblecenie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artikel_id` int(11) DEFAULT NULL,
  `kategoria_id` int(11) DEFAULT NULL,
  `zostrih_id` int(11) DEFAULT NULL,
  `velkost_id` int(11) DEFAULT NULL,
  `velkost_cislo` decimal(4,1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_FAF6ECDAEEDF290A` (`artikel_id`),
  KEY `IDX_FAF6ECDA359B0684` (`kategoria_id`),
  KEY `IDX_FAF6ECDAE992B21` (`zostrih_id`),
  KEY `IDX_FAF6ECDA3A51F8D0` (`velkost_id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oblecenie`
--

INSERT INTO `oblecenie` (`id`, `artikel_id`, `kategoria_id`, `zostrih_id`, `velkost_id`, `velkost_cislo`) VALUES
(3, 11, 7, 1, 1, '0.0'),
(4, 12, 12, 3, 2, '0.0'),
(5, 13, 17, 1, 13, '0.0'),
(6, 14, 17, 1, 13, '0.0'),
(7, 15, 17, 1, 13, '0.0'),
(8, 16, 11, 4, NULL, '5.0'),
(9, 17, 18, 3, 11, '0.0'),
(10, 18, 16, 1, 13, '0.4'),
(11, 21, 21, 4, 12, '0.0'),
(12, 22, 19, 4, 4, '0.0'),
(13, 23, 19, 4, 4, '0.0'),
(14, 24, 19, 4, 12, '0.0'),
(15, 25, 19, 4, 12, '0.0'),
(16, 26, 19, 4, 12, '0.0'),
(17, 27, 19, 4, 12, '0.0'),
(18, 28, 19, 4, 12, '0.0'),
(19, 29, 19, 4, 12, '45.0'),
(20, 30, 19, 4, 12, '45.0'),
(21, 31, 19, 4, 12, '0.0'),
(22, 32, 19, 4, 12, '0.0'),
(23, 33, 19, 4, 12, '0.0'),
(24, 34, 19, 4, 12, '0.0'),
(25, 35, 19, 4, 12, '0.0'),
(26, 36, 19, 4, 12, '0.0'),
(27, 37, 19, 4, 12, '0.0'),
(28, 38, 19, 4, 12, '0.0'),
(29, 39, 19, 4, 12, '0.0'),
(30, 40, 19, 4, 12, '0.0'),
(31, 41, 19, 4, 12, '0.0'),
(32, 42, 19, 4, 12, '45.0'),
(33, 43, 19, 4, 12, '0.0'),
(34, 44, 19, 4, 12, '45.0'),
(35, 45, 19, 4, 12, '0.0'),
(36, 46, 19, 4, 12, '0.0'),
(37, 47, 19, 4, 12, '0.0'),
(38, 48, 19, 4, 12, '0.0'),
(39, 50, 21, 2, 3, '0.0'),
(40, 51, 21, 2, 3, '0.0'),
(41, 52, 19, 4, 12, '0.0'),
(42, 53, 19, 4, 12, '0.0'),
(43, 54, 29, 4, 3, '0.0'),
(44, 55, 76, 4, 12, '0.0'),
(45, 56, 17, 1, 12, '0.0'),
(46, 62, 21, 2, 3, '0.0'),
(47, 63, 21, 2, 3, '0.0'),
(48, 65, 22, 4, 12, '0.0'),
(49, 66, 17, 3, 4, '0.0'),
(50, 67, 25, 3, 10, '0.0'),
(51, 68, 21, 4, 12, '0.0'),
(52, 69, 45, 2, 6, '0.0'),
(53, 70, 19, 4, 12, '0.0'),
(54, 71, 19, 4, 12, '45.0'),
(55, 72, 29, 4, 3, '0.0'),
(56, 73, 29, 4, 3, '0.0'),
(57, 74, 7, 1, 1, '0.0'),
(58, 75, 19, 4, 12, '0.0'),
(59, 76, 23, 4, 13, '0.0'),
(60, 78, 21, 4, 13, '0.0'),
(61, 79, 21, 4, 13, '0.0'),
(62, 80, 21, 4, 13, '0.0'),
(63, 81, 21, 4, 13, '0.0'),
(64, 82, 21, 4, 13, '0.0'),
(65, 83, 21, 4, 13, '0.0'),
(66, 84, 21, 4, 13, '0.0'),
(67, 85, 21, 4, 13, '0.0'),
(68, 86, 21, 4, 13, '0.0'),
(69, 87, 21, 4, 13, '0.0'),
(70, 88, 21, 4, 13, '0.0'),
(71, 89, 21, 4, 13, '0.0'),
(72, 90, 21, 4, 13, '0.0'),
(73, 91, 23, 3, 11, '0.0'),
(74, 92, 23, 4, 11, '0.0'),
(75, 93, 15, 1, 12, '0.0'),
(76, 94, 23, 4, 11, '0.0'),
(77, 95, 45, 3, 11, '0.0'),
(78, 96, 17, 3, 3, '0.0'),
(79, 97, 19, 3, 4, '0.0'),
(80, 98, 20, 4, 3, '0.0'),
(81, 99, 12, 4, 12, '0.0'),
(82, 100, 17, 2, 5, '0.0'),
(83, 101, 19, 4, 12, '0.0'),
(84, 102, 19, 4, 12, '0.0'),
(85, 103, 19, 4, 12, '0.0'),
(86, 104, 19, 4, 12, '0.0'),
(87, 105, 19, 4, 12, '0.0'),
(88, 106, 19, 4, 12, '0.0'),
(89, 107, 19, 4, 12, '0.0'),
(90, 108, 19, 4, 12, '0.0'),
(91, 109, 19, 4, 12, '0.0'),
(92, 110, 19, 4, 12, '0.0'),
(93, 111, 19, 4, 12, '0.0'),
(94, 112, 19, 4, 12, '0.0'),
(95, 113, 19, 4, 12, '0.0'),
(96, 114, 19, 4, 12, '0.0'),
(97, 115, 19, 4, 12, '0.0'),
(98, 116, 19, 4, 12, '0.0'),
(99, 117, 22, 3, 4, '0.0'),
(100, 118, 22, 4, 3, '0.0'),
(101, 119, 17, 4, 13, '0.0'),
(102, 120, 22, 3, 13, '0.0'),
(103, 121, 19, 4, 12, '0.0');

-- --------------------------------------------------------

--
-- Table structure for table `oblecenie_kategorie`
--

DROP TABLE IF EXISTS `oblecenie_kategorie`;
CREATE TABLE IF NOT EXISTS `oblecenie_kategorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rodic` int(11) DEFAULT NULL,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oblecenie_kategorie`
--

INSERT INTO `oblecenie_kategorie` (`id`, `rodic`, `nazov`, `zorad`) VALUES
(1, 0, 'Spodná bielizeň', 10),
(2, 0, 'Ruky, Hlava, Krk', 20),
(3, 0, 'Vrch', 30),
(4, 0, 'Spodok', 40),
(5, 0, 'Celé oblečenie', 50),
(6, 0, 'Doplnky', 60),
(7, 1, 'Tielka', 70),
(8, 1, 'Podprsenky', 80),
(9, 1, 'Nohavičky', 90),
(10, 1, 'Tangá', 100),
(11, 1, 'Boxerky, Trenírky', 110),
(12, 1, 'Slipy', 120),
(13, 1, 'Ponožky, Podkolienky', 130),
(14, 1, 'Spodky', 140),
(15, 1, 'Pančucháče', 150),
(16, 1, 'Plavky', 160),
(17, 1, 'Bikiny', 170),
(18, 1, 'Tvarujúca, Sťahovacia, Zoštíhlujúca bielizeň', 180),
(19, 1, 'Súpravy, Komplety', 190),
(20, 1, 'Podväzové pásy', 200),
(21, 2, 'Čiapky', 210),
(22, 2, 'Šiltovky', 220),
(23, 2, 'Klobúky', 230),
(24, 2, 'Chrániče uší', 240),
(25, 2, 'Rukavice', 250),
(26, 2, 'Rukavičky, Rukávniky', 260),
(27, 2, 'Šály, Šatky', 270),
(28, 2, 'Kravaty, Motýliky', 280),
(29, 3, 'Kabáty', 290),
(30, 3, 'Bundy', 300),
(31, 3, 'Bombery', 310),
(32, 3, 'Svetre', 320),
(33, 3, 'Pulóvre', 330),
(34, 3, 'Roláky', 340),
(35, 3, 'Mikiny', 350),
(36, 3, 'Tričká', 360),
(37, 3, 'Topy', 370),
(38, 3, 'Košele', 380),
(39, 3, 'Korzety', 390),
(40, 3, 'Tuniky', 400),
(41, 3, 'Blúzky', 410),
(42, 3, 'Saká', 420),
(43, 3, 'Vesty', 430),
(44, 4, 'Tepláky', 440),
(45, 4, 'Sukne', 450),
(46, 4, 'Nohavice', 460),
(47, 4, 'Rifle, Džínsy', 470),
(48, 4, 'Legíny', 480),
(49, 5, 'Obleky', 490),
(51, 5, 'Pyžamá, Nočné košielky', 510),
(52, 5, 'Župany', 520),
(53, 5, 'Kostými', 530),
(54, 5, 'Dupačky', 540),
(55, 5, 'Pršiplášte', 550),
(56, 5, 'Súprava, Overal, Komplet', 560),
(57, 5, 'Body', 570),
(58, 5, 'Kostým', 580),
(59, 5, 'Dres', 590),
(60, 5, 'Kombinéza', 600),
(61, 5, 'Plážové oblečenie', 610),
(62, 6, 'Kabelky', 620),
(63, 6, 'Tašky', 630),
(64, 6, 'Ruksaky', 640),
(65, 6, 'Opasky, Traky', 650),
(66, 6, 'Potítka', 660),
(67, 6, 'Mašle, Čelenky, Sponky, Gumičky', 670),
(68, 6, 'Dáždniky', 680),
(69, 6, 'Slnečné okuliare', 690),
(70, 6, 'Vypchávky', 700),
(71, 6, 'Masky', 710),
(72, 6, 'Pre zvieratá', 720),
(73, 6, 'Deky, uteráky, útierky', 730),
(74, 6, 'Iné, Ďalšie', 740),
(75, 5, 'Sada oblečenia (taška rôzneho oblečenia)', 611),
(76, 4, 'Šušťáky', 465),
(77, 5, 'Šaty', 5),
(78, 3, 'Blejzre', 425);

-- --------------------------------------------------------

--
-- Table structure for table `oblecenie_prilezitost`
--

DROP TABLE IF EXISTS `oblecenie_prilezitost`;
CREATE TABLE IF NOT EXISTS `oblecenie_prilezitost` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oblecenie_prilezitost`
--

INSERT INTO `oblecenie_prilezitost` (`id`, `nazov`, `zorad`) VALUES
(-1, 'Na bežné nosenie', 10),
(2, 'Spoločenské', 20),
(3, 'Svadobné', 30),
(4, 'Elegantné', 40),
(5, 'Luxusné', 50),
(6, 'Športové', 60),
(7, 'Na spanie', 70),
(8, 'Sexy', 80),
(9, 'Tehotenské', 90),
(10, 'Do vody', 100),
(11, 'Do dažďa', 110),
(12, 'Pracovné', 120),
(13, 'Na doma', 130);

-- --------------------------------------------------------

--
-- Table structure for table `oblecenie_styl`
--

DROP TABLE IF EXISTS `oblecenie_styl`;
CREATE TABLE IF NOT EXISTS `oblecenie_styl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oblecenie_styl`
--

INSERT INTO `oblecenie_styl` (`id`, `nazov`, `zorad`) VALUES
(1, 'Voľné', 10),
(2, 'Priliehavé', 20),
(3, 'Slim', 30),
(5, 'S hrubším krkom', 50),
(6, 'Véčkové', 60),
(7, 'Polo', 70),
(8, 'Golier', 80),
(9, 'Kapucňa', 90),
(10, 'Volániky', 100),
(11, 'Čipka', 110),
(12, 'Krajka', 120),
(13, 'Dotrhané', 130),
(14, 'Zvoncové', 140);

-- --------------------------------------------------------

--
-- Table structure for table `oblecenie_velkost`
--

DROP TABLE IF EXISTS `oblecenie_velkost`;
CREATE TABLE IF NOT EXISTS `oblecenie_velkost` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oblecenie_velkost`
--

INSERT INTO `oblecenie_velkost` (`id`, `nazov`, `zorad`) VALUES
(1, 'XXS', 10),
(2, 'XS', 20),
(3, 'S', 30),
(4, 'M', 40),
(5, 'L', 50),
(6, 'XL', 60),
(7, 'XXL', 70),
(8, '3XL', 80),
(9, '4XL', 90),
(10, '5XL', 100),
(11, '6XL', 110),
(12, '7XL', 120),
(13, '8XL', 130),
(14, '9XL', 140),
(15, '10XL', 150);

-- --------------------------------------------------------

--
-- Table structure for table `oblecenie_x_prilezitost`
--

DROP TABLE IF EXISTS `oblecenie_x_prilezitost`;
CREATE TABLE IF NOT EXISTS `oblecenie_x_prilezitost` (
  `oblecenie_id` int(11) NOT NULL,
  `oblecenie_prilezitost_id` int(11) NOT NULL,
  PRIMARY KEY (`oblecenie_id`,`oblecenie_prilezitost_id`),
  KEY `IDX_E42F5930404A9EE5` (`oblecenie_id`),
  KEY `IDX_E42F5930FBF6D148` (`oblecenie_prilezitost_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oblecenie_x_styl`
--

DROP TABLE IF EXISTS `oblecenie_x_styl`;
CREATE TABLE IF NOT EXISTS `oblecenie_x_styl` (
  `oblecenie_id` int(11) NOT NULL,
  `oblecenie_styl_id` int(11) NOT NULL,
  PRIMARY KEY (`oblecenie_id`,`oblecenie_styl_id`),
  KEY `IDX_C5D26568404A9EE5` (`oblecenie_id`),
  KEY `IDX_C5D265682AB7790A` (`oblecenie_styl_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oblecenie_x_zapianie`
--

DROP TABLE IF EXISTS `oblecenie_x_zapianie`;
CREATE TABLE IF NOT EXISTS `oblecenie_x_zapianie` (
  `oblecenie_id` int(11) NOT NULL,
  `oblecenie_zapinanie_id` int(11) NOT NULL,
  PRIMARY KEY (`oblecenie_id`,`oblecenie_zapinanie_id`),
  KEY `IDX_44B8DD16404A9EE5` (`oblecenie_id`),
  KEY `IDX_44B8DD161B9C2847` (`oblecenie_zapinanie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oblecenie_zapinanie`
--

DROP TABLE IF EXISTS `oblecenie_zapinanie`;
CREATE TABLE IF NOT EXISTS `oblecenie_zapinanie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oblecenie_zapinanie`
--

INSERT INTO `oblecenie_zapinanie` (`id`, `nazov`, `zorad`) VALUES
(1, 'Šnúrky, Viazanie', 10),
(2, 'Zips', 20),
(3, 'Suchý zips', 30),
(4, 'Gombíky', 40),
(5, 'Cvoky', 50),
(6, 'Háčiky', 60),
(7, 'Traky', 15);

-- --------------------------------------------------------

--
-- Table structure for table `oblecenie_zostrih`
--

DROP TABLE IF EXISTS `oblecenie_zostrih`;
CREATE TABLE IF NOT EXISTS `oblecenie_zostrih` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oblecenie_zostrih`
--

INSERT INTO `oblecenie_zostrih` (`id`, `nazov`, `zorad`) VALUES
(1, 'Žiadny (vôbec neodstrihnuté, celé)', 10),
(2, 'Krátke/Short, Mini', 40),
(3, 'Polovičné', 30),
(4, 'Trojšrvťové', 20),
(5, 'Úplne odstrihnuté (bez rukávov alebo nohavíc)', 50);

-- --------------------------------------------------------

--
-- Table structure for table `obuv`
--

DROP TABLE IF EXISTS `obuv`;
CREATE TABLE IF NOT EXISTS `obuv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artikel_id` int(11) DEFAULT NULL,
  `kategoria_id` int(11) DEFAULT NULL,
  `vyska_obuvy` int(11) DEFAULT NULL,
  `material_podrazky` int(11) DEFAULT NULL,
  `velkost_podrazky` int(11) DEFAULT NULL,
  `velkost_podpadku` int(11) DEFAULT NULL,
  `spicka` int(11) DEFAULT NULL,
  `velkost_cislo` decimal(4,1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_E27C7EBDEEDF290A` (`artikel_id`),
  KEY `IDX_E27C7EBD359B0684` (`kategoria_id`),
  KEY `IDX_E27C7EBD6B315BC7` (`vyska_obuvy`),
  KEY `IDX_E27C7EBD970FAEA0` (`material_podrazky`),
  KEY `IDX_E27C7EBD855D289C` (`velkost_podrazky`),
  KEY `IDX_E27C7EBDE093B9AD` (`velkost_podpadku`),
  KEY `IDX_E27C7EBD75A51051` (`spicka`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `obuv`
--

INSERT INTO `obuv` (`id`, `artikel_id`, `kategoria_id`, `vyska_obuvy`, `material_podrazky`, `velkost_podrazky`, `velkost_podpadku`, `spicka`, `velkost_cislo`) VALUES
(2, 20, 11, 5, 9, 3, 2, 2, '1.6'),
(3, 49, 16, 4, NULL, 2, 5, 3, '45.0'),
(4, 57, 37, 2, NULL, 1, 1, 5, '15.0'),
(5, 59, 14, 3, NULL, 2, 3, 1, '12.0'),
(6, 60, 15, 2, NULL, 1, 3, 1, '45.0'),
(7, 61, 13, 4, NULL, 3, 3, 1, '100.0'),
(8, 64, 16, 3, NULL, 2, 2, 1, '45.0'),
(9, 77, 5, 2, NULL, 2, 1, 5, '45.0');

-- --------------------------------------------------------

--
-- Table structure for table `obuv_kategorie`
--

DROP TABLE IF EXISTS `obuv_kategorie`;
CREATE TABLE IF NOT EXISTS `obuv_kategorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `obuv_kategorie`
--

INSERT INTO `obuv_kategorie` (`id`, `nazov`, `zorad`) VALUES
(1, 'Balerínky', 10),
(2, 'Kroksy', 20),
(3, 'Čižmy', 30),
(4, 'Kojenecká obuv', 40),
(5, 'Papuče a Domáca obuv', 50),
(6, 'Fitness obuv', 60),
(7, 'Gumáky', 70),
(8, 'Halová obuv', 80),
(9, 'Lodičky', 90),
(10, 'Mokasíny', 100),
(11, 'Plstené čižmy', 110),
(12, 'Topánky', 120),
(13, 'Poltopánky', 130),
(14, 'Vychádzková obuv', 140),
(15, 'Spoločenská obuv', 150),
(16, 'Svadobná obuv', 160),
(17, 'Elegantná obuv', 170),
(18, 'Luxusná obuv', 180),
(19, 'Športová obuv', 190),
(20, 'Futbalová obuv', 200),
(21, 'Tenisová obuv', 210),
(22, 'Bežecká obuv', 220),
(23, 'Basketbalová obuv', 230),
(24, 'Golfová obuv', 240),
(25, 'Tanečná obuv', 250),
(26, 'Pracovná obuv', 260),
(27, 'Do školy', 270),
(28, 'Sandále', 280),
(29, 'Snehule', 290),
(30, 'Šľapky', 300),
(32, 'Tenisky', 320),
(33, 'Turistická obuv', 330),
(34, 'Turistické topánky', 340),
(35, 'Žabky', 350),
(36, 'Espadrillos', 360),
(37, 'Kúpacia obuv, do vody', 370),
(38, 'Obuv jachtárskeho typu', 380),
(39, 'Šport a Wellness', 390),
(40, 'Plážová obuv', 400),
(41, 'Skate obuv', 410),
(42, 'Plátená/látková obuv', 420),
(43, 'Turfy', 430),
(44, 'Črievičky', 440),
(45, 'Doplnky', 450),
(46, 'Sada obuvy (taška rôznej obuvy)', 441),
(47, 'Capačky', 310),
(48, 'Tenisky', 310);

-- --------------------------------------------------------

--
-- Table structure for table `obuv_material_podrazky`
--

DROP TABLE IF EXISTS `obuv_material_podrazky`;
CREATE TABLE IF NOT EXISTS `obuv_material_podrazky` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `obuv_material_podrazky`
--

INSERT INTO `obuv_material_podrazky` (`id`, `nazov`, `zorad`) VALUES
(1, 'tvrdá guma', 10),
(2, 'stredne mäkká guma', 20),
(3, 'mäkká guma', 30),
(4, 'vzduch/air', 40),
(5, 'boost', 50),
(6, 'špeciálna', 60),
(7, 'plátená', 70),
(8, 'korková', 80),
(9, 'drevená', 90),
(10, 'umelá hmota', 100),
(11, 'železná, kovová', 110);

-- --------------------------------------------------------

--
-- Table structure for table `obuv_spicka`
--

DROP TABLE IF EXISTS `obuv_spicka`;
CREATE TABLE IF NOT EXISTS `obuv_spicka` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `obuv_spicka`
--

INSERT INTO `obuv_spicka` (`id`, `nazov`, `zorad`) VALUES
(1, 'Do špičky', 10),
(2, 'Guľatá', 20),
(3, 'Rovná', 30),
(4, 'Fivefingers', 40),
(5, 'Otvorená špička', 9);

-- --------------------------------------------------------

--
-- Table structure for table `obuv_velkost_podpadku`
--

DROP TABLE IF EXISTS `obuv_velkost_podpadku`;
CREATE TABLE IF NOT EXISTS `obuv_velkost_podpadku` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `obuv_velkost_podpadku`
--

INSERT INTO `obuv_velkost_podpadku` (`id`, `nazov`, `zorad`) VALUES
(1, 'Bez podpätku', 10),
(2, 'Nízký podpätok', 20),
(3, 'Stredný podpätok', 30),
(4, 'Vysoký podpätok', 40),
(5, 'Klín', 50),
(6, 'Platforma', 60);

-- --------------------------------------------------------

--
-- Table structure for table `obuv_velkost_podrazky`
--

DROP TABLE IF EXISTS `obuv_velkost_podrazky`;
CREATE TABLE IF NOT EXISTS `obuv_velkost_podrazky` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `obuv_velkost_podrazky`
--

INSERT INTO `obuv_velkost_podrazky` (`id`, `nazov`, `zorad`) VALUES
(1, 'Bez podrážky', 10),
(2, 'Nízka podrážka', 20),
(3, 'Bežná podrážka', 30),
(4, 'Vyžšia podrážka', 40),
(5, 'Vysoká podrážka', 50);

-- --------------------------------------------------------

--
-- Table structure for table `obuv_vyska`
--

DROP TABLE IF EXISTS `obuv_vyska`;
CREATE TABLE IF NOT EXISTS `obuv_vyska` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `obuv_vyska`
--

INSERT INTO `obuv_vyska` (`id`, `nazov`, `zorad`) VALUES
(1, 'Členkové', 10),
(2, 'Nízke', 20),
(3, 'Pod kolená', 30),
(4, 'Stredné', 40),
(5, 'Vysoké', 50);

-- --------------------------------------------------------

--
-- Table structure for table `obuv_x_zavazovanie`
--

DROP TABLE IF EXISTS `obuv_x_zavazovanie`;
CREATE TABLE IF NOT EXISTS `obuv_x_zavazovanie` (
  `obuv_id` int(11) NOT NULL,
  `obuv_zavazovanie_id` int(11) NOT NULL,
  PRIMARY KEY (`obuv_id`,`obuv_zavazovanie_id`),
  KEY `IDX_BD247AA143C8C1FE` (`obuv_id`),
  KEY `IDX_BD247AA171835A6D` (`obuv_zavazovanie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `obuv_zavazovanie`
--

DROP TABLE IF EXISTS `obuv_zavazovanie`;
CREATE TABLE IF NOT EXISTS `obuv_zavazovanie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `obuv_zavazovanie`
--

INSERT INTO `obuv_zavazovanie` (`id`, `nazov`, `zorad`) VALUES
(1, 'Klipsňa', 80),
(3, 'Žiadne (nasúvacie)', 30),
(4, 'Rýchlozaväzovanie', 40),
(5, 'Šnúrky', 50),
(6, 'Zips', 60),
(7, 'Suchý zips', 70);

-- --------------------------------------------------------

--
-- Table structure for table `prekoho`
--

DROP TABLE IF EXISTS `prekoho`;
CREATE TABLE IF NOT EXISTS `prekoho` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `prekoho`
--

INSERT INTO `prekoho` (`id`, `nazov`, `zorad`) VALUES
(1, 'Dámy', 10),
(2, 'Páni', 20),
(3, 'Dievčatá (deti)', 30),
(4, 'Chlapci (deti)', 40),
(5, 'Bábätká, Kojenci', 50),
(6, 'Zvieratá', 60),
(7, 'Deti', 25);

-- --------------------------------------------------------

--
-- Table structure for table `sprava`
--

DROP TABLE IF EXISTS `sprava`;
CREATE TABLE IF NOT EXISTS `sprava` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user_from` int(10) DEFAULT NULL,
  `id_user_to` int(10) DEFAULT NULL,
  `id_parent` int(11) DEFAULT NULL,
  `id_artikel` int(11) DEFAULT NULL,
  `subject` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `text` text COLLATE utf8_unicode_ci,
  `date_create` datetime NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_reading` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_E5578BD43AE519E` (`id_user_from`),
  KEY `IDX_E5578BD114DCF71` (`id_user_to`),
  KEY `IDX_E5578BD1BB9D5A2` (`id_parent`),
  KEY `IDX_E5578BD7AAAF543` (`id_artikel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stav`
--

DROP TABLE IF EXISTS `stav`;
CREATE TABLE IF NOT EXISTS `stav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `zorad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `stav`
--

INSERT INTO `stav` (`id`, `nazov`, `zorad`) VALUES
(1, 'Nosené', 10),
(2, 'Pokrčené', 20),
(3, 'Zle ušité', 30),
(4, 'Zašpinené, Zafarbené', 40),
(5, 'Napáchnuté', 50),
(6, 'Pretrhnuté, Deravé', 60),
(7, 'Roztiahnuté, Rozťahané', 70),
(8, 'Ztiahnuté', 80),
(10, 'Vlastná výroba', 4);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `confirmed` varchar(64) DEFAULT NULL,
  `reset_password` varchar(64) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `last_login` datetime NOT NULL,
  `email` varchar(180) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `surname` varchar(50) NOT NULL DEFAULT '',
  `roles` json NOT NULL,
  `login_role` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `api_token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`),
  UNIQUE KEY `UNIQ_8D93D6497BA2F5EB` (`api_token`),
  KEY `IDX_8D93D649911B012F` (`login_role`)
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `confirmed`, `reset_password`, `created_at`, `updated`, `last_login`, `email`, `password`, `name`, `surname`, `roles`, `login_role`, `api_token`) VALUES
(61, NULL, 'c02f96c75c13c0864e8e18ca76d8a5db6a534818b1812c26147d9ebdae366a99', '2018-12-31 15:31:09', '2019-03-05 13:43:41', '2019-07-10 18:21:58', 'asd@asd.sk', '$2y$12$ucaAv50N/qk9EU0xQxhSD.wMJcwtRcs43pAV/RbDAKDq2IzeBujzO', 'Alexandeer', 'Ivan', '[\"ROLE_USER\", \"ROLE_ADMIN\"]', 'ROLE_BUYER', 'bd@6cs353dd3ssk21a4a.ac'),
(145, NULL, 'c77735ee66097ec91fd421eeb50e370d30a1f2f7a6c6d133be5d49ae80365a71', '2019-02-01 17:47:55', '2019-02-01 17:47:55', '2019-02-01 17:47:55', 'kaskdk@asd.sk', '$2y$12$hGICjZoOxzFUcY8smilmTeDCmWgbbxYrgd.gXTtQrPApg.EIRgT7q', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'acs54dks6.kd43a9sa7kk9@58a'),
(146, NULL, NULL, '2019-02-06 18:54:07', '2019-02-06 18:54:07', '2019-02-06 18:54:07', 'kjasdkdk@asdkjs.sk', '$2y$12$RQLHhoVQ4QXojR72GDaCwOZiENRTmk2P6Qx3vsL3tFo5B/QDNNq8a', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'askk3d2esa9k5ds.5caj4s@dkkbcd1j'),
(147, NULL, NULL, '2019-02-08 18:09:54', '2019-02-08 20:40:16', '2019-02-08 20:40:40', 'kekrek@asd.sk', '$2y$12$Kf6czVj6OuzPRexlHuZs0.8hx79a8FHLcRf03WFQu2eR2IYBFwR.m', 'kasdk', 'aksdka', '[\"ROLE_USER\"]', 'ROLE_SELLER', 'dkaee5c52dsksk37c5r4.9@fdk'),
(148, NULL, NULL, '2019-02-10 09:41:14', '2019-02-10 09:41:14', '2019-02-10 09:41:14', 'jasjd@asd.sk', '$2y$12$Bp3yA11KeNoqYq8BZAAbOuUEP3CTUUC7zC9/0CgyDek/tpfUS8tWS', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '@60daa.adsfjb1f557sjbcks9'),
(149, NULL, '5e3493024252b50650dd67cb676337012a899b5fbce972302599ef5699005547', '2019-02-15 16:22:35', '2019-02-15 16:51:07', '2019-02-15 16:50:47', 'koaoksd@asdk.sk', '$2y$12$zaPSZVmb7ZvUztkMy1anA.KhACyJpOCUbCfYFolyFwh/CGPBIMv4e', 'kasdk', 'aksdkdsa', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'sskk6oe1c676a.casd4akoda5k1@'),
(150, '7fb80672d2c56b5cc25502c238f19fa7bf02ccad822e454c958ea53ef44bdacd', NULL, '2019-02-16 13:51:22', '2019-02-16 13:51:22', '2019-02-16 13:51:22', 'kakskd@asdds.sk', '$2y$12$1Ug1sySbjC9wA9AU3AlwN.9JIB0/OStHq5yGFqU8Av.hD4V.RIl3S', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 's.k81k1cd5a5add5k3f@46sss4ka'),
(151, 'ab7c22354f3b80d8c2eaf236393db60583c3958e1806509c4c31396a7b83b720', NULL, '2019-02-16 13:53:49', '2019-02-16 13:53:49', '2019-02-16 13:53:49', 'oaskdsak@asd.as', '$2y$12$WXM6WnB5KS6fu9ykrcbZAeHUcvwt0h0mhEKyR2WkLrno0bGakxE.q', '', '', '[\"ROLE_USER\"]', 'ROLE_SELLER', 'ssk68@k31cseo5d1b85adads.aa5'),
(152, 'c4402bf1f7b0a9c7ef4baa456871986d5a199985dad656c43e10b25708f81552', NULL, '2019-02-16 13:54:03', '2019-02-16 13:54:03', '2019-02-16 13:54:03', 'pasdoklds@asd.sk', '$2y$12$9V7IJ9P/.6A94g4ZoH1iRuAdJ1ODPMzch/ao8jSJowB9WFiLtRgQ6', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'fs5s11.dd5bds7p8kl6k@o55ac2as'),
(153, 'fd89c32aa7eb48c574425c91631758e8dbfcaec4b6a4588a419cb31928d8f2ef', NULL, '2019-02-16 13:59:46', '2019-02-16 13:59:46', '2019-02-16 13:59:46', 'kakdsdk@asd.sk', '$2y$12$UA646L9CJaEyK.MKfHABKubU7InkYuoQiYA8Ltm3NIWYlYF9dOQYq', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '522k5asdsd588kk.0s1af7cdk6@'),
(154, 'a0c1dac6870966a1f905e5e08be128c7492875381a870b8ea016b4eec34cd57c', NULL, '2019-02-22 18:15:31', '2019-02-22 18:15:31', '2019-02-22 18:15:31', 'adminksoadk@asd.sk', '$2y$12$VSNuivEkBxhQi63wnJJ0HObwzSzBJZi9BRYEc4fEWMd.zLfdznaca', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'idkasccckn873d.0o2skaedbas5@ma4'),
(155, 'f146d131bc6d346e3650f8de86db23c7c2539755e3209d472c417b2dced0f91c', NULL, '2019-02-23 13:02:12', '2019-02-23 13:02:12', '2019-02-23 13:02:12', 'ASDsadasd@asd.sk', '$2y$12$TIGWOzc3UczzNqiS5lKKIOAffh/ztCBSXaXuCfwJcD71e2V6LdA.q', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '72kDS3sd@bA5.cs3a1a445d5sdsca'),
(156, 'f5e3be2a569f9512a962a0efa0b91b814478970af32027a91b3ecc93a3cb5204', NULL, '2019-02-23 13:05:41', '2019-02-23 13:05:41', '2019-02-23 13:05:41', 'kasdk@asd.sk', '$2y$12$ZDFXTrzdMKqGw.MQDG484eA1/WbjMQNT9DqVzX3Si5EwWXqtzWZiO', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'ak5fe4skkdcsca.54d@1s78c2'),
(157, 'b05db5258886f5e61ada91a8047ada45123614a57035f1b353a47547683dd47a', NULL, '2019-02-23 13:06:09', '2019-02-23 13:06:09', '2019-02-23 13:06:09', 'kaskdsk@asd.skj', '$2y$12$sVuLJ3XVAtoDyETYSW0BKOS9mX1CoNiKjH56oXjBSH9KeSXzZsbBi', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '518.ka4a1kj7s5csksad4@kd4s70'),
(158, 'c58364425baf8a570142575e4eb03c87fcd0343610bf53c8108bdc57fed707e6', NULL, '2019-02-23 13:06:32', '2019-02-23 13:06:32', '2019-02-23 13:06:32', 'kaskdkd@asd.sk', '$2y$12$oaZaENIvy5UsUWA2iaMk7O81dOWjwanE2bYJk/zm33UZS1R8TaCvO', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '5c.3d65ad7157@a4b7skkkdkbss'),
(159, '0afe4e32bd5b22d85f0f2cdcd8d366d1d370695ecb14ed0530f11013631923c0', NULL, '2019-02-23 13:07:14', '2019-02-23 13:07:14', '2019-02-23 13:07:14', 'kaskdsdfk@asd.sk', '$2y$12$qkLqJNLuh6yvAX3UCXk5a.XZwyCQdWMYdefevEw133pvnjIcVpBve', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'dk8sk@d7skfskafs751225.42dca1'),
(160, 'a443d388b3edb06d34d4dbe7d3afa5e4818607cc8335a1a8cb28d6ef98bb4d41', NULL, '2019-02-23 13:09:14', '2019-02-23 13:09:14', '2019-02-23 13:09:14', 'kasdk@asd.skkk', '$2y$12$bf0K4BYaaOkP99IjMHjAp.iKD7OfImM5a.6pfry760Fvv1rPRfgCC', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'kkdks55@a.ska1cdck64a3s7f85'),
(161, 'fdd631ecb281f2c3e4948ff97668dc878d5b6490a56ad10e4b82ade6c7283c4a', NULL, '2019-02-23 13:14:26', '2019-02-23 13:14:26', '2019-02-23 13:14:26', 'kasdkfsdk@asd.sk', '$2y$12$s2BXOfkVU3hYY2vlHCbClOMXM3J32hr0zsYXznPXL/wr5mMGRysQO', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'c47asd31dbfk93eck7.d5kss2ask@'),
(162, '2e7787a62bdaa625a01be0ad8402ea24c766bf83ceeac5d26835da150885193a', NULL, '2019-02-23 13:14:53', '2019-02-23 13:14:53', '2019-02-23 13:14:53', 'kaskddk@asd.sk', '$2y$12$QItO8ex3Jlc/uiFihv7B..UcrPkBMZ2D70yew.4lzQHFa8tDWVHMO', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '7kc7dka945s7sk4abd@1dscf.dk'),
(163, 'bef6a9ae16f8bd4adb6e5224cd6468a74329ef115b20c5a51326e6a7b0402827', NULL, '2019-02-23 13:18:00', '2019-02-23 13:18:00', '2019-02-23 13:18:00', 'kasdkldsl@asd.sk', '$2y$12$F5upDm2Tx50OWxzqF5.a9.A3ZmQvhB5wCF/OcFUueVgx.Ao1y7ira', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'ssak1c.8k@d1157k0l44al8sd2csd'),
(164, '6e68ec6624ba8599d2f265feaaa02e1dd0a54b13ac24a0b1ce54cc7c095b6c12', NULL, '2019-02-23 13:25:23', '2019-02-23 13:25:23', '2019-02-23 13:25:23', 'kasdkk@asd.sk', '$2y$12$5zI8C7JXHPIPfkPKqAbT6.C7HyTGzEUjhNT4b.NV9UVbafWLJKHm2', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'kkacck4ksdd.9d@121bas15bs7'),
(165, '9eeef0e06de7ea57454c635594c1dc8d18abf87d55af85da3200fb0259c71fbe', NULL, '2019-02-23 13:25:54', '2019-02-23 13:25:54', '2019-02-23 13:25:54', 'kasdjkasdj@azs.sk', '$2y$12$01UpRqwZ/Inv69ruJoendeiU7h5.XmvrBp8emCBl6OjLGAcgTpFW.', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '.8957dj4s2zesda4ckcksja86sk@a1'),
(166, '20ec74b9926afee2b456f37b10b7a3fd0be9fcce6f03a66adf310e70dae15fd5', NULL, '2019-02-23 13:26:35', '2019-02-23 13:26:35', '2019-02-23 13:26:35', 'kasdk@azd.sk', '$2y$12$o9kt9a55DrnkD2Ym7QKsJ.1jVqQkSG5SqBVDyE4kdHL7hBzFt4OUy', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'd7.dka751casbcz20aka@4aks'),
(167, '0f2a8e50fd1ce5a61a2b3eecfcb4e9b6071fae8e59324d47db7d205d7852b876', NULL, '2019-02-23 13:27:18', '2019-02-23 13:27:18', '2019-02-23 13:27:18', 'kaswkddk@asd.sk', '$2y$12$8YTBOt1yaSCkf/Mkda.GM.g4IKTA9TBhwRahYdDf17sfhrbmJgvsW', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '5dc67dassdsa1ak2wkk4573@9.bk'),
(168, '8f81e0f5351e3b4dc2b7cb122014ccffe75f6528d3f65385b373a2a5f6a59313', NULL, '2019-02-23 13:28:36', '2019-02-23 13:28:36', '2019-02-23 13:28:36', 'kaskddsk@asd.sk', '$2y$12$tGxGIwQDTK1uVrN7c9gZxOdFmEtMaD4IcE1SvY0WcWmSsAsjda8/S', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '7kadksd74k4dka82csda5s83.@s1'),
(169, 'd6bff30697d5a0f744a42a08e45f0ef10a0505b7ad0f207cdea3c0b282197a54', NULL, '2019-02-23 13:33:30', '2019-02-23 13:33:30', '2019-02-23 13:33:30', 'kasdksdaok@asd.sk', '$2y$12$5zjIlcdU5Sa.poxWyAXczOO7bRkAr7NcKgyTt6It3/iyxwoE0JH1W', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'ddkcaaab79s@a.d51sasa2sk7ok4k4'),
(170, 'd47f93b345f12b7d88ff7699d77668d13529da4b54530885b25b5e9ed1fb0b9e', NULL, '2019-02-23 13:37:48', '2019-02-23 13:37:48', '2019-02-23 13:37:48', 'kaskodksd@asd.sk', '$2y$12$0iGlX611A3SI0L2wm6T6XO1lWCZOhYFfoy49VvEAgKO.NLhmVEdoe', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'kdk9ca4k5so@57s71s.ccd7adfkas'),
(171, '9d156e5c4564f712686403ebc6a9e79ec3f8ebc77ff7d09526cf6091c3dfd27b', NULL, '2019-02-23 13:39:59', '2019-02-23 13:39:59', '2019-02-23 13:39:59', 'koasdek@aqswd.sk', '$2y$12$cVLa24iEvyqA2VjtecX/COk.Pl4z2m4Y/SwrV3kOG4bakulFG.HDO', '', '', '[\"ROLE_USER\"]', 'ROLE_SELLER', 's.dqasw21aek@deod95ckd84s47ck'),
(172, '44eb3ea99a4908e07ef279e481cb4ad9cf9c8f2a8cd46ea2aa70a1d02d0f07a5', NULL, '2019-02-23 13:58:10', '2019-02-23 13:58:10', '2019-02-23 13:58:10', 'kaskdzk@asd.sk', '$2y$12$Sbsy8WWxCIafVJ6H1rHmquvOD4qSphtT/kPGw4cgdCMq1JLtPDOxS', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '117se1d77k5kkkss.5acaz6d@2c'),
(173, 'eeeeba1bb329d56f9f10f302338d7c3320fff6ed03c88a3b0b5f84b326aa50c0', NULL, '2019-02-23 14:01:44', '2019-02-23 14:01:44', '2019-02-23 14:01:44', 'kaskdk@sd.sk', '$2y$12$AsBUo9/I4gH465CpOimAVeBQNHoRUfMqjUGXTzWyrhmbLYL.iU/OS', '', '', '[\"ROLE_USER\"]', 'ROLE_SELLER', '7kk1skc85a.d@10sdsd24158k'),
(174, '5edc594c685974e5cbdb8796f1be2b34c9b0a6774b08ff4c703957539fb6a8c0', NULL, '2019-02-23 14:05:21', '2019-02-23 14:05:21', '2019-02-23 14:05:21', 'kasokdsdkd@asd.sk', '$2y$12$45Ox9X8.29QZpYV00J7epOKOreTpQgnph.HBOpcNrda6nUrLFyYqq', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'oka37dd2e1asaskc1dsc5d5k@s.k0c'),
(175, '98a430715b133f6a24c4f753749c3fdf80a7c8ea7adda437f5bda11be7e10311', NULL, '2019-02-23 14:06:18', '2019-02-23 14:06:18', '2019-02-23 14:06:18', 'kasdkko@asd.sk', '$2y$12$DU./X37/grzv0PDleZfYv.SfEzBdml9sqQWveS7gLgYdCjHf9Orrq', '', '', '[\"ROLE_USER\"]', 'ROLE_SELLER', 'kokf3ka5k1@d6d57ssa3dcad5.s'),
(176, '4c903c07649094ae1777f4629196ac3a92cdd06fc64c3be221c8268d529b619d', NULL, '2019-02-23 14:18:20', '2019-02-23 14:18:20', '2019-02-23 14:18:20', 'kaskdspalodks@asd.sd', '$2y$12$Y4qSWRRRCl1Wy2mZDtck8eRiu4xh9dynvLVfHIJsPl9rlKccYLHeS', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'kbkd.o51k5sdfaa@dss64lsca2saepd7a'),
(177, '12e3905d1f324acb6049327e4dc6d0e87db4f7fece6ea086f7df6882df036c37', NULL, '2019-02-23 14:21:18', '2019-02-23 14:21:18', '2019-02-23 14:21:18', 'kaoisddfkds@asd.sk', '$2y$12$QIbzsH0/uhGEfqTo27EmVu3MRsT4rdMuiDyLs1US0N8PhxsIKQjvC', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'cidok.7d6sfd0d51csakdsa2dsfkc5@'),
(178, 'a30ea6e4680e2d1cf7c139972634dc50aff1ed32891693c191c637346e771fe8', NULL, '2019-02-23 14:29:01', '2019-02-23 14:29:01', '2019-02-23 14:29:01', 'kokerk@asd.sk', '$2y$12$8FifdiCbtzkU8kYXE8fY6uL0RdIYUO1rkij/GDD5.IEEpXqFM4pRi', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'kk13ada5@.ck5rs558sk7oeccd'),
(179, 'aae40865d0bebc0dad2d503cfa59ab150a4083ef8912c20e04a5e8c1cb6f16bc', NULL, '2019-02-23 14:37:13', '2019-02-23 14:37:13', '2019-02-23 14:37:13', 'loskdsdk@sad.sk', '$2y$12$l7QH8XvlNxtoK9VU1A3QKefNz4yeN7ZvQ.TcPZVy.z82IyiYjQx0e', '', '', '[\"ROLE_USER\"]', 'ROLE_SELLER', '1.1678kdeca5ka5so5@ld9k1sdss'),
(180, '2f4cca688881e62803f3d764c28200b00ed00bdc4e7c5e9094996481e2e27c4b', NULL, '2019-02-23 14:39:23', '2019-02-23 14:39:23', '2019-02-23 14:39:23', 'lkoasdk@asd.sk', '$2y$12$6Q5ulkwpKWBtnNwscCNoXeJX.TKp3eKSOOlYmYAxTw2svEq6GZzGu', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'c58@sk57bdal1kdob9s1s2dka.3'),
(181, '0d8be868189065fbb993465c0880d7ee43e5ebf9036cad219e527cdcb16212c0', NULL, '2019-02-23 18:02:29', '2019-02-23 18:02:29', '2019-02-23 18:02:29', 'kazsokdk@asd.sk', '$2y$12$8Yj75ypW.z2iqK3e3nEccODhjCJ.yNCgrAsm3M.CvYxMwuO5hmYYe', '', '', '[\"ROLE_USER\"]', 'ROLE_SELLER', 'o5.cd77@dasab4kkkdkc2z8ass17'),
(182, '917bde55713674a237217fc3352f489af98da4380c1a2ceb2b4469d92fcfbb6f', NULL, '2019-02-23 18:03:56', '2019-02-23 18:03:56', '2019-02-23 18:03:56', 'koasesdk@asd.skj', '$2y$12$F3ORjioME6JeK3aEG79NK.psv0kQVfYPWkRUVDBU6W3OPb3/McY26', '', '', '[\"ROLE_USER\"]', 'ROLE_SELLER', '@bs1ca85kb.sk1ks9d0e387dajosd'),
(183, 'afed222926648474144c4fb4ca77b2ccc36c565f401b92fb3c26131d72de3884', NULL, '2019-02-23 18:06:58', '2019-02-23 18:06:58', '2019-02-23 18:06:58', 'kasdkdk@asdc.sk', '$2y$12$MEJldzNMq7JhW4I5Gqh9CO0Vltg/dd6DehKSMILAkcxDrLZCGaeVS', '', '', '[\"ROLE_USER\"]', 'ROLE_SELLER', 'kk7cdc2kc5.dadc8bs5a2skda1s@'),
(184, '09612981f98fd0037adbb5d1e4c0157147e21b75f76d409ba66feaa55e66c77b', NULL, '2019-02-23 18:09:30', '2019-02-23 18:09:30', '2019-02-23 18:09:30', 'koasdk@asd.sk', '$2y$12$XGReGzIfTCbogSkpMWF3dOK35q/Pxav4kPGjdpaxMgkvOYZoU2Dqq', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'kcd5k87.a@ks25o51b9as3dsc5'),
(185, 'b830366c15f9c70482fc97e94f8299cb09508be35e174c5597bf16629bd768fa', NULL, '2019-02-23 18:48:05', '2019-02-23 18:48:05', '2019-02-23 18:48:05', 'kakwsdks@asd.sk', '$2y$12$yG.4ZqMCboY/wcmS0hmUrO9V.v1wmnj2IoC6N99fYxiqGbGQ7g0ry', '', '', '[\"ROLE_USER\"]', 'ROLE_SELLER', '5f65k7.ss5wcsck2ks6a@3ddk9a1'),
(186, '5b9810981b7b72c8d51157fa008e2054b8e9a9ed2ef7e06f0f00f32f426fbc56', NULL, '2019-02-23 18:48:33', '2019-02-23 18:48:33', '2019-02-23 18:48:33', 'oeoro@asd.sd', '$2y$12$pYzla5jjRSmleRsrM9TXu.iDq9NNtkz5I9dchYoThxDdsLViGI6ti', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '57.s9@a1s17doooc85edaaber'),
(187, '5f7b5fca8dac91b674eaa3ad47279d591285bbd9c6700253a791925f1e300bf2', NULL, '2019-02-23 18:53:19', '2019-02-23 18:53:19', '2019-02-23 18:53:19', 'kaqewdkk@asd.sk', '$2y$12$FWDh4KiBkcxABVINlBGK5e9RmTcLMpUfCWz7WXqTthJkfXpsxs3mi', '', '', '[\"ROLE_USER\"]', 'ROLE_SELLER', 'dscefkcakd679.wk1ed5s90q2k@a'),
(188, '5b08d923a96a4056c740a422a2585c6bc8b23e3e7b80f35ee71ca5e36310b857', NULL, '2019-02-23 18:54:05', '2019-02-23 18:54:05', '2019-02-23 18:54:05', 'owreefikdrk@asd.sk', '$2y$12$dvi80Q8rkhlmi/mXqb8HjuBKOP/Zo0HZtCxDowrlSWfGeG5sjegWy', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'r960bckeksiw7deo.b1dskdca@5ecfr'),
(189, 'c0bf95b5d8e4421e1b4e171c7b6cab84e5148e1db85ff287dcee39c83e2261e7', NULL, '2019-02-23 18:55:05', '2019-02-23 18:55:05', '2019-02-23 18:55:05', 'lerksd@asdjdsad.sk', '$2y$12$in42dFfLLZKoz1JjCBhRMu2Fj1Ty6OmBgrnnEEI2Nd9RGKJlxJ7S2', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '.kaes71sds50e7d9c50d6l8ka0sjd@r'),
(190, 'b5a4f8af11feb0c3a72d25559f3488ae60d8be8d6494f94dadd95e4eaa759500', NULL, '2019-02-23 18:56:54', '2019-02-23 18:56:54', '2019-02-23 18:56:54', 'kskd@asd.sk', '$2y$12$IF8mzs.Lg2M/mMAghyTfPOL5FHCsR6OW2ZqaLqy4HxzbpQDQMHrN.', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '5s7.7aa1290kc@kdsd635k7s'),
(191, '953098a31196b84072041d267ff608fdaa027efec8badbaf9deabef79bfc5afa', NULL, '2019-02-23 18:58:10', '2019-02-23 18:58:10', '2019-02-23 18:58:10', 'kaksddkaedsk@asd.sk', '$2y$12$hCU3GN2R2nOfSldeXMrqku9xtUl/svhJ7VhVu02kiGM3m7b0dgJAK', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'd8c12kkkcda@7dsda.sds5927asaekdk'),
(192, 'dac65038dcc86f1eff671c207da129e8f155839b5aad2eab901052e9b80c2bbe', NULL, '2019-02-23 18:58:37', '2019-02-23 18:58:37', '2019-02-23 18:58:37', 'ksakdafdksd@sad.sas', '$2y$12$Um4zsjPRSAOOd257UNjp/.yYS6Qr9hsVcE4sULA.1VbMwKJvysaLS', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '.kfsda1@6c57s9ds5dd7skekaca1dbsa'),
(193, NULL, NULL, '2019-02-23 18:59:30', '2019-02-23 18:59:30', '2019-02-23 18:59:30', 'kasdk@asd.skkkk', '$2y$12$UFC0aRfWJ.wcgTY09gsFreRTsl47CMe2ahKNAMUdSdgDPUmZFXRSu', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '1d9@k8s7ka12ksck5.kasdebd1kd'),
(194, NULL, NULL, '2019-03-04 15:18:26', '2019-03-04 15:18:26', '2019-03-05 14:57:02', 'ksadkfkfd@asd.sk', '$2y$12$Mx6D4lk6pmYfRtMO1522FO8Iy6LIm2IkSKzNLbcPhH7DxPjmA4/kK', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'kc5e.s2afcscd679ddk04fdksa1@k'),
(195, NULL, NULL, '2019-03-05 14:54:20', '2019-03-05 14:55:50', '2019-03-05 14:55:34', '0kasdksda@asd.sd', '$2y$12$cNucfGgySt8CM.BJjhTQoe2SbnC98DId2sHDynFOLgjsk7tLOxBPe', 'asdk', '`askdaskd', '[\"ROLE_USER\"]', 'ROLE_BUYER', 's8ksc08sdc8a.kd2edad9a@9ds5e7'),
(196, NULL, NULL, '2019-03-05 15:46:54', '2019-03-05 15:48:50', '2019-03-05 15:49:07', 'kazskdk@asd.sk', '$2y$12$1gkTUHvA3HYJEJw2RA2Y9O4RdFvtSm9aXTt9kB2m13OiMjZXLqSjy', 'akjsdk', 'aaslksd', '[\"ROLE_USER\"]', 'ROLE_BUYER', 'kka@cze95fsdf.ae79fdskdke6s'),
(197, NULL, 'a1e66920d15df4f1f27eb49e6da00afe62cfd25eaf6658d74023271546e4a4a8', '2019-03-23 16:52:25', '2019-03-23 16:52:25', '2019-03-23 16:52:25', 'jhawshdsda@asd.sd', '$2y$12$ALS4VAYtSU/br5BeVXptSOzOdBNBi9WX1NDSzADAPjVGUQs3sUOla', '', '', '[\"ROLE_USER\"]', 'ROLE_SELLER', 'ah6a4d5s@d8sjaa0sh6cwasd9d45e.'),
(198, '5a484de1f64eb0652a9b4cce7b2f4a582be6e64da8138016d08010bbf580caee', NULL, '2019-04-14 13:10:59', '2019-04-14 13:10:59', '2019-04-14 13:10:59', 'kaskd@asd.sk', '$2y$12$zjQWSCgpM5kiZYmMRY1W1ulca5oolC3..awiq.8eqSSq6zAu1uDm2', '', '', '[\"ROLE_USER\"]', 'ROLE_BUYER', '4c6a.a@ask3k63bdss314k53d'),
(199, 'fc1448c61ac4c97fe36fa2f1eecc2952717558e8e77bc3f15a9c160fb5634a38', NULL, '2019-04-21 10:41:26', '2019-04-21 10:41:26', '2019-04-21 10:41:26', 'lkqasklkld@asd.sk', '$2y$12$ozm5znSPLXlqx3R4WH4hQ.sWDCWbe9/gwgcCM7u9gEE/6iiP23PSW', '', '', '[\"ROLE_USER\"]', 'ROLE_SELLER', 'qfclk5kcdk.abl7aa@8ds6s64lskdc'),
(200, 'abc3ab92871367ae9baaa32be305d9619fb58cd4ab5e45567c956a6c60193da9', NULL, '2019-06-07 19:10:49', '2019-06-07 19:11:16', '2019-06-07 19:10:49', 'koaksdadsk@asdk.askd', '$2y$12$PwIFdutChM95NF5zEvyOPOF8oarbitpKN1nZmqIP5Zm/TpWrO6WtW', 'LES', 'ASDASD', '[\"ROLE_USER\"]', 'ROLE_SELLER', 'dbak6aaae91ks5bd@kd569oakkdsfss.c');

-- --------------------------------------------------------

--
-- Table structure for table `user_login_role`
--

DROP TABLE IF EXISTS `user_login_role`;
CREATE TABLE IF NOT EXISTS `user_login_role` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_login_role`
--

INSERT INTO `user_login_role` (`id`, `description`) VALUES
('ROLE_BUYER', 'Kupec'),
('ROLE_SELLER', 'Predavač');

-- --------------------------------------------------------

--
-- Table structure for table `znacka`
--

DROP TABLE IF EXISTS `znacka`;
CREATE TABLE IF NOT EXISTS `znacka` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1403 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `znacka`
--

INSERT INTO `znacka` (`id`, `nazov`) VALUES
(1, 'Abercrombie & Fitch'),
(2, 'Aeronautica Militare'),
(3, 'ARQUEONAUTAS'),
(4, 'BOSS Hugo Boss'),
(5, 'BOGNER'),
(6, 'BURBERRY'),
(7, 'Calvin Klein'),
(8, 'COACH'),
(9, 'CLAUDIO CAMPIONE'),
(10, 'Daniel Hechter Paris'),
(11, 'Dirtee Hollywood'),
(12, 'Diesel'),
(13, 'Dolce & Gabana'),
(14, 'Dolomite'),
(15, 'Duca Del Cosma'),
(16, 'Ecko Unlimited'),
(17, 'Ed Hardy'),
(18, 'Emporio Armani'),
(19, 'Esprit'),
(20, 'FÉRAUD'),
(21, 'Faith'),
(22, 'Gaastra'),
(23, 'G-Star Raw Denim'),
(24, 'GANT'),
(25, 'GAP'),
(26, 'GAUDI'),
(27, 'Gianfranco FERRE'),
(28, 'GILLY HICKS'),
(29, 'Gsus'),
(30, 'Guess'),
(31, 'JET LEG'),
(32, 'JOOP!'),
(33, 'Just Cavalli'),
(34, 'Lacoste'),
(35, 'La Martina'),
(36, 'LOVE MOSCHINO'),
(37, 'LNA Clothing'),
(38, 'Miss Sixty'),
(39, 'Napapijri'),
(40, 'Pepe Jeans'),
(41, 'Ralph Lauren POLO'),
(42, 'REPLAY'),
(43, 'Rôzne značky'),
(44, 'SIGNUM'),
(45, 'Tommy Hilfiger'),
(46, 'VALENTINO'),
(47, 'Next'),
(48, 'VICTORIA\'S SECRET'),
(49, 'U.S POLLO ASSN'),
(50, 'UNGARO'),
(51, 'UGG australia'),
(52, 'Lego Wear'),
(53, 'Primigi'),
(54, 's.Oliver'),
(55, 'Brave Soul'),
(56, 'Desigual'),
(57, 'Geox'),
(58, '883 Police'),
(59, 'Abandon Ship'),
(60, 'Aderlass'),
(61, 'Adidas'),
(62, 'Adler'),
(63, 'Adriano Castellani'),
(64, 'Agreat Man'),
(65, 'Alpha Industries'),
(66, 'Alpine Pro'),
(67, 'Alpinestars'),
(68, 'Altamont'),
(69, 'Analog'),
(70, 'Animal'),
(71, 'Arcteryx'),
(72, 'Armani'),
(73, 'Artista'),
(74, 'Ashworth'),
(75, 'Bellfield'),
(76, 'Ben Sherman'),
(77, 'Bench'),
(78, 'Bergans'),
(79, 'Billabong'),
(80, 'Binder de Luxe'),
(81, 'Black heart'),
(82, 'Black Market'),
(83, 'Black pistol'),
(84, 'Blancheporte'),
(85, 'Blend'),
(86, 'Bongoshop'),
(87, 'Brandit'),
(88, 'Brendoff'),
(89, 'Bretley'),
(90, 'Brixton'),
(91, 'Burton'),
(92, 'Cappon'),
(93, 'Carisma'),
(94, 'Caterpillar'),
(95, 'Circa'),
(96, 'Coexis'),
(97, 'Columbia'),
(98, 'Craghoppers'),
(99, 'CrossHatch'),
(100, 'DC'),
(101, 'Dead threads'),
(102, 'Dickies'),
(103, 'Direct Alpine'),
(104, 'Disturbia'),
(105, 'Duck and Cover'),
(106, 'Ecko'),
(107, 'EGO MAN'),
(108, 'Eight2Nine'),
(109, 'Electric'),
(110, 'Envy'),
(111, 'Etnies'),
(112, 'Fabric'),
(113, 'Fallen'),
(114, 'Fashion'),
(115, 'Ferlucci'),
(116, 'Firetrap'),
(117, 'Fischer'),
(118, 'Fjällräven'),
(119, 'Fox'),
(120, 'Frank Ferry'),
(121, 'Frank NY'),
(122, 'French Connection'),
(123, 'Fruit Of The Loom'),
(124, 'Full Circle'),
(125, 'Funk´N´Soul'),
(126, 'Funstorm'),
(127, 'G-Star'),
(128, 'G.Norway'),
(129, 'Gabicci'),
(130, 'GASP'),
(131, 'Globe'),
(132, 'GNU'),
(133, 'Greiff'),
(134, 'Hannah'),
(135, 'Hardcore'),
(136, 'Heavy tools'),
(137, 'Helikon'),
(138, 'Henderson'),
(139, 'Holy Ghost'),
(140, 'Hoodboyz'),
(141, 'Horsefeathers'),
(142, 'Icebreaker'),
(143, 'Icepeak'),
(144, 'iMóda'),
(145, 'Independent'),
(146, 'Indicode'),
(147, 'Iné'),
(148, 'Iron fist'),
(149, 'Jack and Jones'),
(150, 'Jack Daniels'),
(151, 'Jack Wolfskin'),
(152, 'Japan Rags'),
(153, 'Jeel'),
(154, 'Jekyll and Hyde'),
(155, 'Just Say Rock'),
(156, 'K1X'),
(157, 'Kangaroo Poo'),
(158, 'Kangol'),
(159, 'Karrimor'),
(160, 'Kilpi'),
(161, 'Krew'),
(162, 'La rocka'),
(163, 'Lambretta'),
(164, 'Lanvino'),
(165, 'Lee Cooper'),
(166, 'Levi\'s'),
(167, 'Lindbergh'),
(168, 'LOAP'),
(169, 'Lovesect'),
(170, 'Löffler'),
(171, 'Majestic'),
(172, 'Mammut'),
(173, 'Mardini'),
(174, 'Matix'),
(175, 'Maxway'),
(176, 'Mazine'),
(177, 'Meatfly'),
(178, 'Merrell'),
(179, 'Metal mulisha'),
(180, 'Mil-Tec'),
(181, 'Mode wichtig'),
(182, 'Mustang'),
(183, 'NC'),
(184, 'NCAA'),
(185, 'NEFF'),
(186, 'Nike'),
(187, 'No Excess'),
(188, 'Nomis'),
(189, 'NONE'),
(190, 'NordBlanc'),
(191, 'North Finder'),
(192, 'Northfinder'),
(193, 'Oakley'),
(194, 'Ocean pacific'),
(195, 'Ombre Clothing'),
(196, 'Onfire'),
(197, 'Oxbow'),
(198, 'O´Neill'),
(199, 'Patrol'),
(200, 'Penguin'),
(201, 'Peter Cook'),
(202, 'Peter Werth'),
(203, 'PH Selekt'),
(204, 'Pierre Cardin'),
(205, 'POIZEN INDUSTRIES'),
(206, 'PONTTO'),
(207, 'Progress'),
(208, 'Protest'),
(209, 'Puma'),
(210, 'Queen of darkness'),
(211, 'Quiksilver'),
(212, 'Ralph Lauren'),
(213, 'Redbridge'),
(214, 'Reell'),
(215, 'Regatta'),
(216, 'Repablo'),
(217, 'Rerock'),
(218, 'RESTLESS'),
(219, 'Rip Curl'),
(220, 'Rivaldi'),
(221, 'Roberto Cavalli'),
(222, 'Rocklin'),
(223, 'ROTHCO'),
(224, 'Roxy'),
(225, 'ROY&RONY'),
(226, 'Russell'),
(227, 'Rusty Neal'),
(228, 'RYDELHOUSE'),
(229, 'Salewa'),
(230, 'Santa Cruz'),
(231, 'Scotch & Soda'),
(232, 'Selected'),
(233, 'Shine'),
(234, 'Sir Benni Miles'),
(235, 'Skank'),
(236, 'Smith\'s'),
(237, 'SoulCal'),
(238, 'Soviet'),
(239, 'Spektrum'),
(240, 'Spiral'),
(241, 'Sublevel'),
(242, 'Sucker Grand'),
(243, 'Sullen'),
(244, 'Superdry'),
(245, 'Supremebeing'),
(246, 'Surplus'),
(247, 'Tazzio'),
(248, 'The North Face'),
(249, 'Timberland'),
(250, 'Timeout'),
(251, 'Unbranded'),
(252, 'Urban Classics'),
(253, 'Urban Surface'),
(254, 'Vans'),
(255, 'Versace'),
(256, 'Victorio'),
(257, 'Villain'),
(258, 'Vintage Industries'),
(259, 'Volcom'),
(260, 'VSCT'),
(261, 'Warmpeace'),
(262, 'Weekend Offender'),
(263, 'Wesc'),
(264, 'Willsoor'),
(265, 'Woox'),
(266, 'Young & Rich'),
(267, 'Zoo York'),
(268, 'Mitex'),
(269, 'Self'),
(270, 'Albastar'),
(271, 'Bad Boy'),
(272, 'BBG'),
(273, 'Benlee'),
(274, 'Butterfly'),
(275, 'CCM'),
(276, 'CINC JEANS'),
(277, 'Craft'),
(278, 'Dangerous DNGRS'),
(279, 'DERBYSTAR'),
(280, 'Diadora'),
(281, 'Didrikson1913'),
(282, 'Didriksons1913'),
(283, 'Donnay'),
(284, 'Dunlop'),
(285, 'EA7 Emporio Armani'),
(286, 'Everlast'),
(287, 'Geoff Anderson'),
(288, 'Gravity'),
(289, 'Hayashi'),
(290, 'Helikon-Tex'),
(291, 'Helly Hansen'),
(292, 'HotSpot Design'),
(293, 'HST'),
(294, 'JADBERG'),
(295, 'Jahti Jakt'),
(296, 'JAMAIS VU'),
(297, 'James & Nicholson'),
(298, 'Just Rhyse'),
(299, 'Kask'),
(300, 'KLIMATEX'),
(301, 'Lazzzy'),
(302, 'Lonsdale'),
(303, 'Lotto'),
(304, 'MAIER'),
(305, 'Maraton'),
(306, 'Maru'),
(307, 'Miss Fiori'),
(308, 'Mizuno'),
(309, 'Muddyfox'),
(310, 'Nanospol'),
(311, 'Navigare'),
(312, 'Newline'),
(313, 'No Fear'),
(314, 'No Name'),
(315, 'O\'Neill'),
(316, 'One Way'),
(317, 'Optimum'),
(318, 'OXDOG'),
(319, 'Patrick'),
(320, 'PAYPER'),
(321, 'Penn'),
(322, 'Picture'),
(323, 'Portwest'),
(324, 'Precision Training'),
(325, 'Rangers'),
(326, 'Reebok'),
(327, 'Result'),
(328, 'REUSCH'),
(329, 'Rhino Rugby'),
(330, 'Roberto Lucca'),
(331, 'Roly'),
(332, 'Ruff Ryders'),
(333, 'Salming'),
(334, 'Sir Joseph'),
(335, 'SLazenger'),
(336, 'Southpole'),
(337, 'Splav'),
(338, 'Star'),
(339, 'Stiga'),
(340, 'Suzan'),
(341, 'Swix'),
(342, 'Tandem Baits'),
(343, 'Termovel'),
(344, 'Thug Life'),
(345, 'Top Ten'),
(346, 'Top Ten MMA'),
(347, 'Tunturi'),
(348, 'Twins'),
(349, 'Umbro'),
(350, 'Unihoc'),
(351, 'Violento'),
(352, 'Warrior'),
(353, 'Zone'),
(354, '47 Brand'),
(355, '686'),
(356, '69slam'),
(357, '7.62 Design'),
(358, 'A Question Of'),
(359, 'Abound'),
(360, 'Addict'),
(361, 'Adidas Originals'),
(362, 'Adio'),
(363, 'Adio Footwear'),
(364, 'Aeropostale'),
(365, 'Affliction'),
(366, 'Air Jordan'),
(367, 'Airwalk'),
(368, 'Akumu Ink'),
(369, 'Alchemy Gothic'),
(370, 'Alcott'),
(371, 'Alien Workshop'),
(372, 'Alife & Kickin'),
(373, 'Alistar'),
(374, 'Almost'),
(375, 'Ambitionfly'),
(376, 'American Fighter'),
(377, 'American Freshman'),
(378, 'Amplified'),
(379, 'Amstaff'),
(380, 'Anon'),
(381, 'Antigua'),
(382, 'Antihero'),
(383, 'Arcore'),
(384, 'Armada'),
(385, 'Art Worx'),
(386, 'Asics'),
(387, 'Associated'),
(388, 'Athmosphere'),
(389, 'Atticus'),
(390, 'B&C'),
(391, 'Babolat'),
(392, 'Backyard Cartel'),
(393, 'Baker'),
(394, 'Banned'),
(395, 'Bauer'),
(396, 'Bella'),
(397, 'Benesport'),
(398, 'Benter'),
(399, 'Berg Outdoor'),
(400, 'Beverley Hills Polo Club'),
(401, 'Biaggio'),
(402, 'Bioworld'),
(403, 'Bioworld Merchandising'),
(404, 'Bittydesign'),
(405, 'Black Cat'),
(406, 'Black Craft'),
(407, 'Black Scale'),
(408, 'Blomor'),
(409, 'Boma'),
(410, 'Boom Bap'),
(411, 'Boxfresh'),
(412, 'Brad Burns'),
(413, 'Brakeburn'),
(414, 'Bravado'),
(415, 'Bravado EU'),
(416, 'Browning'),
(417, 'Brubeck'),
(418, 'Buckaneer'),
(419, 'Bullion'),
(420, 'C \'est'),
(421, 'Cakko'),
(422, 'Callate la Boca'),
(423, 'Campri'),
(424, 'Canis'),
(425, 'Cant Stop The Crooks'),
(426, 'Canterbury'),
(427, 'Carhartt'),
(428, 'Carlo Lamo'),
(429, 'Carra'),
(430, 'CARTON'),
(431, 'Casablanca'),
(432, 'Cayler & Sons'),
(433, 'Character'),
(434, 'Cheap Monday'),
(435, 'Chico'),
(436, 'City Hunter'),
(437, 'Cleptomanicx'),
(438, 'Cliche'),
(439, 'Colmar'),
(440, 'Comeor'),
(441, 'Commando'),
(442, 'Converse'),
(443, 'Crafted'),
(444, 'Crew Clothing'),
(445, 'Criminal Damage'),
(446, 'Cromns'),
(447, 'Crooks & Castles'),
(448, 'CRW'),
(449, 'CRW Star'),
(450, 'Cube'),
(451, 'CXS'),
(452, 'D & A Lifestyle'),
(453, 'D555'),
(454, 'Dada Supreme'),
(455, 'Dakine'),
(456, 'Danilo'),
(457, 'Dare2B'),
(458, 'Darkstar'),
(459, 'DC Shoes'),
(460, 'Deathwish'),
(461, 'Devergo'),
(462, 'Devold'),
(463, 'Diamond'),
(464, 'Diamond Supply Co.'),
(465, 'Didriksons'),
(466, 'Didriksons 1913'),
(467, 'Diem'),
(468, 'Dkny'),
(469, 'Dope Couture'),
(470, 'Dragon'),
(471, 'Dressme'),
(472, 'Duffs'),
(473, 'Dvs'),
(474, 'DVS Shoes'),
(475, 'Dylan Star'),
(476, 'Dynafit'),
(477, 'Dyseone'),
(478, 'EA7'),
(479, 'Earthbound'),
(480, 'Eastpak'),
(481, 'Edelrid'),
(482, 'Elan'),
(483, 'Element'),
(484, 'Eleven Paris'),
(485, 'Ellesse'),
(486, 'Emerica'),
(487, 'Emerica Footwear'),
(488, 'Emi'),
(489, 'Endura'),
(490, 'Enjoi'),
(491, 'Errea'),
(492, 'Etape'),
(493, 'Ethic Star'),
(494, 'Etnies Footwear'),
(495, 'Eto'),
(496, 'EU'),
(497, 'Famous Stars & Straps'),
(498, 'Farah'),
(499, 'Farah 1920'),
(500, 'Farah Vintage'),
(501, 'Fat Pipe'),
(502, 'FDM'),
(503, 'Fear The Fighter'),
(504, 'Fenchurch'),
(505, 'Fenix Athletico'),
(506, 'Ferrino'),
(507, 'Fighter'),
(508, 'Fila'),
(509, 'Fluid'),
(510, 'Force'),
(511, 'Forum'),
(512, 'Forvert'),
(513, 'Fox Racing'),
(514, 'Friend or Faux'),
(515, 'G-Unit'),
(516, 'Gaggoo'),
(517, 'Gamers Wear'),
(518, 'Gamerswear'),
(519, 'García'),
(520, 'Gaya Entertainment'),
(521, 'Gelert'),
(522, 'Gems'),
(523, 'Geographical Norway'),
(524, 'Gildan'),
(525, 'Gio-Goi'),
(526, 'Glo Story'),
(527, 'Golds Gym'),
(528, 'Grenade'),
(529, 'Grimey'),
(530, 'Grimey Wear'),
(531, 'Grips'),
(532, 'GU613'),
(533, 'Habitat'),
(534, 'Hackett'),
(535, 'Halti'),
(536, 'Hardsoda'),
(537, 'Haven'),
(538, 'Hayabusa'),
(539, 'Headline'),
(540, 'Henleys'),
(541, 'Henri Lloyd'),
(542, 'Hertz'),
(543, 'Hi-Tec'),
(544, 'HiEnd'),
(545, 'High Point'),
(546, 'Hilfiger Denim'),
(547, 'Hollister'),
(548, 'Hood Star'),
(549, 'Hot Red'),
(550, 'Hot-Tuna'),
(551, 'House of pain'),
(552, 'HPI'),
(553, 'Humi'),
(554, 'Humör'),
(555, 'Hurley'),
(556, 'Husky'),
(557, 'Hype'),
(558, 'Hyraw'),
(559, 'Impact'),
(560, 'Inov'),
(561, 'Iriedaily'),
(562, 'Iron First'),
(563, 'J!NX'),
(564, 'Jack & Jones'),
(565, 'Jaco'),
(566, 'Jigga'),
(567, 'Jilted Generation'),
(568, 'Jinx'),
(569, 'John Devin'),
(570, 'Joker'),
(571, 'Jordan'),
(572, 'Joya'),
(573, 'Juicy Couture'),
(574, 'Kaporal'),
(575, 'Kappa'),
(576, 'Karl Kani'),
(577, 'Karntner'),
(578, 'Kendo Spring'),
(579, 'Kenzo'),
(580, 'Kickers'),
(581, 'Killstar'),
(582, 'King Apparel'),
(583, 'Kings Road'),
(584, 'Kingsport'),
(585, 'Komperdell'),
(586, 'Korsar'),
(587, 'KP85'),
(588, 'Kr3w'),
(589, 'Kream'),
(590, 'Kreepsville Six Six Six'),
(591, 'La Sportiva'),
(592, 'Lacoste Live'),
(593, 'Lakai'),
(594, 'Lambeste'),
(595, 'Lasting'),
(596, 'Lavecchia'),
(597, 'Le Breve'),
(598, 'Le Coq Sportif'),
(599, 'Lee'),
(600, 'Legends'),
(601, 'Leone'),
(602, 'Lethal Threat'),
(603, 'Level Up Wear'),
(604, 'Levis'),
(605, 'Lib Tech'),
(606, 'Lib Technologies'),
(607, 'Line'),
(608, 'Liquid Blue'),
(609, 'Litex'),
(610, 'Live Nation'),
(611, 'Loshan'),
(612, 'Losi'),
(613, 'Lowe Alpine'),
(614, 'LRG'),
(615, 'LRP Electronic'),
(616, 'Luke 1977'),
(617, 'M.F.H.'),
(618, 'Macbeth'),
(619, 'Madmext'),
(620, 'Mafioso'),
(621, 'Majestic Athletic'),
(622, 'Mambo'),
(623, 'Mantis'),
(624, 'Manto'),
(625, 'Marc Ecko'),
(626, 'Marksumni'),
(627, 'Marmot'),
(628, 'Marshall original'),
(629, 'Mass DNM'),
(630, 'Maver'),
(631, 'Maxjenny'),
(632, 'MCL'),
(633, 'Mecca'),
(634, 'Merrlell'),
(635, 'MFX A Pure Breed'),
(636, 'Milo'),
(637, 'Mishka'),
(638, 'Mister Tee'),
(639, 'Mitchell & Ness'),
(640, 'Moga'),
(641, 'Moira'),
(642, 'Monsta Clothing CO.'),
(643, 'Mr. Gugu Miss GO'),
(644, 'Mugen Seiki'),
(645, 'Muscle Aggressive'),
(646, 'Musicat'),
(647, 'Musto'),
(648, 'Native Youth'),
(649, 'Nautica'),
(650, 'Nebbia'),
(651, 'Nell'),
(652, 'New Balance'),
(653, 'New Era'),
(654, 'New Fashion'),
(655, 'New Men'),
(656, 'Nike 6.0'),
(657, 'Nike Action'),
(658, 'Nike SB'),
(659, 'Nixon'),
(660, 'Nuclear Blast'),
(661, 'NUFC'),
(662, 'Nugget'),
(663, 'Odd Future'),
(664, 'Odlo'),
(665, 'Official'),
(666, 'Oldham'),
(667, 'Oliver'),
(668, 'One'),
(669, 'One Industries'),
(670, 'Original Penguin'),
(671, 'Ortovox'),
(672, 'Osiris'),
(673, 'OZN'),
(674, 'Ozonee'),
(675, 'Ozoshi'),
(676, 'Paffen Sport'),
(677, 'Panuu'),
(678, 'Patria Mardini'),
(679, 'Peace'),
(680, 'Peaked Apparel'),
(681, 'PeakPerformance'),
(682, 'Pelikán'),
(683, 'Pentagon'),
(684, 'Pepsi'),
(685, 'Petrol Industries'),
(686, 'PGwear'),
(687, 'Phantom MMA'),
(688, 'Phat Farm'),
(689, 'Pinguin'),
(690, 'Pink Dolphin'),
(691, 'Planet Earth'),
(692, 'Plastic Head'),
(693, 'Polo'),
(694, 'Polo Ralph Lauren'),
(695, 'Pompey'),
(696, 'Poundout'),
(697, 'Pro Company'),
(698, 'Pro Line'),
(699, 'Promo Textile'),
(700, 'Propeller'),
(701, 'Quantum'),
(702, 'Queen O.F.'),
(703, 'Ragewear'),
(704, 'Ragwear'),
(705, 'Raw Blue'),
(706, 'Razamataz'),
(707, 'Red Dragon'),
(708, 'Reebok Classic'),
(709, 'Reef'),
(710, 'Rehall'),
(711, 'Rejoice'),
(712, 'Relapse'),
(713, 'Religion'),
(714, 'Repulse'),
(715, 'Rhino-Rugby'),
(716, 'Ride'),
(717, 'Ride Snowboards'),
(718, 'Ringspun'),
(719, 'Ripro'),
(720, 'River Island'),
(721, 'Rocawear'),
(722, 'Rock Off'),
(723, 'Rock Rebel'),
(724, 'Rogelli'),
(725, 'Rome'),
(726, 'Rossignol'),
(727, 'Ruka Hore'),
(728, 'Russel'),
(729, 'Russell Athletic'),
(730, 'Rusty'),
(731, 'Salebra'),
(732, 'Salmo'),
(733, 'Salomon'),
(734, 'Savant'),
(735, 'Score Draw'),
(736, 'Scott'),
(737, 'Sektor 1'),
(738, 'Sensor'),
(739, 'Sergio Tacchini'),
(740, 'Sessions'),
(741, 'Sevensins'),
(742, 'Shmack'),
(743, 'SikSilk'),
(744, 'Silvini'),
(745, 'Singing Rock'),
(746, 'Smash'),
(747, 'Solid'),
(748, 'Sondico'),
(749, 'Sonneti'),
(750, 'Soul Cal'),
(751, 'Soul Star'),
(752, 'South Pole'),
(753, 'Spitfire'),
(754, 'Spyder'),
(755, 'Ssur'),
(756, 'Star Wars'),
(757, 'Starter'),
(758, 'Stegol'),
(759, 'Stitch & Soul'),
(760, 'Stoprocent'),
(761, 'Superego'),
(762, 'Superman'),
(763, 'Superprinz'),
(764, 'Supra'),
(765, 'Supreme Being'),
(766, 'Sweep'),
(767, 'Symphony'),
(768, 'Systvm'),
(769, 'Tapout'),
(770, 'Taylor Made'),
(771, 'Team'),
(772, 'Team Losi Racing'),
(773, 'Technine'),
(774, 'Ted Baker'),
(775, 'Ternua'),
(776, 'The Mountain'),
(777, 'Thirtytwo'),
(778, 'Thor'),
(779, 'Thor Steinar'),
(780, 'Thrasher'),
(781, 'Throwdown'),
(782, 'Thunder'),
(783, 'Tokyo Laundry'),
(784, 'Tom Tailor'),
(785, 'Tom Tailor Denim'),
(786, 'Tony Montana'),
(787, 'Topman'),
(788, 'Toxico'),
(789, 'Trangoworld'),
(790, 'Trash'),
(791, 'Trashmark'),
(792, 'Trekmates'),
(793, 'TresPass'),
(794, 'Trimm'),
(795, 'Troy Lee Designs'),
(796, 'Two'),
(797, 'Ucla'),
(798, 'Under Armour'),
(799, 'Underground Fashion'),
(800, 'Up Rise'),
(801, 'US Marshall'),
(802, 'Vaude'),
(803, 'Vehicle'),
(804, 'Venum'),
(805, 'Victrory Records'),
(806, 'Voi'),
(807, 'Voi Jeans'),
(808, 'Volcano'),
(809, 'Von Zipper'),
(810, 'Vox'),
(811, 'VSCT Clubwear'),
(812, 'West Coast Choppers'),
(813, 'Westbeach'),
(814, 'Wild'),
(815, 'Willard'),
(816, 'Wilson'),
(817, 'WLD'),
(818, 'Wrung Division'),
(819, 'Wu-Tang'),
(820, 'X Ray'),
(821, 'Xtreme Couture'),
(822, 'Yakuza'),
(823, 'Your Own'),
(824, 'Yuki Threads'),
(825, 'Yums'),
(826, 'Zajo'),
(827, 'Zimtstern'),
(828, 'Zinzolin'),
(829, 'És Footwear'),
(830, '55DSL'),
(831, '7 for all Mankind'),
(832, '98-86'),
(833, 'Abercrombie'),
(834, 'Agama'),
(835, 'AND1'),
(836, 'Antony Morato'),
(837, 'Arena'),
(838, 'Artistic'),
(839, 'Authority'),
(840, 'B & C'),
(841, 'Bat attack'),
(842, 'Blackhawk'),
(843, 'Blizzard'),
(844, 'Boots & Braces'),
(845, 'C-IN-C'),
(846, 'C1RCA'),
(847, 'Callaway'),
(848, 'Cross Jeanswear'),
(849, 'Dare 2b'),
(850, 'Dharma'),
(851, 'Eider'),
(852, 'Energie'),
(853, 'Famous Stars and Straps'),
(854, 'Fighters Only'),
(855, 'Footjoy'),
(856, 'Foursquare'),
(857, 'Giorgio'),
(858, 'Greg Norman'),
(859, 'Harken'),
(860, 'Head'),
(861, 'Heat Holders'),
(862, 'Heavenly devil'),
(863, 'High Colorado'),
(864, 'Humdrum'),
(865, 'Humor'),
(866, 'Iguana'),
(867, 'J.Lindeberg'),
(868, 'J2 Denim'),
(869, 'Jako'),
(870, 'Jeansnet'),
(871, 'Jockey'),
(872, 'Killtec'),
(873, 'KooGa'),
(874, 'Levi\'s®'),
(875, 'LTB'),
(876, 'Marinepool'),
(877, 'Mass Denim'),
(878, 'MFH'),
(879, 'Mill'),
(880, 'Millet'),
(881, 'Mizuno Golf'),
(882, 'Monsta Clothing Co'),
(883, 'Montane'),
(884, 'Mountain Equipment'),
(885, 'Mqt'),
(886, 'Nevica'),
(887, 'Nikita'),
(888, 'Nitro'),
(889, 'Nordica'),
(890, 'O.K.Sport'),
(891, 'One Green Elephant'),
(892, 'Oneill'),
(893, 'Palm'),
(894, 'Pearl izumi'),
(895, 'Pelle Pelle'),
(896, 'Ping'),
(897, 'Ping Collection'),
(898, 'Pretty Green'),
(899, 'Pure Trash'),
(900, 'QUATRO'),
(901, 'Ram'),
(902, 'Red Pepper'),
(903, 'Rhino'),
(904, 'Skins'),
(905, 'Sky Rebel'),
(906, 'Souhtpole'),
(907, 'Source Lab'),
(908, 'Tempish'),
(909, 'Tilak'),
(910, 'Treksport'),
(911, 'Tribal'),
(912, 'Troy Lee Design'),
(913, 'Uax'),
(914, 'Uhlsport'),
(915, 'VERSACE Jeans'),
(916, 'Vokal'),
(917, 'Wolfgang'),
(918, 'Wrangler'),
(919, 'XLC'),
(920, 'Zara'),
(921, 'És'),
(922, '7-Heaven'),
(923, 'Abbey Dawn'),
(924, 'Aipex Sportswear'),
(925, 'Ambigante'),
(926, 'At republic'),
(927, 'Avaro'),
(928, 'Ax Paris'),
(929, 'B-Fashion'),
(930, 'Bershka'),
(931, 'Bjorn Borg'),
(932, 'Black Level'),
(933, 'Board Angels'),
(934, 'Broadway'),
(935, 'Cachecache'),
(936, 'CHANGE Lingerie'),
(937, 'Chic'),
(938, 'Chilirose'),
(939, 'Cold Heart'),
(940, 'Cottelli Collection'),
(941, 'Electric Lingerie'),
(942, 'EMILY'),
(943, 'Emily the strange'),
(944, 'Emonite'),
(945, 'Essentials'),
(946, 'EU - Azia'),
(947, 'Fearless Illustration'),
(948, 'Femipleasure'),
(949, 'Figl'),
(950, 'FOXRACING'),
(951, 'Fresh Made'),
(952, 'Frock and Frill'),
(953, 'Gemini'),
(954, 'George'),
(955, 'Gina'),
(956, 'Glamorous'),
(957, 'Glamour Babe'),
(958, 'GLORIOUS'),
(959, 'Golddigga'),
(960, 'Hell bunny'),
(961, 'Infinity You'),
(962, 'Internacionale'),
(963, 'Itati'),
(964, 'KarteS'),
(965, 'Katrus'),
(966, 'Ketty'),
(967, 'Koucla'),
(968, 'LA Gear'),
(969, 'LateX'),
(970, 'Lip service'),
(971, 'Lipsy'),
(972, 'Living dead souls'),
(973, 'Mamatayoe'),
(974, 'Maria Bonita by PHAX'),
(975, 'Marlies Dekkers'),
(976, 'Mavi'),
(977, 'Miso'),
(978, 'Miss Posh'),
(979, 'Moe'),
(980, 'Moodo'),
(981, 'Nife'),
(982, 'Noisy May'),
(983, 'NOVAline s.r.o.'),
(984, 'Only'),
(985, 'Opulence By Rare'),
(986, 'Part Two'),
(987, 'Phax'),
(988, 'Pink Lipstick Lingerie'),
(989, 'Poizenb Industries'),
(990, 'Purelime'),
(991, 'Qed London'),
(992, 'RED CORNER'),
(993, 'Relish'),
(994, 'RESTYLE'),
(995, 'Rich Royal'),
(996, 'Rock and Rags'),
(997, 'Rock Angel'),
(998, 'Rock Me'),
(999, 'Silvian Heach'),
(1000, 'Sisley'),
(1001, 'Skhoop'),
(1002, 'Skuska'),
(1003, 'SOURPUSS'),
(1004, 'Steilmann'),
(1005, 'Stitch Soul'),
(1006, 'Stradivarius'),
(1007, 'Sukne'),
(1008, 'Te Amo'),
(1009, 'Tecnifibre'),
(1010, 'TFNC'),
(1011, 'Tümph'),
(1012, 'Uncut'),
(1013, 'Vero Moda'),
(1014, 'Vila'),
(1015, 'Vive Maria'),
(1016, 'Yonex'),
(1017, 'Zaps'),
(1018, 'česká výroba'),
(1019, 'Anita'),
(1020, 'Avanua'),
(1021, 'Babell'),
(1022, 'Benetton'),
(1023, 'CALANDO'),
(1024, 'Casmir'),
(1025, 'Clematis'),
(1026, 'Doreanse'),
(1027, 'Eldar'),
(1028, 'Felina'),
(1029, 'Free People'),
(1030, 'Gaia'),
(1031, 'Gatta'),
(1032, 'GI'),
(1033, 'Gorsenia'),
(1034, 'Gorteks'),
(1035, 'Hamana'),
(1036, 'Kinga'),
(1037, 'Leg Avenue'),
(1038, 'Lormar'),
(1039, 'Maidenform'),
(1040, 'Mango'),
(1041, 'Sariana'),
(1042, 'Sassa'),
(1043, 'Scandale'),
(1044, 'Schiesser'),
(1045, 'Spanx'),
(1046, 'Tiara Galiano'),
(1047, 'Timo'),
(1048, 'Triumph'),
(1049, 'Valente'),
(1050, 'Vestiva'),
(1051, 'Werso'),
(1052, 'YAS'),
(1053, 'Adrian'),
(1054, 'AirStocking'),
(1055, 'Ajatex'),
(1056, 'Aleksandra'),
(1057, 'Anna Field'),
(1058, 'Annes'),
(1059, 'Arges'),
(1060, 'Aries'),
(1061, 'Awe'),
(1062, 'Axami'),
(1063, 'Ballerina'),
(1064, 'Basbleu'),
(1065, 'Beileisi'),
(1066, 'Bellinda'),
(1067, 'Burlington'),
(1068, 'Camano'),
(1069, 'Cette'),
(1070, 'Cougar'),
(1071, 'Damson'),
(1072, 'DIM'),
(1073, 'Donna B.C.'),
(1074, 'Dotex'),
(1075, 'Duotex'),
(1076, 'Egeo'),
(1077, 'Elite'),
(1078, 'Even & Odd'),
(1079, 'Evona'),
(1080, 'Falke'),
(1081, 'Fiore'),
(1082, 'Gabriella'),
(1083, 'Glamour'),
(1084, 'Golden Lady'),
(1085, 'Happy Socks'),
(1086, 'Inez'),
(1087, 'Jasta'),
(1088, 'Knittex'),
(1089, 'Lauratrade'),
(1090, 'Legwear'),
(1091, 'LivCo Corsetti'),
(1092, 'Margop'),
(1093, 'Marilyn'),
(1094, 'Maxis'),
(1095, 'Mona'),
(1096, 'Moraj'),
(1097, 'Novia'),
(1098, 'Oblio'),
(1099, 'Omsa'),
(1100, 'Oppo'),
(1101, 'Oroblu'),
(1102, 'Pamela Mann'),
(1103, 'Pauma'),
(1104, 'Pesail'),
(1105, 'Pretty Polly'),
(1106, 'RelaXsan'),
(1107, 'Rock Daddy'),
(1108, 'Sesto senso'),
(1109, 'Sisi'),
(1110, 'Steven'),
(1111, 'Stoklasa'),
(1112, 'Tatrasvit'),
(1113, 'Tespol'),
(1114, 'Tetra'),
(1115, 'Ulpio'),
(1116, 'V&V fashion'),
(1117, 'Veneziana'),
(1118, 'Wayfarer'),
(1119, 'Wola'),
(1120, 'Zenit'),
(1121, 'Acer'),
(1122, 'Asolo'),
(1123, 'Bafiz'),
(1124, 'Befado'),
(1125, 'Beppi'),
(1126, 'Big Fish'),
(1127, 'Bobas'),
(1128, 'Botas'),
(1129, 'British Knights'),
(1130, 'CAT'),
(1131, 'Cool Shoe'),
(1132, 'Coqui'),
(1133, 'Cortina.be'),
(1134, 'Crocs'),
(1135, 'Crossroad'),
(1136, 'Deakins'),
(1137, 'Duras'),
(1138, 'Ecco'),
(1139, 'Fashy'),
(1140, 'Gola'),
(1141, 'Grays'),
(1142, 'Grendha'),
(1143, 'Grisport'),
(1144, 'Gruna'),
(1145, 'Hannah Montana'),
(1146, 'Havaianas'),
(1147, 'Haywire'),
(1148, 'Heelys'),
(1149, 'High School Musical'),
(1150, 'Hush Puppies'),
(1151, 'Imac'),
(1152, 'Inov-8'),
(1153, 'Ipanema'),
(1154, 'JCB'),
(1155, 'K Swiss'),
(1156, 'Kamik'),
(1157, 'KangaRoos'),
(1158, 'Kayland'),
(1159, 'Keen'),
(1160, 'Kidder'),
(1161, 'Kimbertex'),
(1162, 'Kookaburra'),
(1163, 'Kornecki'),
(1164, 'KTR'),
(1165, 'Lowa'),
(1166, 'Mad Wax'),
(1167, 'Marvel'),
(1168, 'Minnie Mouse'),
(1169, 'Navaho'),
(1170, 'Nevados'),
(1171, 'New Age'),
(1172, 'Northill'),
(1173, 'Norvic'),
(1174, 'Novesta'),
(1175, 'Olang'),
(1176, 'Peddy'),
(1177, 'Pegres'),
(1178, 'Peppa Pig'),
(1179, 'Pineapple'),
(1180, 'Polliwalk'),
(1181, 'Prestige'),
(1182, 'Protetika'),
(1183, 'Quick'),
(1184, 'Rider'),
(1185, 'Rock Spring'),
(1186, 'Shooshoos'),
(1187, 'Skechers'),
(1188, 'Sloffies'),
(1189, 'Slovobuv'),
(1190, 'Spiderman'),
(1191, 'Sprandi'),
(1192, 'Tecnica'),
(1193, 'Teva'),
(1194, 'Thomas the Tank Engine'),
(1195, 'Wanda'),
(1196, 'World Industries'),
(1197, 'Zigzag'),
(1198, '3M'),
(1199, 'Adamant'),
(1200, 'Aimont'),
(1201, 'Alba'),
(1202, 'Ansell'),
(1203, 'Ardon'),
(1204, 'Artra'),
(1205, 'Baak'),
(1206, 'Barea'),
(1207, 'Baťa'),
(1208, 'Bekina'),
(1209, 'BENNON'),
(1210, 'Beta industrials'),
(1211, 'BK'),
(1212, 'Black Knight'),
(1213, 'Boots'),
(1214, 'Cerva'),
(1215, 'Chiruca'),
(1216, 'Cofra'),
(1217, 'CRV'),
(1218, 'D.A.M.'),
(1219, 'Delta plus'),
(1220, 'Delux'),
(1221, 'Demar'),
(1222, 'Dewalt'),
(1223, 'Dog'),
(1224, 'Edis'),
(1225, 'elstrote'),
(1226, 'Elten'),
(1227, 'ESAB'),
(1228, 'ESD'),
(1229, 'Eurohunt'),
(1230, 'Fagum-stomil'),
(1231, 'Flexiko'),
(1232, 'Fridrich&Fridrich'),
(1233, 'Gobako'),
(1234, 'Grensho'),
(1235, 'Haix'),
(1236, 'Harmix'),
(1237, 'Heckel'),
(1238, 'Husqvarna'),
(1239, 'Industrial Starter'),
(1240, 'Island'),
(1241, 'Lemigo'),
(1242, 'McCulloch'),
(1243, 'Medibut'),
(1244, 'Meindl'),
(1245, 'Moleda'),
(1246, 'Nibia'),
(1247, 'OPP'),
(1248, 'Opsial'),
(1249, 'Oregon'),
(1250, 'Orizo'),
(1251, 'OS'),
(1252, 'Panda'),
(1253, 'Panoply'),
(1254, 'Perf'),
(1255, 'Pinnacles'),
(1256, 'Prabos'),
(1257, 'Prologic'),
(1258, 'Pros'),
(1259, 'Raven'),
(1260, 'REB'),
(1261, 'Reis'),
(1262, 'Road'),
(1263, 'Rock'),
(1264, 'Rovnosc'),
(1265, 'Sad'),
(1266, 'Safety steel'),
(1267, 'SafeWay'),
(1268, 'Santé'),
(1269, 'Sharks'),
(1270, 'Sioen'),
(1271, 'Slovakia trend s.r.o'),
(1272, 'SportsTrek'),
(1273, 'Spro'),
(1274, 'StarBaits'),
(1275, 'Steitz Secura'),
(1276, 'Stihl'),
(1277, 'Stillwater'),
(1278, 'Stone'),
(1279, 'Superga'),
(1280, 'Tempex'),
(1281, 'Trafimet'),
(1282, 'U-power'),
(1283, 'uvex'),
(1284, 'VM Import'),
(1285, 'Vorel'),
(1286, 'Wintoperk'),
(1287, 'Worky Safety Line'),
(1288, 'Wortec'),
(1289, 'Yato'),
(1290, 'Adams'),
(1291, 'Airwalk Denim'),
(1292, 'Antony'),
(1293, 'b*a*m'),
(1294, 'Batman'),
(1295, 'Bondi'),
(1296, 'C&A'),
(1297, 'Carodel'),
(1298, 'Character Clothing'),
(1299, 'Design Socks'),
(1300, 'Dirkje'),
(1301, 'Disney'),
(1302, 'F&F'),
(1303, 'Farmers'),
(1304, 'Feel Joy'),
(1305, 'Galvanize'),
(1306, 'GAZELLA'),
(1307, 'Gbstar'),
(1308, 'Heinz Werner'),
(1309, 'Hello Kitty'),
(1310, 'Isbjorn'),
(1311, 'Japitex'),
(1312, 'John Lewis'),
(1313, 'KUGO'),
(1314, 'Kyly'),
(1315, 'Lewro'),
(1316, 'Manchester United'),
(1317, 'Mariposa'),
(1318, 'Marks & Spencer'),
(1319, 'Mayoral'),
(1320, 'Minoti'),
(1321, 'Mtg'),
(1322, 'Name it'),
(1323, 'Neverest'),
(1324, 'Old navy'),
(1325, 'Olympus'),
(1326, 'Ricci'),
(1327, 'Richelieu'),
(1328, 'Scamp'),
(1329, 'Scooby Doo'),
(1330, 'St. Bernard'),
(1331, 'Thomas the Tank'),
(1332, 'Tup Tup'),
(1333, 'Voodoo Dolls'),
(1334, 'YO COMPANY'),
(1335, 'Andrie'),
(1336, 'BlackSpade'),
(1337, 'Chic by Cange'),
(1338, 'Chicco'),
(1339, 'Cornette'),
(1340, 'DC Comics'),
(1341, 'DC Polo'),
(1342, 'DermaProtec'),
(1343, 'Desna'),
(1344, 'Dimotex'),
(1345, 'Donella'),
(1346, 'Doni Underwear'),
(1347, 'Emy Bimba'),
(1348, 'Envie'),
(1349, 'Fuar Baby'),
(1350, 'Gasoline'),
(1351, 'Gucio'),
(1352, 'H&M'),
(1353, 'Hajdan'),
(1354, 'Italian Fashion'),
(1355, 'Karolinka'),
(1356, 'Key'),
(1357, 'Lama'),
(1358, 'Looney Toons'),
(1359, 'Lovelygirl'),
(1360, 'Lunchbox'),
(1361, 'Lupilu'),
(1362, 'Moshi monster'),
(1363, 'Mr Men'),
(1364, 'New Baby'),
(1365, 'Palomino'),
(1366, 'Primal'),
(1367, 'Renvig'),
(1368, 'Sanrio'),
(1369, 'Superhero'),
(1370, 'Taro'),
(1371, 'Unico'),
(1372, 'United Colors of Benetton'),
(1373, 'Vingino'),
(1374, 'Voxx'),
(1375, 'Wajer'),
(1376, 'Warner Brothers'),
(1387, 'Mojasjd jasdj'),
(1388, 'Dressout'),
(1399, 'Neznáma značka'),
(1400, 'Ab'),
(1401, 'AC'),
(1402, 'Ghgujgh');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `artikel`
--
ALTER TABLE `artikel`
  ADD CONSTRAINT `FK_A4375C33113C1FD1` FOREIGN KEY (`znacka_id`) REFERENCES `znacka` (`id`),
  ADD CONSTRAINT `FK_A4375C3338248176` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`),
  ADD CONSTRAINT `FK_A4375C334A20E996` FOREIGN KEY (`expiracia_id`) REFERENCES `expiracia` (`id`),
  ADD CONSTRAINT `FK_A4375C33A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_A4375C33DFEB2608` FOREIGN KEY (`katalog_id`) REFERENCES `katalog` (`id`),
  ADD CONSTRAINT `FK_A4375C33ED70AA70` FOREIGN KEY (`artikel_typ_id`) REFERENCES `artikel_typ` (`id`);

--
-- Constraints for table `artikel_x_material`
--
ALTER TABLE `artikel_x_material`
  ADD CONSTRAINT `FK_A7DF768FE308AC6F` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`),
  ADD CONSTRAINT `FK_A7DF768FEEDF290A` FOREIGN KEY (`artikel_id`) REFERENCES `artikel` (`id`);

--
-- Constraints for table `artikel_x_obdobie`
--
ALTER TABLE `artikel_x_obdobie`
  ADD CONSTRAINT `FK_B227EDA6DC4AAC9A` FOREIGN KEY (`obdobie_id`) REFERENCES `obdobie` (`id`),
  ADD CONSTRAINT `FK_B227EDA6EEDF290A` FOREIGN KEY (`artikel_id`) REFERENCES `artikel` (`id`);

--
-- Constraints for table `artikel_x_prekoho`
--
ALTER TABLE `artikel_x_prekoho`
  ADD CONSTRAINT `FK_6373F6F17089CA09` FOREIGN KEY (`prekoho_id`) REFERENCES `prekoho` (`id`),
  ADD CONSTRAINT `FK_6373F6F1EEDF290A` FOREIGN KEY (`artikel_id`) REFERENCES `artikel` (`id`);

--
-- Constraints for table `artikel_x_stav`
--
ALTER TABLE `artikel_x_stav`
  ADD CONSTRAINT `FK_C9FE4D00A359E780` FOREIGN KEY (`stav_id`) REFERENCES `stav` (`id`),
  ADD CONSTRAINT `FK_C9FE4D00EEDF290A` FOREIGN KEY (`artikel_id`) REFERENCES `artikel` (`id`);

--
-- Constraints for table `credit`
--
ALTER TABLE `credit`
  ADD CONSTRAINT `FK_1CC16EFE38248176` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`),
  ADD CONSTRAINT `FK_1CC16EFE930E25E3` FOREIGN KEY (`id_credit_type`) REFERENCES `credit_type` (`id`),
  ADD CONSTRAINT `FK_1CC16EFEA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `credit_type`
--
ALTER TABLE `credit_type`
  ADD CONSTRAINT `FK_8B1CE81438248176` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`);

--
-- Constraints for table `katalog`
--
ALTER TABLE `katalog`
  ADD CONSTRAINT `FK_28C37C20A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `oblecenie`
--
ALTER TABLE `oblecenie`
  ADD CONSTRAINT `FK_FAF6ECDA359B0684` FOREIGN KEY (`kategoria_id`) REFERENCES `oblecenie_kategorie` (`id`),
  ADD CONSTRAINT `FK_FAF6ECDA3A51F8D0` FOREIGN KEY (`velkost_id`) REFERENCES `oblecenie_velkost` (`id`),
  ADD CONSTRAINT `FK_FAF6ECDAE992B21` FOREIGN KEY (`zostrih_id`) REFERENCES `oblecenie_zostrih` (`id`),
  ADD CONSTRAINT `FK_FAF6ECDAEEDF290A` FOREIGN KEY (`artikel_id`) REFERENCES `artikel` (`id`);

--
-- Constraints for table `oblecenie_x_prilezitost`
--
ALTER TABLE `oblecenie_x_prilezitost`
  ADD CONSTRAINT `FK_E42F5930404A9EE5` FOREIGN KEY (`oblecenie_id`) REFERENCES `oblecenie` (`id`),
  ADD CONSTRAINT `FK_E42F5930FBF6D148` FOREIGN KEY (`oblecenie_prilezitost_id`) REFERENCES `oblecenie_prilezitost` (`id`);

--
-- Constraints for table `oblecenie_x_styl`
--
ALTER TABLE `oblecenie_x_styl`
  ADD CONSTRAINT `FK_C5D265682AB7790A` FOREIGN KEY (`oblecenie_styl_id`) REFERENCES `oblecenie_styl` (`id`),
  ADD CONSTRAINT `FK_C5D26568404A9EE5` FOREIGN KEY (`oblecenie_id`) REFERENCES `oblecenie` (`id`);

--
-- Constraints for table `oblecenie_x_zapianie`
--
ALTER TABLE `oblecenie_x_zapianie`
  ADD CONSTRAINT `FK_44B8DD161B9C2847` FOREIGN KEY (`oblecenie_zapinanie_id`) REFERENCES `oblecenie_zapinanie` (`id`),
  ADD CONSTRAINT `FK_44B8DD16404A9EE5` FOREIGN KEY (`oblecenie_id`) REFERENCES `oblecenie` (`id`);

--
-- Constraints for table `obuv`
--
ALTER TABLE `obuv`
  ADD CONSTRAINT `FK_E27C7EBD359B0684` FOREIGN KEY (`kategoria_id`) REFERENCES `obuv_kategorie` (`id`),
  ADD CONSTRAINT `FK_E27C7EBD6B315BC7` FOREIGN KEY (`vyska_obuvy`) REFERENCES `obuv_vyska` (`id`),
  ADD CONSTRAINT `FK_E27C7EBD75A51051` FOREIGN KEY (`spicka`) REFERENCES `obuv_spicka` (`id`),
  ADD CONSTRAINT `FK_E27C7EBD855D289C` FOREIGN KEY (`velkost_podrazky`) REFERENCES `obuv_velkost_podrazky` (`id`),
  ADD CONSTRAINT `FK_E27C7EBD970FAEA0` FOREIGN KEY (`material_podrazky`) REFERENCES `obuv_material_podrazky` (`id`),
  ADD CONSTRAINT `FK_E27C7EBDE093B9AD` FOREIGN KEY (`velkost_podpadku`) REFERENCES `obuv_velkost_podpadku` (`id`),
  ADD CONSTRAINT `FK_E27C7EBDEEDF290A` FOREIGN KEY (`artikel_id`) REFERENCES `artikel` (`id`);

--
-- Constraints for table `obuv_x_zavazovanie`
--
ALTER TABLE `obuv_x_zavazovanie`
  ADD CONSTRAINT `FK_BD247AA143C8C1FE` FOREIGN KEY (`obuv_id`) REFERENCES `obuv` (`id`),
  ADD CONSTRAINT `FK_BD247AA171835A6D` FOREIGN KEY (`obuv_zavazovanie_id`) REFERENCES `obuv_zavazovanie` (`id`);

--
-- Constraints for table `sprava`
--
ALTER TABLE `sprava`
  ADD CONSTRAINT `FK_E5578BD114DCF71` FOREIGN KEY (`id_user_to`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_E5578BD1BB9D5A2` FOREIGN KEY (`id_parent`) REFERENCES `sprava` (`id`),
  ADD CONSTRAINT `FK_E5578BD43AE519E` FOREIGN KEY (`id_user_from`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_E5578BD7AAAF543` FOREIGN KEY (`id_artikel`) REFERENCES `artikel` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_8D93D649911B012F` FOREIGN KEY (`login_role`) REFERENCES `user_login_role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
