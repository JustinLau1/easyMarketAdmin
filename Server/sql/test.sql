
# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '',
  `code` varchar(255) DEFAULT '',
  `status` int NOT NULL,
  `update_time` TIMESTAMP NOT NULL default CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `category` WRITE;

INSERT INTO `category` ( `name`, `code`, `status`) VALUES ('category1','categoryCode','1');
UNLOCK TABLES;