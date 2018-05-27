-- MySQL dump 10.14  Distrib 5.5.52-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: boss
-- ------------------------------------------------------
-- Server version	5.5.52-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `boss_IDC`
--

DROP TABLE IF EXISTS `boss_IDC`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_IDC` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '数据中心名称',
  `idcSite` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '北京' COMMENT '位置',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据中心';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_IDC`
--

LOCK TABLES `boss_IDC` WRITE;
/*!40000 ALTER TABLE `boss_IDC` DISABLE KEYS */;
INSERT INTO `boss_IDC` VALUES (1,'东直门IDC','北京'),(2,'酒仙桥IDC','北京'),(3,'燕郊IDC','河北·廊坊'),(4,'太和桥IDC','北京'),(5,'上海嘉定IDC','上海'),(8,'EQUANT-IDC','北京');
/*!40000 ALTER TABLE `boss_IDC` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_IDC_building`
--

DROP TABLE IF EXISTS `boss_IDC_building`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_IDC_building` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `IDCid` int(11) DEFAULT NULL COMMENT '所属IDC',
  `buildName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '德信大厦' COMMENT '楼宇名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼宇';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_IDC_building`
--

LOCK TABLES `boss_IDC_building` WRITE;
/*!40000 ALTER TABLE `boss_IDC_building` DISABLE KEYS */;
INSERT INTO `boss_IDC_building` VALUES (1,1,'东环广场A座'),(2,2,'德信大厦'),(3,3,'1期'),(4,3,'2期'),(5,4,'1号楼'),(6,4,'2号楼'),(7,4,'3号楼'),(8,5,'1期'),(22,8,'EQ-1号楼');
/*!40000 ALTER TABLE `boss_IDC_building` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_IDC_building_floor`
--

DROP TABLE IF EXISTS `boss_IDC_building_floor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_IDC_building_floor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcID` int(11) DEFAULT '0' COMMENT 'IDC',
  `buildID` int(11) DEFAULT NULL COMMENT '楼宇',
  `floorName` char(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '楼层名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼宇';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_IDC_building_floor`
--

LOCK TABLES `boss_IDC_building_floor` WRITE;
/*!40000 ALTER TABLE `boss_IDC_building_floor` DISABLE KEYS */;
INSERT INTO `boss_IDC_building_floor` VALUES (1,1,1,'东环广场A座-B1'),(2,1,1,'东环广场A座-B2'),(3,4,7,'the-3F'),(4,4,6,'the-3F'),(5,2,2,'德信大厦-1F'),(6,5,8,'JD-1F'),(28,8,22,'EQ-1-1F');
/*!40000 ALTER TABLE `boss_IDC_building_floor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_IDC_room`
--

DROP TABLE IF EXISTS `boss_IDC_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_IDC_room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roomName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '机房名称',
  `IDCID` int(11) DEFAULT NULL COMMENT '所属IDC',
  `buildID` int(11) DEFAULT NULL COMMENT '所属大厦',
  `floorID` int(11) DEFAULT NULL COMMENT '楼层',
  `roomType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '模块' COMMENT '房间类型',
  `ISPLine` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ISP线路',
  `bandwidth` int(11) DEFAULT '0' COMMENT '带宽(Gbps)',
  `IPNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT 'IP数量',
  `loadFactor` float(2,2) DEFAULT '0.00' COMMENT '机柜满载率',
  `Site_x` int(11) DEFAULT '0' COMMENT '位置X',
  `Site_y` int(11) DEFAULT '0' COMMENT '位置Y',
  `Layout_x` int(11) DEFAULT '0' COMMENT '布局X',
  `Layout_y` int(11) DEFAULT '0' COMMENT '布局Y',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='机房';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_IDC_room`
--

LOCK TABLES `boss_IDC_room` WRITE;
/*!40000 ALTER TABLE `boss_IDC_room` DISABLE KEYS */;
INSERT INTO `boss_IDC_room` VALUES (3,'A01-302',4,7,3,'1','2',0,'',0.00,1,1,8,32),(7,'A01-301',4,7,3,'1','2',0,'',0.00,1,2,8,32),(8,'A01-300',4,7,3,'2','',0,'',0.00,1,3,16,32),(9,'A-201',2,2,5,'1','2',0,'',0.00,1,2,8,32),(10,'EQ-ONE机房',8,22,28,'2','3',0,'',0.00,0,0,0,0);
/*!40000 ALTER TABLE `boss_IDC_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_SDH`
--

DROP TABLE IF EXISTS `boss_SDH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_SDH` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `odfName` varchar(255) DEFAULT NULL COMMENT '所属配线架',
  `userName` varchar(255) DEFAULT NULL COMMENT '公司名称',
  `Jump-line-position` int(11) DEFAULT '0' COMMENT '跳线位置',
  `lineInterface` varchar(255) DEFAULT NULL COMMENT '跳线接口',
  `computeRoomID` int(11) DEFAULT '0' COMMENT '对端机房',
  `computeWeakID` int(11) DEFAULT '0' COMMENT '对端机柜',
  `text` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='SDH线路';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_SDH`
--

LOCK TABLES `boss_SDH` WRITE;
/*!40000 ALTER TABLE `boss_SDH` DISABLE KEYS */;
/*!40000 ALTER TABLE `boss_SDH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_cab_selector`
--

DROP TABLE IF EXISTS `boss_cab_selector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_cab_selector` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idcid` int(11) DEFAULT NULL,
  `building` int(11) DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `room` int(11) DEFAULT NULL,
  `cabinet` int(11) DEFAULT NULL,
  `roomsize` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_cab_selector`
--

LOCK TABLES `boss_cab_selector` WRITE;
/*!40000 ALTER TABLE `boss_cab_selector` DISABLE KEYS */;
/*!40000 ALTER TABLE `boss_cab_selector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_cabinet`
--

DROP TABLE IF EXISTS `boss_cabinet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_cabinet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcID` int(11) DEFAULT '0' COMMENT '所属IDC',
  `buildingID` int(11) DEFAULT '0' COMMENT '所属楼宇',
  `floorID` int(11) DEFAULT '0' COMMENT '所属楼层',
  `roomID` int(11) DEFAULT '0' COMMENT '所属机房',
  `cabinetName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '机柜编号',
  `cabineType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '标准机柜' COMMENT '机柜类型',
  `powered` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '未加电' COMMENT '加电状态',
  `leaseState` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '空机柜' COMMENT '租赁状态',
  `weakID` int(11) DEFAULT '0' COMMENT '所属弱电柜',
  `strongID` int(11) DEFAULT '0' COMMENT '所属强电柜',
  `Site_x` int(11) DEFAULT '0' COMMENT '位置X',
  `Site_y` int(11) DEFAULT '0' COMMENT '位置Y',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='机柜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_cabinet`
--

LOCK TABLES `boss_cabinet` WRITE;
/*!40000 ALTER TABLE `boss_cabinet` DISABLE KEYS */;
INSERT INTO `boss_cabinet` VALUES (11,4,7,3,3,'A-002','标准机柜','2','1',0,1,2,1,''),(12,8,22,28,10,'EQ-Column1','标准机柜','','',0,0,0,0,'');
/*!40000 ALTER TABLE `boss_cabinet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_cabinet_facility`
--

DROP TABLE IF EXISTS `boss_cabinet_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_cabinet_facility` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `requisID` int(11) DEFAULT '0' COMMENT '申请单号',
  `cabinetID` int(11) DEFAULT '0' COMMENT '所在机柜',
  `deviceType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '设备类型',
  `deviceName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '设备名称',
  `deviceModel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '设备型号',
  `unumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'U数',
  `deviceSerial` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '序列号',
  `devLocation` int(11) DEFAULT '0' COMMENT '所在位置（U号）',
  `shift_in_date` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '操作日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='设备';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_cabinet_facility`
--

LOCK TABLES `boss_cabinet_facility` WRITE;
/*!40000 ALTER TABLE `boss_cabinet_facility` DISABLE KEYS */;
INSERT INTO `boss_cabinet_facility` VALUES (3,0,12,'服务器','DELL-100',NULL,NULL,NULL,0,'0000-00-00 00:00:00');
/*!40000 ALTER TABLE `boss_cabinet_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_cabinet_facility_request`
--

DROP TABLE IF EXISTS `boss_cabinet_facility_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_cabinet_facility_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `apply_no` char(20) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '申请单号',
  `applyDate` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '申请日期',
  `idcID` int(11) DEFAULT '0' COMMENT '数据中心',
  `subID` int(11) DEFAULT '0' COMMENT '公司名称',
  `migrationDate` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '迁移日期',
  `business` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '办理业务',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='申请单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_cabinet_facility_request`
--

LOCK TABLES `boss_cabinet_facility_request` WRITE;
/*!40000 ALTER TABLE `boss_cabinet_facility_request` DISABLE KEYS */;
INSERT INTO `boss_cabinet_facility_request` VALUES (7,'6786778678','2018-05-23 00:00:00',4,2,'2018-05-23 09:48:40','2','');
/*!40000 ALTER TABLE `boss_cabinet_facility_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_cabinet_migration`
--

DROP TABLE IF EXISTS `boss_cabinet_migration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_cabinet_migration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `requisID` char(20) COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '申请单号',
  `deviceType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '设备类型',
  `deviceName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '设备名称',
  `uniType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '设备型号',
  `size` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'U数',
  `sn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '序列号',
  `shift_in_room` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '迁入机房',
  `shift_in_cabinet` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '迁入机柜',
  `shift_in_site` int(11) DEFAULT NULL COMMENT '迁入位置（U号）',
  `shift_out_room` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '迁出机房',
  `shift_out_cabinet` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '迁出机柜',
  `shift_out_site` int(11) DEFAULT NULL COMMENT '迁出位置（U号）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='申请迁移的设备记录';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_cabinet_migration`
--

LOCK TABLES `boss_cabinet_migration` WRITE;
/*!40000 ALTER TABLE `boss_cabinet_migration` DISABLE KEYS */;
INSERT INTO `boss_cabinet_migration` VALUES (4,'6786778678','','DELL服务器','720','2','432453464356','3','11',12,'','',0);
/*!40000 ALTER TABLE `boss_cabinet_migration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_cabinet_strong`
--

DROP TABLE IF EXISTS `boss_cabinet_strong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_cabinet_strong` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcID` int(11) DEFAULT '0' COMMENT '所属IDC',
  `buildingID` int(11) DEFAULT '0' COMMENT '所属楼宇',
  `floorID` int(11) DEFAULT '0' COMMENT '所属楼层',
  `roomID` int(11) DEFAULT '0' COMMENT '所属机房',
  `cabinetName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '机柜编号',
  `cabineType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '标准机柜' COMMENT '机柜类型',
  `manufacturer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '制造商',
  `supplier` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '供货商',
  `evolutionary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '变动方式',
  `startTime` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '开始使用时间',
  `upwardPowerA` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '上联设施（A路）',
  `upwardPowerB` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '上联设施（B路）',
  `connection` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '接线方式',
  `Site_x` int(11) DEFAULT '0' COMMENT '位置X',
  `Site_y` int(11) DEFAULT '0' COMMENT '位置Y',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT COMMENT='机柜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_cabinet_strong`
--

LOCK TABLES `boss_cabinet_strong` WRITE;
/*!40000 ALTER TABLE `boss_cabinet_strong` DISABLE KEYS */;
INSERT INTO `boss_cabinet_strong` VALUES (15,8,22,28,10,'EQ-POW-1','强电列头柜','有能','有能','购入',NULL,'','','',0,0,'');
/*!40000 ALTER TABLE `boss_cabinet_strong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_cabinet_strong_facility`
--

DROP TABLE IF EXISTS `boss_cabinet_strong_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_cabinet_strong_facility` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cabinetId` int(11) DEFAULT '0' COMMENT '所属列头柜',
  `switchCode` char(100) COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '空开编号',
  `ref_cabinetId` int(11) DEFAULT '0' COMMENT '对端机柜',
  `powered` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '加电状态',
  `upState` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '可用状态',
  `lineNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '线路编号',
  `switchTime` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '最后操作时间',
  `afterOperation` int(11) DEFAULT '0' COMMENT '操作后电量',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT COMMENT='机柜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_cabinet_strong_facility`
--

LOCK TABLES `boss_cabinet_strong_facility` WRITE;
/*!40000 ALTER TABLE `boss_cabinet_strong_facility` DISABLE KEYS */;
INSERT INTO `boss_cabinet_strong_facility` VALUES (21,15,'EQ-AIR1',16,'','','EQ-AIR1','2018-05-27 03:53:30',0,'空气开关'),(23,15,'EQ-Air2',0,'','','','2018-05-27 04:06:19',0,'');
/*!40000 ALTER TABLE `boss_cabinet_strong_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_cabinet_weak`
--

DROP TABLE IF EXISTS `boss_cabinet_weak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_cabinet_weak` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcID` int(11) DEFAULT '0' COMMENT '所属IDC',
  `buildingID` int(11) DEFAULT '0' COMMENT '所属楼宇',
  `floorID` int(11) DEFAULT '0' COMMENT '所属楼层',
  `roomID` int(11) DEFAULT '0' COMMENT '所属机房',
  `cabinetName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '机柜编号',
  `cabineType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '弱电列头柜' COMMENT '机柜类型',
  `startTime` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '开始使用时间',
  `strongID` int(11) DEFAULT '0' COMMENT '所属强电柜',
  `Site_x` int(11) DEFAULT '0' COMMENT '位置X',
  `Site_y` int(11) DEFAULT '0' COMMENT '位置Y',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT COMMENT='机柜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_cabinet_weak`
--

LOCK TABLES `boss_cabinet_weak` WRITE;
/*!40000 ALTER TABLE `boss_cabinet_weak` DISABLE KEYS */;
INSERT INTO `boss_cabinet_weak` VALUES (1,4,7,3,3,'A-032','弱电列头柜','2018-05-21 15:45:45',1,32,1,''),(2,4,7,3,3,'B-032','弱电列头柜','2018-05-22 16:03:45',2,32,2,''),(13,4,7,3,3,'C-032','弱电列头柜','2018-05-22 16:17:52',3,32,3,''),(14,4,7,3,3,'D-032','弱电列头柜','2018-05-22 16:18:33',4,32,4,''),(16,8,22,28,10,'EQ-WEAK-Column','弱电列头柜',NULL,0,0,0,'');
/*!40000 ALTER TABLE `boss_cabinet_weak` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_cabinet_weak_facility`
--

DROP TABLE IF EXISTS `boss_cabinet_weak_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_cabinet_weak_facility` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cabinetWeekId` int(11) DEFAULT NULL COMMENT '弱电柜ID',
  `cabinetName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '弱电柜详情',
  `deviceType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '设备类型',
  `deviceName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '设备名称',
  `uniType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '设备型号',
  `size` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '端口数',
  `sn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '序列号',
  `site` int(11) DEFAULT '0' COMMENT '所在位置（U号）',
  `Layout_x` int(11) DEFAULT '0' COMMENT '跳线口布局X',
  `Layout_y` int(11) DEFAULT '0' COMMENT '跳线口布局Y',
  `shift_in_date` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '操作日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT COMMENT='机柜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_cabinet_weak_facility`
--

LOCK TABLES `boss_cabinet_weak_facility` WRITE;
/*!40000 ALTER TABLE `boss_cabinet_weak_facility` DISABLE KEYS */;
INSERT INTO `boss_cabinet_weak_facility` VALUES (15,16,'EQ-WEAK1','光纤配线架','EQ-PXJ1','','23','121',0,25,2,'2018-05-25 00:00:00'),(17,16,'EQ-WEAK2','光纤配线架','','','','',0,25,2,'2018-05-26 00:00:00');
/*!40000 ALTER TABLE `boss_cabinet_weak_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_cabinet_ws_plan`
--

DROP TABLE IF EXISTS `boss_cabinet_ws_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_cabinet_ws_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `apply_no` char(20) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '申请单号',
  `applyDate` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '申请日期',
  `idcID` int(11) DEFAULT '0' COMMENT '数据中心',
  `subID` int(11) DEFAULT '0' COMMENT '公司名称',
  `operateDate` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '操作日期',
  `business` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '办理业务',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT COMMENT='申请单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_cabinet_ws_plan`
--

LOCK TABLES `boss_cabinet_ws_plan` WRITE;
/*!40000 ALTER TABLE `boss_cabinet_ws_plan` DISABLE KEYS */;
INSERT INTO `boss_cabinet_ws_plan` VALUES (9,'jjsdfklasjfklsad','2018-05-23 00:00:00',1,2,'2018-05-23 00:00:00','加电','');
/*!40000 ALTER TABLE `boss_cabinet_ws_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_cabinet_ws_plan-detailing`
--

DROP TABLE IF EXISTS `boss_cabinet_ws_plan-detailing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_cabinet_ws_plan-detailing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `requisID` char(20) COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '申请单号',
  `deviceType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '设备类型',
  `deviceName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '设备名称',
  `uniType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '设备型号',
  `size` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'U数',
  `sn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '序列号',
  `shift_in_room` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '迁入机房',
  `shift_in_cabinet` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '迁入机柜',
  `shift_in_site` int(11) DEFAULT NULL COMMENT '迁入位置（U号）',
  `shift_out_room` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '迁出机房',
  `shift_out_cabinet` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '迁出机柜',
  `shift_out_site` int(11) DEFAULT NULL COMMENT '迁出位置（U号）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT COMMENT='申请迁移的设备记录';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_cabinet_ws_plan-detailing`
--

LOCK TABLES `boss_cabinet_ws_plan-detailing` WRITE;
/*!40000 ALTER TABLE `boss_cabinet_ws_plan-detailing` DISABLE KEYS */;
INSERT INTO `boss_cabinet_ws_plan-detailing` VALUES (1,'1','服务器','DELL刀片服务器','7500','1','28773534989347238','3','8',32,'4','9',12),(2,'2342143','','','','','','3','8',0,'','',0),(3,'6786778678','1','DELL服务器','797898','21','545654756756','A-302','21',2,'','',0);
/*!40000 ALTER TABLE `boss_cabinet_ws_plan-detailing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_customer`
--

DROP TABLE IF EXISTS `boss_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '公司名称',
  `subType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '默认类型' COMMENT '业务类型',
  `useType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '企业用户' COMMENT '用户类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_customer`
--

LOCK TABLES `boss_customer` WRITE;
/*!40000 ALTER TABLE `boss_customer` DISABLE KEYS */;
INSERT INTO `boss_customer` VALUES (1,'北京光环国际科技股份有限公司','1','2'),(2,'北京三快科技有限公司','2','2');
/*!40000 ALTER TABLE `boss_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss_order_test`
--

DROP TABLE IF EXISTS `boss_order_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boss_order_test` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uName` char(20) DEFAULT NULL,
  `auto` char(20) DEFAULT NULL,
  `money` int(11) DEFAULT NULL,
  `groupId` char(11) DEFAULT NULL,
  `isNetWork` char(10) DEFAULT NULL,
  `uuid` char(20) DEFAULT NULL,
  `recorder` char(20) DEFAULT NULL,
  `custid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss_order_test`
--

LOCK TABLES `boss_order_test` WRITE;
/*!40000 ALTER TABLE `boss_order_test` DISABLE KEYS */;
INSERT INTO `boss_order_test` VALUES (9,'alex','yes',199,'1','网络','101010','sales1',NULL),(10,'随便','yes',899,'2','','','sales1',0),(11,'abcd','auto',9900,'2','网络','cdid-232-232','sales1',NULL),(12,'9999','222',232,'1','notnet','234324','sales1',NULL);
/*!40000 ALTER TABLE `boss_order_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_activity`
--

DROP TABLE IF EXISTS `nanx_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_code` char(255) NOT NULL DEFAULT '' COMMENT '活动代码code',
  `activity_type` char(20) DEFAULT NULL,
  `memo` char(255) DEFAULT NULL,
  `base_table` char(100) DEFAULT NULL,
  `service_url` char(100) DEFAULT NULL,
  `data_url` char(255) DEFAULT NULL,
  `url_for_get_cfg2` varchar(255) NOT NULL DEFAULT '' COMMENT '执行活动的url',
  `url_para` char(255) DEFAULT NULL,
  `pic_url` char(100) NOT NULL DEFAULT '' COMMENT '显示的图片地址',
  `grid_title` char(30) DEFAULT NULL,
  `sql` varchar(900) DEFAULT NULL,
  `extra_js` char(30) DEFAULT NULL,
  `js_function_point` char(100) DEFAULT NULL,
  `level` char(6) NOT NULL DEFAULT 'F',
  `win_size_height` int(255) DEFAULT NULL,
  `win_size_width` int(255) DEFAULT NULL,
  `win_size_width_operation` int(11) DEFAULT NULL,
  `view_filter` char(100) DEFAULT NULL,
  `view_filter_memo` char(250) DEFAULT NULL,
  `owner_data_only` int(1) DEFAULT NULL,
  `tree_text_field` char(100) DEFAULT NULL,
  `tree_parent_field` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `activity_code` (`activity_code`)
) ENGINE=InnoDB AUTO_INCREMENT=346 DEFAULT CHARSET=utf8 COMMENT='活动注册表格';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity`
--

LOCK TABLES `nanx_activity` WRITE;
/*!40000 ALTER TABLE `nanx_activity` DISABLE KEYS */;
INSERT INTO `nanx_activity` VALUES (90,'NANX_TBL_DATA','service',NULL,NULL,'mrdbms/getTableFields','curd/listData','rdbms/getTableFields','table','http://127.0.0.1/nanx/imgs/icon-48-banner-categories.png','',NULL,NULL,NULL,'system',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(91,'NANX_TBL_STRU','service',NULL,NULL,'mrdbms/get_table_creation_info_no_directshow','rdbms/get_table_creation_info_directshow','rdbms/get_table_creation_info_no_directshow','table','http://127.0.0.1/nanx/imgs/icon-48-banner-categories.png',NULL,NULL,NULL,NULL,'system',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(92,'NANX_TBL_INDEX','service',NULL,NULL,'mrdbms/get_min_table_indexes_no_directshow','rdbms/get_min_table_indexes_directshow','rdbms/get_min_table_indexes_no_directshow','table','http://127.0.0.1/nanx/imgs/icon-48-banner-categories.png',NULL,NULL,NULL,NULL,'system',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(93,'NANX_TBL_CREATE','service',NULL,NULL,'mrdbms/get_table_creation_info_no_directshow','rdbms/get_table_creation_info_directshow','rdbms/get_table_creation_info_no_directshow','table','http://127.0.0.1/nanx/imgs/icon-48-banner-categories.png',NULL,NULL,NULL,NULL,'system',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(116,'NANX_SYS_CONFIG','service',NULL,'',NULL,'curd/listData','',NULL,'',NULL,NULL,NULL,NULL,'system',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(134,'NANX_APP_SUMMARY','html',NULL,NULL,'tree/systemSummary','tree/systemSummary','',NULL,'icon-48-links.png','NANX_APP_SUMMARY',NULL,NULL,NULL,'system',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(177,'NANX_TB_LAYOUT','sql',NULL,NULL,NULL,'curd/listData','',NULL,'',NULL,'select   field_list   from  nanx_activity_biz_layout   where  raw_table=$table',NULL,NULL,'system',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(226,'NANX_FS_2_TABLE','service',NULL,NULL,'mfile/getFSGridFields','file/fs2array','mfile/getFSGridFields',NULL,'default_act.png','',NULL,NULL,NULL,'system',662,800,899,NULL,NULL,NULL,NULL,NULL),(234,'NANX_SQL_ACTIVITY','sql',NULL,NULL,NULL,'curd/listData','',NULL,'act_sql.png','run_sql','show tables;',NULL,NULL,'system',644,800,899,NULL,NULL,NULL,NULL,NULL),(305,'Cabinet_tree','js',NULL,NULL,NULL,'curd/listData','',NULL,'jupdate-uptodate.png','总览图',NULL,'cabinet_tree.js','entry_fun','F',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(321,'bpm_debug','table',NULL,'boss_order_test',NULL,'curd/listData','',NULL,'act_common.png','工作流_debug',NULL,NULL,NULL,'F',644,800,899,NULL,NULL,NULL,NULL,NULL),(326,'act_boss_IDC_1887887022','table',NULL,'boss_IDC',NULL,NULL,'',NULL,'location_a.png','IDC管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(327,'act_boss_IDC_building_1492492470','table',NULL,'boss_IDC_building',NULL,NULL,'',NULL,'Light_On.png','IDC楼宇管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(328,'act_boss_IDC_building_floor_443513881','table',NULL,'boss_IDC_building_floor',NULL,NULL,'',NULL,'module.png','楼宇楼层管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(329,'act_boss_IDC_room_793875312','table',NULL,'boss_IDC_room',NULL,NULL,'',NULL,'node_manage.png','楼层房间管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(330,'act_boss_cabinet_1247145026','table',NULL,'boss_cabinet',NULL,NULL,'',NULL,'icons8-view_column_filled.png','A机柜管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(331,'act_boss_cabinet_facility_1087886575','table',NULL,'boss_cabinet_facility',NULL,NULL,'',NULL,'hardware.png','机柜设备管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(332,'act_boss_cabinet_facility_request_897393640','table',NULL,'boss_cabinet_facility_request',NULL,NULL,'',NULL,'Sales-by-Payment-Method-rep.png','A机柜上下申请单',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(333,'act_boss_cabinet_migration_262658834','table',NULL,'boss_cabinet_migration',NULL,NULL,'',NULL,'Invoice.png','上下架申请设备清单',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(334,'act_boss_cabinet_strong_1288470746','table',NULL,'boss_cabinet_strong',NULL,NULL,'',NULL,'extension.png','强电列头柜管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(335,'act_boss_cabinet_strong_facility_531523240','table',NULL,'boss_cabinet_strong_facility',NULL,NULL,'',NULL,'product_list.png','强电柜空开管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(336,'act_boss_cabinet_weak_1619761718','table',NULL,'boss_cabinet_weak',NULL,NULL,'',NULL,'jupdate-uptodate.png','弱电列头柜管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(337,'act_boss_cabinet_weak_facility_1704016905','table',NULL,'boss_cabinet_weak_facility',NULL,NULL,'',NULL,'links.png','弱电柜配线架管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(338,'act_boss_customer_2116617297','table',NULL,'boss_customer',NULL,NULL,'',NULL,'user.png','用户管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(339,'act_boss_SDH_906947720','table',NULL,'boss_SDH',NULL,NULL,'',NULL,'switch.png','配线架跳线管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(340,'act_boss_cabinet_facility_request_1360736191','table',NULL,'boss_cabinet_facility_request',NULL,NULL,'',NULL,'transfer_p2p.png','A上下架管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(343,'sql_act1','sql',NULL,NULL,NULL,'curd/listData','',NULL,'component.png','sql_act1','select id ,roomName from boss_IDC_room',NULL,NULL,'F',644,800,899,NULL,NULL,NULL,NULL,NULL),(344,'sdhline','js',NULL,NULL,NULL,'curd/listData','',NULL,'act_js.png','跳线记录',NULL,'sdh_line.js','sdh_line_editor','F',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(345,'cab_selector','table',NULL,'boss_cab_selector',NULL,'curd/listData','',NULL,'act_common.png','机柜选择器',NULL,NULL,NULL,'F',644,800,899,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `nanx_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_activity_a2a_btns`
--

DROP TABLE IF EXISTS `nanx_activity_a2a_btns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_activity_a2a_btns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_code` varchar(255) DEFAULT NULL,
  `btn_name` varchar(255) DEFAULT NULL,
  `btn_function` varchar(255) DEFAULT NULL,
  `btn_filter` varchar(255) DEFAULT NULL,
  `activity_for_btn` varchar(255) DEFAULT NULL,
  `field_for_main_activity` varchar(255) DEFAULT NULL,
  `field_for_sub_activity` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_a2a_btns`
--

LOCK TABLES `nanx_activity_a2a_btns` WRITE;
/*!40000 ALTER TABLE `nanx_activity_a2a_btns` DISABLE KEYS */;
INSERT INTO `nanx_activity_a2a_btns` VALUES (26,'act_boss_cabinet_facility_request_897393640','明细项',NULL,NULL,'act_boss_cabinet_migration_262658834','apply_no','requisID'),(29,'act_boss_cabinet_facility_request_1360736191','+ 设备上下架',NULL,NULL,'act_boss_cabinet_migration_262658834','apply_no','requisID'),(33,'act_boss_cabinet_strong_1288470746','+ 加/断电',NULL,NULL,'act_boss_cabinet_strong_facility_531523240','cabinetName','cabinetName'),(34,'act_boss_cabinet_weak_1619761718','配线架',NULL,NULL,'act_boss_cabinet_weak_facility_1704016905','cabinetName','cabinetName'),(36,'act_boss_cabinet_weak_facility_1704016905','+ 跳线记录',NULL,NULL,'act_boss_SDH_906947720','deviceName','odfName');
/*!40000 ALTER TABLE `nanx_activity_a2a_btns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_activity_batch_btns`
--

DROP TABLE IF EXISTS `nanx_activity_batch_btns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_activity_batch_btns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_code` varchar(255) DEFAULT NULL,
  `btn_name` varchar(255) DEFAULT NULL,
  `op_field` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `activity_code` (`activity_code`,`op_field`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_batch_btns`
--

LOCK TABLES `nanx_activity_batch_btns` WRITE;
/*!40000 ALTER TABLE `nanx_activity_batch_btns` DISABLE KEYS */;
/*!40000 ALTER TABLE `nanx_activity_batch_btns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_activity_biz_layout`
--

DROP TABLE IF EXISTS `nanx_activity_biz_layout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_activity_biz_layout` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_code` char(255) DEFAULT NULL,
  `raw_table` char(100) NOT NULL DEFAULT '',
  `row` int(11) NOT NULL DEFAULT '0',
  `field_list` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_biz_layout`
--

LOCK TABLES `nanx_activity_biz_layout` WRITE;
/*!40000 ALTER TABLE `nanx_activity_biz_layout` DISABLE KEYS */;
INSERT INTO `nanx_activity_biz_layout` VALUES (2,'cab_selector','boss_cab_selector',0,'idcid,building,floor'),(3,'cab_selector','boss_cab_selector',1,'room,cabinet,roomsize');
/*!40000 ALTER TABLE `nanx_activity_biz_layout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_activity_curd_cfg`
--

DROP TABLE IF EXISTS `nanx_activity_curd_cfg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_activity_curd_cfg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_code` char(255) DEFAULT NULL,
  `fn_add` char(1) DEFAULT NULL,
  `fn_update` char(1) NOT NULL DEFAULT '0',
  `fn_del` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `activity_code` (`activity_code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_curd_cfg`
--

LOCK TABLES `nanx_activity_curd_cfg` WRITE;
/*!40000 ALTER TABLE `nanx_activity_curd_cfg` DISABLE KEYS */;
INSERT INTO `nanx_activity_curd_cfg` VALUES (2,'act_boss_cabinet_facility_request_1360736191','0','0','0');
/*!40000 ALTER TABLE `nanx_activity_curd_cfg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_activity_field_public_display_cfg`
--

DROP TABLE IF EXISTS `nanx_activity_field_public_display_cfg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_activity_field_public_display_cfg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field_e` char(30) DEFAULT NULL,
  `field_c` varchar(255) DEFAULT NULL,
  `field_width` int(255) DEFAULT NULL,
  `label_width` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `base_table` (`field_e`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='活动UI的字段配置。';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_field_public_display_cfg`
--

LOCK TABLES `nanx_activity_field_public_display_cfg` WRITE;
/*!40000 ALTER TABLE `nanx_activity_field_public_display_cfg` DISABLE KEYS */;
INSERT INTO `nanx_activity_field_public_display_cfg` VALUES (1,'sex','性别',200,NULL),(2,'datatype','数据类型',300,NULL),(3,'length','长度',NULL,NULL),(4,'default_value','缺省值',NULL,NULL),(5,'primary_key','主键',NULL,NULL),(6,'not_null','非空',NULL,NULL),(7,'auto_increment','自动增长',NULL,NULL),(8,'comment','备注',NULL,NULL),(9,'unsigned','无符号',NULL,NULL),(10,'index','索引',NULL,NULL),(11,'columns','相关列',NULL,NULL),(12,'add_column','修改列',NULL,NULL),(13,'option','选项',NULL,NULL),(20,'key','配置项',NULL,NULL),(21,'value','值',NULL,NULL),(22,'tips','提示',NULL,NULL),(23,'can_delete','是否可删除',NULL,NULL),(111,'field_name','字段名',NULL,NULL),(112,'count(*)','汇总',NULL,NULL),(133,'field_e','英文字段名',NULL,NULL),(134,'field_c','中文字段名',NULL,NULL),(135,'field_width','字段长度',NULL,NULL),(136,'s_city','城市',300,400),(138,'guarantee_time_start','质保开始日期',NULL,NULL),(139,'guarantee_time_end','质保截至日期',NULL,NULL),(140,'install_time','安装日期',NULL,NULL),(141,'node_comu_status','网关通信状态',NULL,NULL),(142,'comu_status','门锁锁通信状态',NULL,NULL);
/*!40000 ALTER TABLE `nanx_activity_field_public_display_cfg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_activity_field_special_display_cfg`
--

DROP TABLE IF EXISTS `nanx_activity_field_special_display_cfg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_activity_field_special_display_cfg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_code` char(255) DEFAULT NULL,
  `base_table` char(100) NOT NULL DEFAULT '',
  `field_e` char(30) NOT NULL DEFAULT '',
  `label_width` int(255) DEFAULT NULL,
  `field_c` varchar(255) DEFAULT NULL,
  `field_width` int(11) DEFAULT NULL,
  `show_as_pic` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `activity_code` (`activity_code`,`base_table`,`field_e`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='活动UI的字段配置。';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_field_special_display_cfg`
--

LOCK TABLES `nanx_activity_field_special_display_cfg` WRITE;
/*!40000 ALTER TABLE `nanx_activity_field_special_display_cfg` DISABLE KEYS */;
INSERT INTO `nanx_activity_field_special_display_cfg` VALUES (77,'ref_activity','boss_Requisition','IDC',NULL,NULL,200,0),(78,'ref_activity','boss_stu','name',NULL,'学生姓名',NULL,0),(79,'ref_activity','boss_SDH','userName',NULL,'公司名称',NULL,0);
/*!40000 ALTER TABLE `nanx_activity_field_special_display_cfg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_activity_forbidden_field`
--

DROP TABLE IF EXISTS `nanx_activity_forbidden_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_activity_forbidden_field` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_code` char(255) DEFAULT NULL,
  `field` char(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `activity_code` (`activity_code`,`field`)
) ENGINE=MyISAM AUTO_INCREMENT=293 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_forbidden_field`
--

LOCK TABLES `nanx_activity_forbidden_field` WRITE;
/*!40000 ALTER TABLE `nanx_activity_forbidden_field` DISABLE KEYS */;
INSERT INTO `nanx_activity_forbidden_field` VALUES (191,'employee_mnt','phoneNumber'),(292,'bpm_debug','money');
/*!40000 ALTER TABLE `nanx_activity_forbidden_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_activity_hooks`
--

DROP TABLE IF EXISTS `nanx_activity_hooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_activity_hooks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(100) DEFAULT NULL,
  `hook_type` char(11) DEFAULT NULL COMMENT 'check or data,check 返回tur/false,data执行数据操作',
  `activity_code` char(255) NOT NULL COMMENT '活动代码code',
  `extra_ci_model` char(100) DEFAULT NULL,
  `model_method` char(100) DEFAULT NULL,
  `hook_when` char(11) DEFAULT NULL COMMENT 'before or after',
  `hook_event` char(11) DEFAULT NULL,
  `memo` char(250) DEFAULT NULL,
  `execute_order` int(11) DEFAULT NULL COMMENT '执行顺序',
  PRIMARY KEY (`id`),
  UNIQUE KEY `hook_ind` (`hook_type`,`hook_when`,`hook_event`,`activity_code`,`extra_ci_model`,`model_method`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='活动注册表格';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_hooks`
--

LOCK TABLES `nanx_activity_hooks` WRITE;
/*!40000 ALTER TABLE `nanx_activity_hooks` DISABLE KEYS */;
INSERT INTO `nanx_activity_hooks` VALUES (2,'vvv','data','act_parkos_worker_2119335872','minventory','check_if_can_input_log','before','delete','memo',NULL);
/*!40000 ALTER TABLE `nanx_activity_hooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_activity_id_order`
--

DROP TABLE IF EXISTS `nanx_activity_id_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_activity_id_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_code` char(255) NOT NULL DEFAULT '' COMMENT '活动代码code',
  `id_order` char(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `activity_code` (`activity_code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='活动注册表格';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_id_order`
--

LOCK TABLES `nanx_activity_id_order` WRITE;
/*!40000 ALTER TABLE `nanx_activity_id_order` DISABLE KEYS */;
INSERT INTO `nanx_activity_id_order` VALUES (4,'act_parkos_rfid_log_1982031443','desc');
/*!40000 ALTER TABLE `nanx_activity_id_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_activity_js_btns`
--

DROP TABLE IF EXISTS `nanx_activity_js_btns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_activity_js_btns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_code` char(255) NOT NULL DEFAULT '',
  `jsfile` char(40) DEFAULT NULL,
  `btn_name` char(30) DEFAULT NULL,
  `function_name` char(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_js_btns`
--

LOCK TABLES `nanx_activity_js_btns` WRITE;
/*!40000 ALTER TABLE `nanx_activity_js_btns` DISABLE KEYS */;
/*!40000 ALTER TABLE `nanx_activity_js_btns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_activity_nofity`
--

DROP TABLE IF EXISTS `nanx_activity_nofity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_activity_nofity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_code` char(255) NOT NULL DEFAULT '' COMMENT '活动代码code',
  `action` char(11) NOT NULL DEFAULT '',
  `receiver_role_list` char(255) DEFAULT NULL,
  `tpl` char(255) DEFAULT NULL,
  `rule_name` char(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `activity_code` (`activity_code`,`action`,`receiver_role_list`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='活动注册表格';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_nofity`
--

LOCK TABLES `nanx_activity_nofity` WRITE;
/*!40000 ALTER TABLE `nanx_activity_nofity` DISABLE KEYS */;
INSERT INTO `nanx_activity_nofity` VALUES (4,'act_parkos_worker_2119335872','add','admin',NULL,'vddd'),(5,'act_parkos_worker_2119335872','add','sales',NULL,'vddd'),(6,'act_parkos_worker_2119335872','update','admin',NULL,'vddd'),(7,'act_parkos_worker_2119335872','update','sales',NULL,'vddd'),(8,'act_parkos_worker_2119335872','delete','admin',NULL,'vddd'),(9,'act_parkos_worker_2119335872','delete','sales',NULL,'vddd');
/*!40000 ALTER TABLE `nanx_activity_nofity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_biz_column_dropdown_codetable_cfg`
--

DROP TABLE IF EXISTS `nanx_biz_column_dropdown_codetable_cfg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_biz_column_dropdown_codetable_cfg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base_table` char(100) NOT NULL DEFAULT '',
  `field_e` char(30) NOT NULL DEFAULT '',
  `category` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_biz_column_dropdown_codetable_cfg`
--

LOCK TABLES `nanx_biz_column_dropdown_codetable_cfg` WRITE;
/*!40000 ALTER TABLE `nanx_biz_column_dropdown_codetable_cfg` DISABLE KEYS */;
/*!40000 ALTER TABLE `nanx_biz_column_dropdown_codetable_cfg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_biz_column_editor_cfg`
--

DROP TABLE IF EXISTS `nanx_biz_column_editor_cfg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_biz_column_editor_cfg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_code` char(250) DEFAULT NULL,
  `base_table` char(100) NOT NULL DEFAULT '',
  `field_e` char(30) NOT NULL DEFAULT '',
  `is_produce_col` tinyint(1) NOT NULL DEFAULT '0',
  `need_img_selector` tinyint(1) DEFAULT '0',
  `edit_as_html` tinyint(1) NOT NULL DEFAULT '0',
  `need_upload` tinyint(1) DEFAULT '0',
  `default_v` char(100) DEFAULT NULL,
  `readonly` int(1) DEFAULT '0',
  `cal_string` char(200) DEFAULT NULL,
  `use_random_pic_name` int(1) DEFAULT NULL,
  `categorydir` char(40) DEFAULT NULL,
  `path_col` char(40) DEFAULT NULL,
  `subdir_by_col` char(40) DEFAULT NULL,
  `editor_plug_name` char(100) DEFAULT NULL COMMENT '插件名称用于编辑时候',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_biz_column_editor_cfg`
--

LOCK TABLES `nanx_biz_column_editor_cfg` WRITE;
/*!40000 ALTER TABLE `nanx_biz_column_editor_cfg` DISABLE KEYS */;
INSERT INTO `nanx_biz_column_editor_cfg` VALUES (7,'ref_activity','boss_Cabinet','cabineType',0,0,0,0,'标准机柜',0,NULL,NULL,NULL,NULL,NULL,NULL),(8,'ref_activity','boss_Cabinet','startTime',0,0,0,0,'datetime',0,NULL,NULL,NULL,NULL,NULL,NULL),(9,'ref_activity','boss_class_rec','recorder',1,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL),(10,'ref_activity','boss_Cabinet_Strong','cabineType',0,0,0,0,'强电列头柜',0,NULL,NULL,NULL,NULL,NULL,NULL),(11,'ref_activity','boss_Cabinet_Weak','cabineType',0,0,0,0,'弱电列头柜',1,NULL,NULL,NULL,NULL,NULL,NULL),(12,'ref_activity','boss_order_test','recorder',1,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL),(13,'ref_activity','boss_cabinet_strong','evolutionary',0,0,0,0,'购入',0,NULL,NULL,NULL,NULL,NULL,NULL),(14,'ref_activity','boss_cabinet_strong','manufacturer',0,0,0,0,'有能',0,NULL,NULL,NULL,NULL,NULL,NULL),(15,'ref_activity','boss_cabinet_strong','supplier',0,0,0,0,'有能',0,NULL,NULL,NULL,NULL,NULL,NULL),(16,'ref_activity','boss_cabinet_facility_request','applyDate',0,0,0,0,'date',0,NULL,NULL,NULL,NULL,NULL,NULL),(17,'ref_activity','boss_cabinet_facility_request','migrationDate',0,0,0,0,'datetime',0,NULL,NULL,NULL,NULL,NULL,NULL),(18,'ref_activity','boss_cabinet_migration','deviceName',0,0,0,0,'DELL服务器',0,NULL,NULL,NULL,NULL,NULL,NULL),(19,'ref_activity','boss_cabinet_facility','shift_in_date',0,0,0,0,'datetime',0,NULL,NULL,NULL,NULL,NULL,NULL),(20,'ref_activity','boss_cabinet_strong_facility','switchTime',0,0,0,0,'datetime',0,NULL,NULL,NULL,NULL,NULL,NULL),(21,'ref_activity','boss_cabinet_weak_facility','shift_in_date',0,0,0,0,'date',0,NULL,NULL,NULL,NULL,NULL,NULL),(22,'ref_activity','boss_cabinet_ws_plan','applyDate',0,0,0,0,'date',0,NULL,NULL,NULL,NULL,NULL,NULL),(23,'ref_activity','boss_cabinet_ws_plan','operateDate',0,0,0,0,'date',0,NULL,NULL,NULL,NULL,NULL,NULL),(24,'ref_activity','boss_cabinet_weak_facility','deviceType',0,0,0,0,'光纤配线架',0,NULL,NULL,NULL,NULL,NULL,NULL),(25,'ref_activity','boss_cabinet_weak_facility','Layout_x',0,0,0,0,'25',0,NULL,NULL,NULL,NULL,NULL,NULL),(26,'ref_activity','boss_cabinet_weak_facility','Layout_y',0,0,0,0,'2',0,NULL,NULL,NULL,NULL,NULL,NULL),(31,NULL,'boss_order_test','groupId',0,0,0,0,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(32,'ref_activity','boss_cabinet_weak_facility','cabinetWeekId',0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,'CabinetSelector_weak'),(33,'ref_activity','boss_cabinet_strong_facility','cabinetId',0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,'CabinetSelector_strong'),(34,'ref_activity','boss_cabinet_strong_facility','ref_cabinetId',0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,'CabinetSelector_device');
/*!40000 ALTER TABLE `nanx_biz_column_editor_cfg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_biz_column_follow_cfg`
--

DROP TABLE IF EXISTS `nanx_biz_column_follow_cfg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_biz_column_follow_cfg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base_table` char(100) NOT NULL DEFAULT '',
  `field_e` char(30) NOT NULL DEFAULT '',
  `combo_table` char(100) DEFAULT NULL,
  `combo_table_value_field` char(100) DEFAULT NULL,
  `base_table_follow_field` char(100) DEFAULT NULL,
  `combo_table_follow_field` varchar(255) DEFAULT NULL,
  `group_id` char(30) DEFAULT NULL,
  `level` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_biz_column_follow_cfg`
--

LOCK TABLES `nanx_biz_column_follow_cfg` WRITE;
/*!40000 ALTER TABLE `nanx_biz_column_follow_cfg` DISABLE KEYS */;
INSERT INTO `nanx_biz_column_follow_cfg` VALUES (4,'boss_class_rec','stu_id','boss_stu',NULL,'mob','mobile','iB3papVVOS',1);
/*!40000 ALTER TABLE `nanx_biz_column_follow_cfg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_biz_column_trigger_group`
--

DROP TABLE IF EXISTS `nanx_biz_column_trigger_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_biz_column_trigger_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base_table` char(100) NOT NULL DEFAULT '',
  `field_e` char(30) NOT NULL DEFAULT '',
  `combo_table` char(100) DEFAULT NULL,
  `codetable_category_value` char(100) DEFAULT NULL,
  `list_field` char(30) DEFAULT NULL,
  `value_field` char(30) DEFAULT NULL,
  `filter_field` varchar(255) DEFAULT NULL,
  `group_id` char(30) DEFAULT NULL,
  `group_name` char(100) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `group_type` char(7) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=238 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_biz_column_trigger_group`
--

LOCK TABLES `nanx_biz_column_trigger_group` WRITE;
/*!40000 ALTER TABLE `nanx_biz_column_trigger_group` DISABLE KEYS */;
INSERT INTO `nanx_biz_column_trigger_group` VALUES (23,'parkos_company_fee_log','company_id','parkos_company',NULL,'name','id',NULL,'aZ3e0PfP','aZ3e0PfP',1,'nogroup'),(24,'parkos_company_location','comnapyId','parkos_company',NULL,'companyName','companyId',NULL,'Ip5A1Sya','Ip5A1Sya',1,'nogroup'),(25,'parkos_department','companyId','parkos_company',NULL,'companyName','companyId',NULL,'wbLHFaSk','wbLHFaSk',1,'nogroup'),(28,'parkos_employe','auditStatus','nanx_code_table','autit_status','display_text','value',NULL,'SyDGWcHX','SyDGWcHX',1,'nogroup'),(30,'parkos_employe','gender','nanx_code_table','gender','display_text','value',NULL,'SyDGWcH1','SyDGWcH1',1,'nogroup'),(31,'parkos_employe','state','nanx_code_table','emp_status','display_text','value',NULL,'SyDGWcH2','SyDGWcH2',1,'nogroup'),(32,'parkos_employe','userType','nanx_code_table','emp_type','display_text','value',NULL,'SyDGWcH3','SyDGWcH3',1,'nogroup'),(38,'parkos_employe','employer_companyId','parkos_company',NULL,'companyName','companyId',NULL,'5HvLTVOb','5HvLTVOb',1,'nogroup'),(64,'parkos_worker','prov','parkos_prov_list',NULL,'provname','provid',NULL,'联动组','联动组',1,'isgroup'),(69,'boss_Building','IDCid','boss_IDC',NULL,'idcName','id',NULL,'联动组','联动组',1,'isgroup'),(72,'boss_student','name','boss_IDC',NULL,'idcName','id',NULL,'联动组','联动组',1,'isgroup'),(75,'boss_student','xingbie','nanx_code_table','gender','display_text','value',NULL,'XkxsoTqT','XkxsoTqT',1,'nogroup'),(79,'boss_Room','IDCID','boss_IDC',NULL,'idcName','id',NULL,'联动组','联动组',1,'isgroup'),(80,'boss_Room','buildID','boss_Building',NULL,'buildName','id','IDCid','联动组','联动组',2,'isgroup'),(81,'boss_Room','floorID','boss_Floor',NULL,'floorName','id','buildID','联动组','联动组',3,'isgroup'),(85,'boss_Power','roomID','boss_Room',NULL,'roomName','id',NULL,'联动组','联动组',1,'isgroup'),(96,'boss_Subscriber','subType','nanx_code_table','biz_type','display_text','value',NULL,'E4toMMS4','E4toMMS4',1,'nogroup'),(97,'boss_Subscriber','useType','nanx_code_table','cust_type','display_text','value',NULL,'zlHyqMkq','zlHyqMkq',1,'nogroup'),(98,'boss_Floor','idcID','boss_IDC',NULL,'idcName','id',NULL,'联动组','联动组',1,'isgroup'),(99,'boss_Floor','buildID','boss_Building',NULL,'buildName','id','IDCid','联动组','联动组',2,'isgroup'),(101,'boss_Room','roomType','nanx_code_table','hostroom_type','display_text','value',NULL,'iACukLGn','iACukLGn',1,'nogroup'),(102,'boss_Room','ISPLine','nanx_code_table','carrier_type','display_text','value',NULL,'7DEFODlm','7DEFODlm',1,'nogroup'),(103,'boss_Customer','subType','nanx_code_table','biz_type','display_text','value',NULL,'5grgzTQa','5grgzTQa',1,'nogroup'),(104,'boss_Customer','useType','nanx_code_table','cust_type','display_text','value',NULL,'9LgMhuRh','9LgMhuRh',1,'nogroup'),(105,'boss_Requisition','subID','boss_Customer',NULL,'subName','id',NULL,'联动组','联动组',1,'isgroup'),(106,'boss_Requisition','IDC','boss_IDC',NULL,'idcName','id',NULL,'联动组','联动组',1,'isgroup'),(107,'boss_Requisition','business','nanx_code_table','migration_business','display_text','value',NULL,'bHgdCoP4','bHgdCoP4',1,'nogroup'),(111,'boss_Cabinet','powered','nanx_code_table','charging_status','display_text','value',NULL,'cWRJvB3E','cWRJvB3E',1,'nogroup'),(112,'boss_Cabinet','leaseState','nanx_code_table','lease_state','display_text','value',NULL,'yT2rgnC4','yT2rgnC4',1,'nogroup'),(113,'boss_Sub_pact','cabID','boss_Cabinet',NULL,'cabinetName','id',NULL,'联动组','联动组',1,'isgroup'),(118,'boss_migration','shift_in_room','boss_Room',NULL,'roomName','id',NULL,'shift_in_room','shift_in_room',1,'isgroup'),(119,'boss_migration','shift_in_cabinet','boss_Cabinet',NULL,'cabinetName','id','roomID','shift_in_room','shift_in_room',2,'isgroup'),(122,'boss_migration','shift_out_room','boss_viwe_room',NULL,'roomName','id',NULL,'shift_out_room','shift_out_room',1,'isgroup'),(123,'boss_migration','shift_out_cabinet','boss_viwe_Cabinet',NULL,'cabinetName','id','roomID','shift_out_room','shift_out_room',2,'isgroup'),(124,'boss_Power','powerType','nanx_code_table','Cabinet_type','display_text','value',NULL,'oLeaaJbw','oLeaaJbw',1,'nogroup'),(125,'boss_Facility','deviceType','nanx_code_table','device_type','display_text','value',NULL,'T6IoF8hn','T6IoF8hn',1,'nogroup'),(129,'boss_Facility','requisID','boss_Requisition',NULL,'apply_no','id',NULL,'申请单','申请单',1,'isgroup'),(130,'boss_Facility','cabinetID','boss_Cabinet',NULL,'cabinetName','id',NULL,'机柜','机柜',1,'isgroup'),(133,'boss_viwe_StrongCabinet','roomID','boss_Room',NULL,'roomName','roomID',NULL,'选择机房','选择机房',1,'isgroup'),(134,'boss_viwe_StrongCabinet','roomID','boss_Room',NULL,'roomID','id','roomName','选择机房','选择机房',2,'isgroup'),(166,'boss_class_rec','stu_id','boss_stu',NULL,'name','id',NULL,'iB3papVVOS','联动组',1,'isgroup'),(175,'boss_IDC_building','IDCid','boss_IDC',NULL,'idcName','id',NULL,'P52XscYuy1','所属IDC',1,'isgroup'),(178,'boss_IDC_building_floor','idcID','boss_IDC',NULL,'idcName','id',NULL,'JpuOJ56Jkq','IDC楼宇',1,'isgroup'),(179,'boss_IDC_building_floor','buildID','boss_IDC_building',NULL,'buildName','id','IDCid','JpuOJ56Jkq','IDC楼宇',2,'isgroup'),(183,'boss_IDC_room','IDCID','boss_IDC',NULL,'idcName','id',NULL,'a5q2d14K17','IDC楼层',1,'isgroup'),(184,'boss_IDC_room','buildID','boss_IDC_building',NULL,'buildName','id','IDCid','a5q2d14K17','IDC楼层',2,'isgroup'),(185,'boss_IDC_room','floorID','boss_IDC_building_floor',NULL,'floorName','id','buildID','a5q2d14K17','IDC楼层',3,'isgroup'),(186,'boss_IDC_room','roomType','nanx_code_table','hostroom_type','display_text','value',NULL,'kL6LTHwr',NULL,1,'nogroup'),(187,'boss_IDC_room','ISPLine','nanx_code_table','carrier_type','display_text','value',NULL,'vVk7ClqT',NULL,1,'nogroup'),(189,'boss_cabinet_strong','idcID','boss_IDC',NULL,'idcName','id',NULL,'zAcjeVo2ee','定位级联',1,'isgroup'),(190,'boss_cabinet_strong','buildingID','boss_IDC_building',NULL,'buildName','id','IDCid','zAcjeVo2ee','定位级联',2,'isgroup'),(191,'boss_cabinet_strong','floorID','boss_IDC_building_floor',NULL,'floorName','id','buildID','zAcjeVo2ee','定位级联',3,'isgroup'),(192,'boss_cabinet_strong','roomID','boss_IDC_room',NULL,'roomName','id','floorID','zAcjeVo2ee','定位级联',4,'isgroup'),(193,'boss_cabinet_weak','idcID','boss_IDC',NULL,'idcName','id',NULL,'RboHoGP3mm','强电柜级联',1,'isgroup'),(194,'boss_cabinet_weak','buildingID','boss_IDC_building',NULL,'buildName','id','IDCid','RboHoGP3mm','强电柜级联',2,'isgroup'),(195,'boss_cabinet_weak','floorID','boss_IDC_building_floor',NULL,'floorName','id','buildID','RboHoGP3mm','强电柜级联',3,'isgroup'),(196,'boss_cabinet_weak','roomID','boss_IDC_room',NULL,'roomName','id','floorID','RboHoGP3mm','强电柜级联',4,'isgroup'),(197,'boss_cabinet_weak','strongID','boss_cabinet_strong',NULL,'cabinetName','id','roomID','RboHoGP3mm','强电柜级联',5,'isgroup'),(198,'boss_cabinet','idcID','boss_IDC',NULL,'idcName','id',NULL,'Srg4NSk6B3','机柜定位级联',1,'isgroup'),(199,'boss_cabinet','buildingID','boss_IDC_building',NULL,'buildName','id','IDCid','Srg4NSk6B3','机柜定位级联',2,'isgroup'),(200,'boss_cabinet','floorID','boss_IDC_building_floor',NULL,'floorName','id','buildID','Srg4NSk6B3','机柜定位级联',3,'isgroup'),(201,'boss_cabinet','roomID','boss_IDC_room',NULL,'roomName','id','floorID','Srg4NSk6B3','机柜定位级联',4,'isgroup'),(202,'boss_cabinet','strongID','boss_cabinet_strong',NULL,'cabinetName','id','roomID','Srg4NSk6B3','机柜定位级联',5,'isgroup'),(203,'boss_cabinet','weakID','boss_cabinet_weak',NULL,'cabinetName','id','roomID','Srg4NSk6B3','机柜定位级联',6,'isgroup'),(204,'boss_cabinet_facility_request','business','nanx_code_table','migration_business','display_text','value',NULL,'xxuLhrOI',NULL,1,'nogroup'),(205,'boss_cabinet_facility_request','idcID','boss_IDC',NULL,'idcName','id',NULL,'bnzPfytbeE','IDC',1,'isgroup'),(206,'boss_cabinet_facility_request','subID','boss_customer',NULL,'subName','id',NULL,'a7uQUQSl0T','公司',1,'isgroup'),(207,'boss_cabinet_migration','deviceType','nanx_code_table','device_type','display_text','value',NULL,'xOpXv7pG',NULL,1,'nogroup'),(208,'boss_cabinet_facility','deviceType','nanx_code_table','device_type','display_text','value',NULL,'63BWOe3D',NULL,1,'nogroup'),(209,'boss_cabinet_facility','operatingState','nanx_code_table','up_type','display_text','value',NULL,'a7U6lzZQ',NULL,1,'nogroup'),(210,'boss_cabinet_strong_facility','powered','nanx_code_table','powered','display_text','value',NULL,'BTQlU7a5',NULL,1,'nogroup'),(211,'boss_cabinet_strong_facility','upState','nanx_code_table','whether','display_text','value',NULL,'GMvk9Zcn',NULL,1,'nogroup'),(212,'boss_cabinet_weak_facility','operatingState','nanx_code_table','up_type','display_text','value',NULL,'zO1ll19m',NULL,1,'nogroup'),(213,'boss_cabinet_ws_plan','idcID','boss_IDC',NULL,'idcName','id',NULL,'mYBQVU7vMf','IDC',1,'isgroup'),(214,'boss_cabinet_ws_plan','subID','boss_customer',NULL,'subName','id',NULL,'yMVfCov4SU','用户',1,'isgroup'),(217,'boss_cabinet_weak_facility','cabinetID','boss_cabinet_weak',NULL,'cabinetName','id',NULL,'jJ6FlIsHXO','所在弱电柜',1,'isgroup'),(224,'boss_cabinet_migration','shift_in_room','boss_IDC_room',NULL,'roomName','id',NULL,'cq80IKPqIw','迁入机房',1,'isgroup'),(225,'boss_cabinet_migration','shift_in_cabinet','boss_cabinet',NULL,'cabinetName','id','roomID','cq80IKPqIw','迁入机房',2,'isgroup'),(226,'boss_SDH','userName','boss_customer',NULL,'subName','id',NULL,'fqMaqWtWlY','公司',1,'isgroup'),(227,'boss_order_test','custid','boss_customer',NULL,'subName','id',NULL,'EDHXsaUTA2','联动表格下拉配置',1,'isgroup'),(233,'boss_cab_selector','idcid','boss_IDC',NULL,'idcName','id',NULL,'0c5axzEriN','联动表格下拉配置',1,'isgroup'),(234,'boss_cab_selector','building','boss_IDC_building',NULL,'buildName','id','IDCid','0c5axzEriN','联动表格下拉配置',2,'isgroup'),(235,'boss_cab_selector','floor','boss_IDC_building_floor',NULL,'floorName','id','buildID','0c5axzEriN','联动表格下拉配置',3,'isgroup'),(236,'boss_cab_selector','room','boss_IDC_room',NULL,'roomName','id','floorID','0c5axzEriN','联动表格下拉配置',4,'isgroup'),(237,'boss_cab_selector','cabinet','boss_cabinet',NULL,'cabinetName','id','roomID','0c5axzEriN','联动表格下拉配置',5,'isgroup');
/*!40000 ALTER TABLE `nanx_biz_column_trigger_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_biz_column_trigger_group_copy`
--

DROP TABLE IF EXISTS `nanx_biz_column_trigger_group_copy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_biz_column_trigger_group_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field_c` char(30) NOT NULL DEFAULT '',
  `combo_table` char(100) DEFAULT NULL,
  `list_field` char(30) DEFAULT NULL,
  `value_field` char(30) DEFAULT NULL,
  `filter_field` varchar(255) DEFAULT NULL,
  `group_id` char(30) DEFAULT NULL,
  `group_name` char(100) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `group_type` char(7) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=238 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_biz_column_trigger_group_copy`
--

LOCK TABLES `nanx_biz_column_trigger_group_copy` WRITE;
/*!40000 ALTER TABLE `nanx_biz_column_trigger_group_copy` DISABLE KEYS */;
INSERT INTO `nanx_biz_column_trigger_group_copy` VALUES (233,'idcid','boss_IDC','idcName','id',NULL,'cabinet_selector','机柜下拉选择器',1,'isgroup'),(234,'building','boss_IDC_building','buildName','id','IDCid','cabinet_selector','机柜下拉选择器',2,'isgroup'),(235,'floor','boss_IDC_building_floor','floorName','id','buildID','cabinet_selector','机柜下拉选择器',3,'isgroup'),(236,'room','boss_IDC_room','roomName','id','floorID','cabinet_selector','机柜下拉选择器',4,'isgroup'),(237,'cabinet','boss_cabinet','cabinetName','id','roomID','cabinet_selector','机柜下拉选择器',5,'isgroup');
/*!40000 ALTER TABLE `nanx_biz_column_trigger_group_copy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_biz_tables`
--

DROP TABLE IF EXISTS `nanx_biz_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_biz_tables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `table_name` char(100) DEFAULT NULL,
  `table_screen_name` char(30) DEFAULT NULL,
  `memo` char(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `table_screen_name` (`table_screen_name`),
  UNIQUE KEY `table_name` (`table_name`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_biz_tables`
--

LOCK TABLES `nanx_biz_tables` WRITE;
/*!40000 ALTER TABLE `nanx_biz_tables` DISABLE KEYS */;
INSERT INTO `nanx_biz_tables` VALUES (95,'boss_order_test','工作流测试',NULL),(99,'boss_IDC','IDC',NULL),(100,'boss_IDC_building','IDC楼宇',NULL),(102,'boss_IDC_building_floor','楼宇楼层',NULL),(103,'boss_IDC_room','楼层房间',NULL),(104,'boss_cabinet','机柜',NULL),(105,'boss_cabinet_facility','机柜设备记录',NULL),(106,'boss_cabinet_facility_request','机柜上下架申请单',NULL),(107,'boss_cabinet_migration','机柜上下架申请设备',NULL),(108,'boss_cabinet_strong','强电列头柜',NULL),(109,'boss_cabinet_strong_facility','强电柜空开设备',NULL),(110,'boss_cabinet_weak','弱电列头柜',NULL),(111,'boss_cabinet_weak_facility','弱电列头柜配线架记录',NULL),(113,'boss_customer','用户',NULL),(114,'boss_SDH','SDH',NULL),(115,'boss_cabinet_ws_plan','机房规划申请单',NULL),(116,'boss_cabinet_ws_plan-detailing','机房规划申请明细',NULL),(117,'boss_cab_selector','机柜选择器',NULL);
/*!40000 ALTER TABLE `nanx_biz_tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_code_table`
--

DROP TABLE IF EXISTS `nanx_code_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_code_table` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category` char(100) DEFAULT NULL,
  `display_text` char(100) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_code_table`
--

LOCK TABLES `nanx_code_table` WRITE;
/*!40000 ALTER TABLE `nanx_code_table` DISABLE KEYS */;
INSERT INTO `nanx_code_table` VALUES (1,'gender','男',1),(2,'gender','女',2),(5,'autit_status','待审核',0),(6,'autit_status','通过',1),(7,'autit_status','未通过',2),(8,'emp_status','冻结',0),(9,'emp_status','正常',1),(10,'emp_type','内部员工',0),(11,'emp_type','外协人员',1),(12,'emp_type','物业服务人员',2),(13,'emp_type','施工人员',3),(15,'biz_type','散户',1),(16,'biz_type','大客户',2),(17,'cust_type','企业客户',1),(18,'cust_type','合作伙伴',2),(19,'cust_type','自用',3),(20,'hostroom_type','模块',1),(21,'hostroom_type','设备间',2),(22,'carrier_type','电信',1),(23,'carrier_type','联通',2),(24,'carrier_type','移动',3),(25,'migration_business','迁入',1),(26,'migration_business','迁出',2),(27,'migration_business','迁移',3),(28,'Cabinet_type','标准机柜',1),(29,'charging_status','已加电',1),(30,'charging_status','未加电',2),(31,'lease_state','整包',1),(32,'lease_state','散户',2),(33,'Cabinet_type','强电列头柜',2),(34,'device_type','服务器',1),(35,'device_type','网络设备',2),(36,'Cabinet_type','弱电列头柜',3),(37,'powered','已加电',1),(38,'powered','未加电',2),(39,'up_type','上架',1),(40,'up_type','下架',2),(41,'whether','是',1),(42,'whether','否',2);
/*!40000 ALTER TABLE `nanx_code_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_country`
--

DROP TABLE IF EXISTS `nanx_country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_country` (
  `pid` mediumint(9) NOT NULL AUTO_INCREMENT,
  `id` char(30) DEFAULT NULL,
  `lang_txt` char(100) DEFAULT NULL,
  `active` char(1) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_country`
--

LOCK TABLES `nanx_country` WRITE;
/*!40000 ALTER TABLE `nanx_country` DISABLE KEYS */;
INSERT INTO `nanx_country` VALUES (1,'af','Afrikaans',NULL),(2,'sq','Albanian',NULL),(3,'ar-dz','Arabic (Algeria)',NULL),(4,'ar-bh','Arabic (Bahrain)',NULL),(5,'ar-eg','Arabic (Egypt)',NULL),(6,'ar-iq','Arabic (Iraq)',NULL),(7,'ar-jo','Arabic (Jordan)',NULL),(8,'ar-kw','Arabic (Kuwait)',NULL),(9,'ar-lb','Arabic (Lebanon)',NULL),(10,'ar-ly','Arabic (libya)',NULL),(11,'ar-ma','Arabic (Morocco)',NULL),(12,'ar-om','Arabic (Oman)',NULL),(13,'ar-qa','Arabic (Qatar)',NULL),(14,'ar-sa','Arabic (Saudi Arabia)',NULL),(15,'ar-sy','Arabic (Syria)',NULL),(16,'ar-tn','Arabic (Tunisia)',NULL),(17,'ar-ae','Arabic (U.A.E.)',NULL),(18,'ar-ye','Arabic (Yemen)',NULL),(19,'ar','Arabic',NULL),(20,'hy','Armenian',NULL),(21,'as','Assamese',NULL),(22,'az','Azeri',NULL),(23,'eu','Basque',NULL),(24,'be','Belarusian',NULL),(25,'bn','Bengali',NULL),(26,'bg','Bulgarian',NULL),(27,'ca','Catalan',NULL),(28,'zh-cn','中文','y'),(29,'zh-hk','Chinese (Hong Kong)','y'),(30,'zh-mo','Chinese (Macau)','n'),(31,'zh-sg','Chinese (Singapore)','n'),(32,'zh-tw','Chinese (Taiwan)','y'),(34,'hr','Croatian',NULL),(35,'cs','Czech',NULL),(36,'da','Danish',NULL),(37,'div','Divehi',NULL),(38,'nl-be','Dutch (Belgium)',NULL),(39,'nl','Dutch (Netherlands)',NULL),(40,'en-au','English (Australia)',NULL),(41,'en-bz','English (Belize)',NULL),(42,'en-ca','English (Canada)',NULL),(43,'en-ie','English (Ireland)',NULL),(44,'en-jm','English (Jamaica)',NULL),(45,'en-nz','English (New Zealand)',NULL),(46,'en-ph','English (Philippines)',NULL),(47,'en-za','English (South Africa)',NULL),(48,'en-tt','English (Trinidad)',NULL),(49,'en-gb','English (United Kingdom)',NULL),(50,'en-us','English (United States)',NULL),(51,'en-zw','English (Zimbabwe)',NULL),(52,'en','English','y'),(53,'us','English (United States)',NULL),(54,'et','Estonian',NULL),(55,'fo','Faeroese',NULL),(56,'fa','Farsi',NULL),(57,'fi','Finnish',NULL),(58,'fr-be','French (Belgium)',NULL),(59,'fr-ca','French (Canada)',NULL),(60,'fr-lu','French (Luxembourg)',NULL),(61,'fr-mc','French (Monaco)',NULL),(62,'fr-ch','French (Switzerland)',NULL),(63,'fr','French (France)','y'),(64,'mk','FYRO Macedonian',NULL),(65,'gd','Gaelic',NULL),(66,'ka','Georgian',NULL),(67,'de-at','German (Austria)',NULL),(68,'de-li','German (Liechtenstein)',NULL),(69,'de-lu','German (Luxembourg)',NULL),(70,'de-ch','German (Switzerland)',NULL),(71,'de','German (Germany)','y'),(72,'el','Greek',NULL),(73,'gu','Gujarati',NULL),(74,'he','Hebrew',NULL),(75,'hi','Hindi',NULL),(76,'hu','Hungarian','y'),(77,'is','Icelandic',NULL),(78,'id','Indonesian',NULL),(79,'it-ch','Italian (Switzerland)',NULL),(80,'it','Italian (Italy)','y'),(81,'ja','Japanese','y'),(82,'kn','Kannada',NULL),(83,'kk','Kazakh',NULL),(84,'kok','Konkani',NULL),(85,'ko','Korean','y'),(86,'kz','Kyrgyz',NULL),(87,'lv','Latvian',NULL),(88,'lt','Lithuanian',NULL),(89,'ms','Malay',NULL),(90,'ml','Malayalam',NULL),(91,'mt','Maltese',NULL),(92,'mr','Marathi',NULL),(93,'mn','Mongolian (Cyrillic)',NULL),(94,'ne','Nepali (India)',NULL),(95,'nb-no','Norwegian (Bokmal)',NULL),(96,'nn-no','Norwegian (Nynorsk)',NULL),(97,'no','Norwegian (Bokmal)',NULL),(98,'or','Oriya',NULL),(99,'pl','Polish','y'),(100,'pt-br','Portuguese (Brazil)',NULL),(101,'pt','Portuguese (Portugal)',NULL),(102,'pa','Punjabi',NULL),(103,'rm','Rhaeto-Romanic',NULL),(104,'ro-md','Romanian (Moldova)',NULL),(105,'ro','Romanian',NULL),(106,'ru-md','Russian (Moldova)',NULL),(107,'ru','Russian',NULL),(108,'sa','Sanskrit',NULL),(109,'sr','Serbian',NULL),(110,'sk','Slovak',NULL),(111,'ls','Slovenian',NULL),(112,'sb','Sorbian',NULL),(113,'es-ar','Spanish (Argentina)',NULL),(114,'es-bo','Spanish (Bolivia)',NULL),(115,'es-cl','Spanish (Chile)',NULL),(116,'es-co','Spanish (Colombia)',NULL),(117,'es-cr','Spanish (Costa Rica)',NULL),(118,'es-do','Spanish (Dominican Republic)',NULL),(119,'es-ec','Spanish (Ecuador)',NULL),(120,'es-sv','Spanish (El Salvador)',NULL),(121,'es-gt','Spanish (Guatemala)',NULL),(122,'es-hn','Spanish (Honduras)',NULL),(123,'es-mx','Spanish (Mexico)',NULL),(124,'es-ni','Spanish (Nicaragua)',NULL),(125,'es-pa','Spanish (Panama)',NULL),(126,'es-py','Spanish (Paraguay)',NULL),(127,'es-pe','Spanish (Peru)',NULL),(128,'es-pr','Spanish (Puerto Rico)',NULL),(129,'es-us','Spanish (United States)',NULL),(130,'es-uy','Spanish (Uruguay)',NULL),(131,'es-ve','Spanish (Venezuela)',NULL),(132,'es','Spanish (Traditional Sort)',NULL),(133,'sx','Sutu',NULL),(134,'sw','Swahili',NULL),(135,'sv-fi','Swedish (Finland)',NULL),(136,'sv','Swedish',NULL),(137,'syr','Syriac',NULL),(138,'ta','Tamil',NULL),(139,'tt','Tatar',NULL),(140,'te','Telugu',NULL),(141,'th','Thai',NULL),(142,'ts','Tsonga',NULL),(143,'tn','Tswana',NULL),(144,'tr','Turkish',NULL),(145,'uk','Ukrainian',NULL),(146,'ur','Urdu',NULL),(147,'uz','Uzbek',NULL),(148,'vi','Vietnamese',NULL),(149,'xh','Xhosa',NULL),(150,'yi','Yiddish',NULL),(151,'zu','Zulu',NULL);
/*!40000 ALTER TABLE `nanx_country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_lang`
--

DROP TABLE IF EXISTS `nanx_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_lang` (
  `pid` mediumint(9) NOT NULL AUTO_INCREMENT,
  `id` char(30) DEFAULT NULL,
  `lang_txt` char(100) DEFAULT NULL,
  `active` char(1) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=MyISAM AUTO_INCREMENT=152 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_lang`
--

LOCK TABLES `nanx_lang` WRITE;
/*!40000 ALTER TABLE `nanx_lang` DISABLE KEYS */;
INSERT INTO `nanx_lang` VALUES (1,'af','Afrikaans',NULL),(2,'sq','Albanian',NULL),(3,'ar-dz','Arabic (Algeria)',NULL),(4,'ar-bh','Arabic (Bahrain)',NULL),(5,'ar-eg','Arabic (Egypt)',NULL),(6,'ar-iq','Arabic (Iraq)',NULL),(7,'ar-jo','Arabic (Jordan)',NULL),(8,'ar-kw','Arabic (Kuwait)',NULL),(9,'ar-lb','Arabic (Lebanon)',NULL),(10,'ar-ly','Arabic (libya)',NULL),(11,'ar-ma','Arabic (Morocco)',NULL),(12,'ar-om','Arabic (Oman)',NULL),(13,'ar-qa','Arabic (Qatar)',NULL),(14,'ar-sa','Arabic (Saudi Arabia)',NULL),(15,'ar-sy','Arabic (Syria)',NULL),(16,'ar-tn','Arabic (Tunisia)',NULL),(17,'ar-ae','Arabic (U.A.E.)',NULL),(18,'ar-ye','Arabic (Yemen)',NULL),(19,'ar','Arabic',NULL),(20,'hy','Armenian',NULL),(21,'as','Assamese',NULL),(22,'az','Azeri',NULL),(23,'eu','Basque',NULL),(24,'be','Belarusian',NULL),(25,'bn','Bengali',NULL),(26,'bg','Bulgarian',NULL),(27,'ca','Catalan',NULL),(28,'zh-cn','中文','y'),(29,'zh-hk','Chinese (Hong Kong)','y'),(30,'zh-mo','Chinese (Macau)','n'),(31,'zh-sg','Chinese (Singapore)','n'),(32,'zh-tw','Chinese (Taiwan)','y'),(34,'hr','Croatian',NULL),(35,'cs','Czech',NULL),(36,'da','Danish',NULL),(37,'div','Divehi',NULL),(38,'nl-be','Dutch (Belgium)',NULL),(39,'nl','Dutch (Netherlands)',NULL),(40,'en-au','English (Australia)',NULL),(41,'en-bz','English (Belize)',NULL),(42,'en-ca','English (Canada)',NULL),(43,'en-ie','English (Ireland)',NULL),(44,'en-jm','English (Jamaica)',NULL),(45,'en-nz','English (New Zealand)',NULL),(46,'en-ph','English (Philippines)',NULL),(47,'en-za','English (South Africa)',NULL),(48,'en-tt','English (Trinidad)',NULL),(49,'en-gb','English (United Kingdom)',NULL),(50,'en-us','English (United States)',NULL),(51,'en-zw','English (Zimbabwe)',NULL),(52,'en','English','y'),(53,'us','English (United States)',NULL),(54,'et','Estonian',NULL),(55,'fo','Faeroese',NULL),(56,'fa','Farsi',NULL),(57,'fi','Finnish',NULL),(58,'fr-be','French (Belgium)',NULL),(59,'fr-ca','French (Canada)',NULL),(60,'fr-lu','French (Luxembourg)',NULL),(61,'fr-mc','French (Monaco)',NULL),(62,'fr-ch','French (Switzerland)',NULL),(63,'fr','French (France)','y'),(64,'mk','FYRO Macedonian',NULL),(65,'gd','Gaelic',NULL),(66,'ka','Georgian',NULL),(67,'de-at','German (Austria)',NULL),(68,'de-li','German (Liechtenstein)',NULL),(69,'de-lu','German (Luxembourg)',NULL),(70,'de-ch','German (Switzerland)',NULL),(71,'de','German (Germany)','y'),(72,'el','Greek',NULL),(73,'gu','Gujarati',NULL),(74,'he','Hebrew',NULL),(75,'hi','Hindi',NULL),(76,'hu','Hungarian','y'),(77,'is','Icelandic',NULL),(78,'id','Indonesian',NULL),(79,'it-ch','Italian (Switzerland)',NULL),(80,'it','Italian (Italy)','y'),(81,'ja','Japanese','y'),(82,'kn','Kannada',NULL),(83,'kk','Kazakh',NULL),(84,'kok','Konkani',NULL),(85,'ko','Korean','y'),(86,'kz','Kyrgyz',NULL),(87,'lv','Latvian',NULL),(88,'lt','Lithuanian',NULL),(89,'ms','Malay',NULL),(90,'ml','Malayalam',NULL),(91,'mt','Maltese',NULL),(92,'mr','Marathi',NULL),(93,'mn','Mongolian (Cyrillic)',NULL),(94,'ne','Nepali (India)',NULL),(95,'nb-no','Norwegian (Bokmal)',NULL),(96,'nn-no','Norwegian (Nynorsk)',NULL),(97,'no','Norwegian (Bokmal)',NULL),(98,'or','Oriya',NULL),(99,'pl','Polish','y'),(100,'pt-br','Portuguese (Brazil)',NULL),(101,'pt','Portuguese (Portugal)',NULL),(102,'pa','Punjabi',NULL),(103,'rm','Rhaeto-Romanic',NULL),(104,'ro-md','Romanian (Moldova)',NULL),(105,'ro','Romanian',NULL),(106,'ru-md','Russian (Moldova)',NULL),(107,'ru','Russian',NULL),(108,'sa','Sanskrit',NULL),(109,'sr','Serbian',NULL),(110,'sk','Slovak',NULL),(111,'ls','Slovenian',NULL),(112,'sb','Sorbian',NULL),(113,'es-ar','Spanish (Argentina)',NULL),(114,'es-bo','Spanish (Bolivia)',NULL),(115,'es-cl','Spanish (Chile)',NULL),(116,'es-co','Spanish (Colombia)',NULL),(117,'es-cr','Spanish (Costa Rica)',NULL),(118,'es-do','Spanish (Dominican Republic)',NULL),(119,'es-ec','Spanish (Ecuador)',NULL),(120,'es-sv','Spanish (El Salvador)',NULL),(121,'es-gt','Spanish (Guatemala)',NULL),(122,'es-hn','Spanish (Honduras)',NULL),(123,'es-mx','Spanish (Mexico)',NULL),(124,'es-ni','Spanish (Nicaragua)',NULL),(125,'es-pa','Spanish (Panama)',NULL),(126,'es-py','Spanish (Paraguay)',NULL),(127,'es-pe','Spanish (Peru)',NULL),(128,'es-pr','Spanish (Puerto Rico)',NULL),(129,'es-us','Spanish (United States)',NULL),(130,'es-uy','Spanish (Uruguay)',NULL),(131,'es-ve','Spanish (Venezuela)',NULL),(132,'es','Spanish (Traditional Sort)',NULL),(133,'sx','Sutu',NULL),(134,'sw','Swahili',NULL),(135,'sv-fi','Swedish (Finland)',NULL),(136,'sv','Swedish',NULL),(137,'syr','Syriac',NULL),(138,'ta','Tamil',NULL),(139,'tt','Tatar',NULL),(140,'te','Telugu',NULL),(141,'th','Thai',NULL),(142,'ts','Tsonga',NULL),(143,'tn','Tswana',NULL),(144,'tr','Turkish',NULL),(145,'uk','Ukrainian',NULL),(146,'ur','Urdu',NULL),(147,'uz','Uzbek',NULL),(148,'vi','Vietnamese',NULL),(149,'xh','Xhosa',NULL),(150,'yi','Yiddish',NULL),(151,'zu','Zulu',NULL);
/*!40000 ALTER TABLE `nanx_lang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_menu`
--

DROP TABLE IF EXISTS `nanx_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `activity_code` char(100) DEFAULT NULL,
  `parent` char(200) DEFAULT NULL,
  `grid_title` char(200) DEFAULT NULL,
  `activity_type` char(100) DEFAULT NULL,
  `role_code` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=377 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_menu`
--

LOCK TABLES `nanx_menu` WRITE;
/*!40000 ALTER TABLE `nanx_menu` DISABLE KEYS */;
INSERT INTO `nanx_menu` VALUES (373,'mgroup_wVzO9tgG','mgroup_root','菜单组','folder','sales'),(374,'employee_mnt','mgroup_wVzO9tgG','员工管理','table','sales'),(375,'dep_mnt','mgroup_wVzO9tgG','部门管理','table','sales'),(376,'company_mnt','mgroup_root','公司管理','table','sales');
/*!40000 ALTER TABLE `nanx_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_session_log`
--

DROP TABLE IF EXISTS `nanx_session_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_session_log` (
  `ts` datetime DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL,
  `action_cmd` char(20) DEFAULT NULL,
  `act_code` char(100) DEFAULT NULL,
  `table` char(100) DEFAULT NULL,
  `pids` varchar(255) DEFAULT NULL,
  `rawdata` text,
  `old_data` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_session_log`
--

LOCK TABLES `nanx_session_log` WRITE;
/*!40000 ALTER TABLE `nanx_session_log` DISABLE KEYS */;
INSERT INTO `nanx_session_log` VALUES (NULL,22,'管理员[admin]','add','act_cass_abcd2_292645911','cass_abcd2','','name:al,sex:male,age:11',NULL),(NULL,23,'管理员[admin]','delete','act_t_abcd_small_963597235','t_abcd_small','0','0','0'),(NULL,24,'管理员[admin]','delete','act_t_abcd_small_963597235','t_abcd_small','0','0','0'),(NULL,25,'管理员[admin]','delete','act_t_abcd_small_963597235','t_abcd_small','0:1','0','0:[id:1,name:al,sex:male,age:11]'),(NULL,26,'管理员[admin]','delete','act_t_abcd_small_963597235','t_abcd_small','0:2','0','0:[id:2,name:al,sex:male,age:11]'),(NULL,27,'管理员[admin]','update','act_t_abcd_small_963597235','t_abcd_small','','id:3,name:al,sex:male,age:88',''),(NULL,28,'管理员[admin]','update','act_t_abcd_small_963597235','t_abcd_small','','id:4,name:al,sex:male,age:3','id:4,name:al,sex:male,age:11'),(NULL,29,'管理员[admin]','update','act_t_abcd_small_963597235','t_abcd_small','','id:63,name:al,sex:male,age:899','id:63,name:al,sex:male,age:11'),(NULL,30,'管理员[admin]','delete','act_t_abcd_small_963597235','t_abcd_small','0:63','0','0:[id:63,name:al,sex:male,age:899]'),(NULL,31,'管理员[admin]','delete','act_t_abcd_small_963597235','t_abcd_small','0:64,1:62','0','0:[id:64,name:al,sex:male,age:11],1:[id:62,name:al,sex:male,age:11]'),(NULL,32,'管理员[admin]','update','act_t_abcd_small_963597235','t_abcd_small','','id:51,name:al,sex:male,age:900','id:51,name:al,sex:male,age:11'),(NULL,33,'管理员[admin]','update','act_t_abcd_small_963597235','t_abcd_small','','id:59,name:al,sex:male,age:11','id:59,name:al,sex:male,age:11'),(NULL,34,'管理员[admin]','update','act_t_abcd_small_963597235','t_abcd_small','','id:7,name:al,sex:male,age:89898','id:7,name:al,sex:male,age:11');
/*!40000 ALTER TABLE `nanx_session_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_shadow`
--

DROP TABLE IF EXISTS `nanx_shadow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_shadow` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '保留列,请勿删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_shadow`
--

LOCK TABLES `nanx_shadow` WRITE;
/*!40000 ALTER TABLE `nanx_shadow` DISABLE KEYS */;
/*!40000 ALTER TABLE `nanx_shadow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_sms`
--

DROP TABLE IF EXISTS `nanx_sms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_sms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` char(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `receiver` char(20) DEFAULT NULL,
  `msg` varchar(255) DEFAULT NULL,
  `sendtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_sms`
--

LOCK TABLES `nanx_sms` WRITE;
/*!40000 ALTER TABLE `nanx_sms` DISABLE KEYS */;
INSERT INTO `nanx_sms` VALUES (2,'系统通知','管理员:对活动:debug执行了\'添加记录\'操作','sales2','管理员:对活动:debug执行了\'添加记录\'操作','2018-04-07 12:28:57'),(4,'系统通知','管理员:对活动:debug执行了\'添加记录\'操作','sales2','管理员:对活动:debug执行了\'添加记录\'操作','2018-04-11 17:13:23'),(6,'系统通知','管理员:对活动:debug执行了\'修改记录\'操作','sales2','管理员:对活动:debug执行了\'修改记录\'操作','2018-04-11 17:13:33'),(8,'系统通知','管理员:对活动:debug执行了\'添加记录\'操作','sales2','管理员:对活动:debug执行了\'添加记录\'操作','2018-04-11 17:16:59'),(10,'系统通知','管理员:对活动:debug执行了\'修改记录\'操作','sales2','管理员:对活动:debug执行了\'修改记录\'操作','2018-04-11 17:17:08'),(12,'系统通知','管理员:对活动:debug执行了\'修改记录\'操作','sales2','管理员:对活动:debug执行了\'修改记录\'操作','2018-04-11 17:29:17'),(14,'系统通知','管理员:对活动:debug执行了\'修改记录\'操作','sales2','管理员:对活动:debug执行了\'修改记录\'操作','2018-04-11 17:29:27'),(16,'系统通知','管理员:对活动:debug执行了\'修改记录\'操作','sales2','管理员:对活动:debug执行了\'修改记录\'操作','2018-04-11 17:29:34'),(18,'系统通知','管理员:对活动:debug执行了\'修改记录\'操作','sales2','管理员:对活动:debug执行了\'修改记录\'操作','2018-04-11 17:31:45'),(20,'系统通知','管理员:对活动:debug执行了\'修改记录\'操作','sales2','管理员:对活动:debug执行了\'修改记录\'操作','2018-04-11 17:35:36'),(22,'系统通知','管理员:对活动:debug执行了\'添加记录\'操作','sales2','管理员:对活动:debug执行了\'添加记录\'操作','2018-04-12 12:02:20'),(24,'系统通知','管理员:对活动:debug执行了\'修改记录\'操作','sales2','管理员:对活动:debug执行了\'修改记录\'操作','2018-04-12 12:02:32'),(26,'系统通知','管理员:对活动:debug执行了\'修改记录\'操作','sales2','管理员:对活动:debug执行了\'修改记录\'操作','2018-04-12 13:17:09'),(28,'系统通知','管理员:对活动:debug执行了\'添加记录\'操作','sales2','管理员:对活动:debug执行了\'添加记录\'操作','2018-04-12 13:30:20'),(30,'系统通知','管理员:对活动:debug执行了\'添加记录\'操作','sales2','管理员:对活动:debug执行了\'添加记录\'操作','2018-04-12 17:41:24'),(32,'系统通知','管理员:对活动:debug执行了\'修改记录\'操作','sales2','管理员:对活动:debug执行了\'修改记录\'操作','2018-04-13 09:36:29');
/*!40000 ALTER TABLE `nanx_sms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_system_cfg`
--

DROP TABLE IF EXISTS `nanx_system_cfg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_system_cfg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `config_key` char(30) NOT NULL DEFAULT '',
  `config_value` char(100) NOT NULL DEFAULT '',
  `config_memo` varchar(255) DEFAULT '',
  `memo_of_config_item` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_system_cfg`
--

LOCK TABLES `nanx_system_cfg` WRITE;
/*!40000 ALTER TABLE `nanx_system_cfg` DISABLE KEYS */;
INSERT INTO `nanx_system_cfg` VALUES (1,'VER','2.02','系统版 本','Version of system'),(2,'BANNER_TITLE','BMS','网站左上角标题','Text on  lett-top '),(3,'SECRET_KEY','3cd9342dc190','应用加密串','Secret key'),(6,'PAGE_TITLE','BMS','浏览器标题333','Title of Browser'),(7,'APP_PREFIX','boss','表格前缀','Prefix of table'),(8,'COMPANY_LOGO','icons8-view_column_filled.png','企业的logo','Logo on login'),(9,'WIN_SIZE_HEIGHT','644','窗口高度(像素为单位)','Default window  height'),(10,'WIN_SIZE_WIDTH','800','窗口宽度(像素为单位)','Default window  width'),(11,'WIN_SIZE_WIDTH_OPERATION','899','数据修改窗口的宽度(像素为单位))','Default window width on modify data');
/*!40000 ALTER TABLE `nanx_system_cfg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_user`
--

DROP TABLE IF EXISTS `nanx_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` char(30) DEFAULT NULL COMMENT '登录名,唯一索引.',
  `password` char(64) DEFAULT NULL COMMENT 'md5加密的密码',
  `staff_name` char(10) DEFAULT NULL COMMENT '对应员工的姓名,暂不管同名的员工',
  `active` char(1) NOT NULL DEFAULT '' COMMENT '是否激活(Y,N)',
  `last_login_ts` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '最后一次登录时间',
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `salt` char(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_user`
--

LOCK TABLES `nanx_user` WRITE;
/*!40000 ALTER TABLE `nanx_user` DISABLE KEYS */;
INSERT INTO `nanx_user` VALUES (4,'admin','642060e50298c0a99118ba26dee7202a','管理员','Y','0000-00-00 00:00:00',NULL,NULL,'78bdea'),(7,'13810077438','0966864e2d2bf5d503389215dfb4e417','史嘉萌','Y','0000-00-00 00:00:00',NULL,NULL,'d243a0'),(8,'sales1','f0fc41ca6f3edd0768ac27492403bdda','sales1','Y','0000-00-00 00:00:00',NULL,NULL,'7c77b6'),(9,'crm1','d3d7d4ae54c7f128a4b0405bbdba4355','crm1','Y','0000-00-00 00:00:00',NULL,NULL,'f0ca42'),(10,'sales2','15a1aaf33d6cdeb54da381749e95613a','sales2','Y','0000-00-00 00:00:00',NULL,NULL,'423b62'),(12,'crm2','ea94cb399c79923d67b65b87393f395a','crm2','Y','0000-00-00 00:00:00',NULL,NULL,'b3eda7');
/*!40000 ALTER TABLE `nanx_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_user_role`
--

DROP TABLE IF EXISTS `nanx_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_code` char(30) NOT NULL DEFAULT '',
  `role_name` char(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `role_code` (`role_code`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_user_role`
--

LOCK TABLES `nanx_user_role` WRITE;
/*!40000 ALTER TABLE `nanx_user_role` DISABLE KEYS */;
INSERT INTO `nanx_user_role` VALUES (4,'admin','管理员'),(8,'1','售前支持工程师'),(9,'2','网络工程师'),(10,'3','电力工程师'),(11,'4','现场运维工程师'),(12,'5','机房前台'),(13,'role_sales','销售'),(14,'sales_manager','销售主管'),(15,'crm','客服');
/*!40000 ALTER TABLE `nanx_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_user_role_assign`
--

DROP TABLE IF EXISTS `nanx_user_role_assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_user_role_assign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_code` char(30) DEFAULT NULL,
  `user` char(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`,`role_code`),
  KEY `user_2` (`user`),
  KEY `role_code` (`role_code`),
  CONSTRAINT `nanx_user_role_assign_ibfk_1` FOREIGN KEY (`user`) REFERENCES `nanx_user` (`user`),
  CONSTRAINT `nanx_user_role_assign_ibfk_2` FOREIGN KEY (`role_code`) REFERENCES `nanx_user_role` (`role_code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_user_role_assign`
--

LOCK TABLES `nanx_user_role_assign` WRITE;
/*!40000 ALTER TABLE `nanx_user_role_assign` DISABLE KEYS */;
INSERT INTO `nanx_user_role_assign` VALUES (7,'1','13810077438'),(8,'4','13810077438'),(4,'admin','admin'),(10,'crm','crm1'),(9,'role_sales','sales1');
/*!40000 ALTER TABLE `nanx_user_role_assign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_user_role_privilege`
--

DROP TABLE IF EXISTS `nanx_user_role_privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_user_role_privilege` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_code` char(30) DEFAULT NULL,
  `activity_code` char(255) NOT NULL DEFAULT '',
  `display_order` int(11) DEFAULT NULL,
  `bpmn_process_name` char(100) DEFAULT NULL,
  `isstart` char(1) DEFAULT '0',
  `btntext` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_code` (`role_code`,`activity_code`),
  KEY `activity_code` (`activity_code`),
  CONSTRAINT `nanx_user_role_privilege_ibfk_2` FOREIGN KEY (`role_code`) REFERENCES `nanx_user_role` (`role_code`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_user_role_privilege`
--

LOCK TABLES `nanx_user_role_privilege` WRITE;
/*!40000 ALTER TABLE `nanx_user_role_privilege` DISABLE KEYS */;
INSERT INTO `nanx_user_role_privilege` VALUES (77,'admin','Cabinet_tree',13,NULL,NULL,NULL),(93,'admin','bpm_debug',14,'order','1','启动流程'),(94,'role_sales','bpm_debug',NULL,'order','1','启动流程'),(99,'admin','act_boss_IDC_building_1492492470',0,NULL,'0',NULL),(100,'admin','act_boss_IDC_building_floor_443513881',1,NULL,'0',NULL),(101,'admin','act_boss_IDC_room_793875312',2,NULL,'0',NULL),(102,'admin','act_boss_cabinet_1247145026',3,NULL,'0',NULL),(104,'admin','act_boss_cabinet_facility_request_897393640',4,NULL,'0',NULL),(106,'admin','act_boss_cabinet_strong_1288470746',7,NULL,'0',NULL),(107,'admin','act_boss_cabinet_strong_facility_531523240',8,NULL,'0',NULL),(108,'admin','act_boss_cabinet_weak_1619761718',9,NULL,'0',NULL),(109,'admin','act_boss_cabinet_weak_facility_1704016905',10,NULL,'0',NULL),(110,'admin','act_boss_customer_2116617297',12,NULL,'0',NULL),(111,'admin','act_boss_SDH_906947720',11,NULL,'0',NULL),(112,'admin','act_boss_cabinet_facility_request_1360736191',5,NULL,'0',NULL),(115,'role_sales','sql_act1',NULL,NULL,'0',NULL),(116,'admin','sdhline',NULL,NULL,'0',NULL),(117,'admin','cab_selector',NULL,NULL,'0',NULL);
/*!40000 ALTER TABLE `nanx_user_role_privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nanx_who_is_who`
--

DROP TABLE IF EXISTS `nanx_who_is_who`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nanx_who_is_who` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user` char(30) DEFAULT NULL,
  `inner_table` char(30) DEFAULT NULL,
  `inner_table_id` int(11) DEFAULT NULL,
  `inner_table_value_field` char(100) DEFAULT NULL,
  `inner_table_value` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pk_whoiswho` (`inner_table`,`inner_table_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_who_is_who`
--

LOCK TABLES `nanx_who_is_who` WRITE;
/*!40000 ALTER TABLE `nanx_who_is_who` DISABLE KEYS */;
/*!40000 ALTER TABLE `nanx_who_is_who` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-27  4:19:55
