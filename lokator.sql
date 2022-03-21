-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.6.4-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mobilnilokator2
CREATE DATABASE IF NOT EXISTS `mobilnilokator2` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mobilnilokator2`;

-- Dumping structure for table mobilnilokator2.constraints
CREATE TABLE IF NOT EXISTS `constraints` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `locationId` int(11) NOT NULL,
  `allow` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `FK_constraints_user_2` (`locationId`) USING BTREE,
  KEY `FK_constraints_user` (`userId`),
  CONSTRAINT `FK_constraints_location` FOREIGN KEY (`locationId`) REFERENCES `location` (`locationId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_constraints_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping data for table mobilnilokator2.constraints: ~8 rows (approximately)
/*!40000 ALTER TABLE `constraints` DISABLE KEYS */;
INSERT INTO `constraints` (`id`, `userId`, `locationId`, `allow`) VALUES
	(1, 1111, 1, 1),
	(2, 1111, 2, 1),
	(3, 1111, 3, 1),
	(4, 1111, 4, 1),
	(5, 1111, 5, 1),
	(6, 1111, 6, 1),
	(7, 1111, 9, 0),
	(8, 11148, 9, 1),
	(9, 11147, 9, 1);
/*!40000 ALTER TABLE `constraints` ENABLE KEYS */;

-- Dumping structure for table mobilnilokator2.location
CREATE TABLE IF NOT EXISTS `location` (
  `locationId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT 0,
  `locationX` float NOT NULL DEFAULT 0,
  `locationY` float NOT NULL DEFAULT 0,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`locationId`) USING BTREE,
  UNIQUE KEY `userId` (`userId`),
  CONSTRAINT `FK_location_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- Dumping data for table mobilnilokator2.location: ~8 rows (approximately)
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` (`locationId`, `userId`, `locationX`, `locationY`, `time`) VALUES
	(1, 1112, 44.819, 20.4601, '2022-01-04 12:22:52'),
	(2, 1113, 0, 0, '2021-12-25 22:39:58'),
	(3, 11125, 44.82, 20.4602, '2022-01-04 15:29:12'),
	(4, 11126, 44.821, 20.4603, '2022-01-04 15:29:52'),
	(5, 11127, 44.822, 20.4605, '2022-01-04 15:30:23'),
	(6, 11128, 44.825, 20.4608, '2022-01-04 20:57:46'),
	(9, 1111, 0, 0, '2022-01-04 17:28:27'),
	(10, 11147, 0, 0, '2022-01-04 18:33:27'),
	(11, 11148, 0, 0, '2022-01-04 18:36:09');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;

-- Dumping structure for table mobilnilokator2.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `share` tinyint(1) NOT NULL DEFAULT 1,
  `pinColor` varchar(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11150 DEFAULT CHARSET=latin1;

-- Dumping data for table mobilnilokator2.user: ~25 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `email`, `name`, `password`, `share`, `pinColor`) VALUES
	(1111, 'marko@marko.rs', 'marko', '11111', 0, '#988ca9'),
	(1112, 'brana@brana.rs', 'brana', '11111', 0, '#988ca9'),
	(1113, 'test', 'test', 'asdasd', 0, '#988ca9'),
	(11125, 'test2@test.rs', 'Test2', 'ndjsnd', 1, '#988ca9'),
	(11126, 'test3@test.rs', 'Test3', 'ndjsnd', 1, '#9c0231'),
	(11127, 'test4@test.rs', 'Test4', 'bdbsnsm', 1, '#732735'),
	(11128, 'test5@test.rs', 'Test5', 'bdbsjsj', 1, '#be78e4'),
	(11129, 'test7@test', 'test7', '11111', 1, '#FFFFF'),
	(11130, 'test8@test', 'test8', '11111', 1, '#FFFFF'),
	(11131, 'test9@test', 'test9', '11111', 1, '#FFFFF'),
	(11132, 'test10@test.rs', 'Test10', 'hdjsjsn', 1, '#c77a05'),
	(11133, 'test11@test.rs', 'Test11', 'bdjsns', 1, '#e255d7'),
	(11134, 'test12@test.rs', 'Test12', 'nfjsnx', 1, '#31bb2b'),
	(11136, 'test13@test.rs', 'Test13', 'bdjsns', 1, '#d3ed30'),
	(11137, 'test14@test.rs', 'Test14', 'hdbdbs', 1, '#d48c59'),
	(11138, 'test15@test.ra', 'Test15', 'hdjsjd', 1, '#e67079'),
	(11139, 'test16@test.rs', 'Test16', 'jdnsnd', 1, '#7277ab'),
	(11140, 'test17@test.rs', 'sssss', '11111', 1, '#FFFFF'),
	(11142, 'test18@test.rs', 'sssss', '11111', 1, '#FFFFF'),
	(11143, 'test19@test.rs', 'sssss', '11111', 1, '#FFFFF'),
	(11144, 'test20@test.rs', 'sssss', '11111', 1, '#FFFFF'),
	(11145, 'test21@test.rs', 'sssss', '11111', 1, '#FFFFF'),
	(11146, 'test22@test.rs', 'sssss', '11111', 1, '#FFFFF'),
	(11147, 'test23@test.rs', 'Test23', 'jdjsndj', 1, '#92f91b'),
	(11148, 'test24@test.rs', 'Test24', 'bdjsndn', 1, '#22d093');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
