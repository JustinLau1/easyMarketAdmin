CREATE TABLE `category` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) DEFAULT NULL,
`code` varchar(255) DEFAULT NULL,
`status` int NOT NULL,
`createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '数据创建时间',
`updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '数据更新时间',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `category` WRITE;

INSERT INTO `category` ( `name`, `code`, `status`) VALUES ('category1','categoryCode','1');
UNLOCK TABLES;

CREATE TABLE `goods` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) DEFAULT NULL,
`categoryId` varchar(255) DEFAULT NULL,
`imgUrl` varchar(255) DEFAULT NULL,
`marketPrice` int NOT NULL,
`salePrice` int NOT NULL,
`totalStock` int NOT NULL,
`saleStock` int NOT NULL,
`status` int NOT NULL,
`createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '数据创建时间',
`updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '数据更新时间',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `goods` WRITE;


CREATE TABLE `user` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`chineseName` varchar(255) DEFAULT NULL,
`userAcount` varchar(255) DEFAULT NULL,
`phone` varchar(255) DEFAULT NULL,
`email` varchar(255) DEFAULT NULL,
`password` varchar(255) DEFAULT NULL,
`sessionId` varchar(255) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;

INSERT INTO `user` ( `chineseName`, `userAcount`, `phone`,`email`,`password`) VALUES ('罗国雄','peroWeb','15323907318','1025558554@qq.com','123456');
UNLOCK TABLES;

CREATE TABLE `home` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`bannerImgList` TEXT DEFAULT NULL,
`goodsWareList` TEXT DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `home` WRITE;
UNLOCK TABLES;