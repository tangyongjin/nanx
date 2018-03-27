-- MySQL dump 10.13  Distrib 5.5.57, for Linux (x86_64)
--
-- Host: localhost    Database: parkos
-- ------------------------------------------------------
-- Server version	5.5.57

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
) ENGINE=InnoDB AUTO_INCREMENT=276 DEFAULT CHARSET=utf8 COMMENT='活动注册表格';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity`
--

LOCK TABLES `nanx_activity` WRITE;
/*!40000 ALTER TABLE `nanx_activity` DISABLE KEYS */;
INSERT INTO `nanx_activity` VALUES (90,'NANX_TBL_DATA','service',NULL,NULL,'mrdbms/getTableFields','curd/listData','rdbms/getTableFields','table','http://127.0.0.1/nanx/imgs/icon-48-banner-categories.png','',NULL,NULL,NULL,'system',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(91,'NANX_TBL_STRU','service',NULL,NULL,'mrdbms/get_table_creation_info_no_directshow','rdbms/get_table_creation_info_directshow','rdbms/get_table_creation_info_no_directshow','table','http://127.0.0.1/nanx/imgs/icon-48-banner-categories.png',NULL,NULL,NULL,NULL,'system',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(92,'NANX_TBL_INDEX','service',NULL,NULL,'mrdbms/get_min_table_indexes_no_directshow','rdbms/get_min_table_indexes_directshow','rdbms/get_min_table_indexes_no_directshow','table','http://127.0.0.1/nanx/imgs/icon-48-banner-categories.png',NULL,NULL,NULL,NULL,'system',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(93,'NANX_TBL_CREATE','service',NULL,NULL,'mrdbms/get_table_creation_info_no_directshow','rdbms/get_table_creation_info_directshow','rdbms/get_table_creation_info_no_directshow','table','http://127.0.0.1/nanx/imgs/icon-48-banner-categories.png',NULL,NULL,NULL,NULL,'system',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(116,'NANX_SYS_CONFIG','service',NULL,'',NULL,'curd/listData','',NULL,'',NULL,NULL,NULL,NULL,'system',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(134,'NANX_APP_SUMMARY','html',NULL,NULL,'tree/systemSummary','tree/systemSummary','',NULL,'icon-48-links.png','NANX_APP_SUMMARY',NULL,NULL,NULL,'system',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(177,'NANX_TB_LAYOUT','sql',NULL,NULL,NULL,'curd/listData','',NULL,'',NULL,'select   field_list   from  nanx_activity_biz_layout   where  raw_table=$table',NULL,NULL,'system',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(226,'NANX_FS_2_TABLE','service',NULL,NULL,'mfile/getFSGridFields','file/fs2array','mfile/getFSGridFields',NULL,'default_act.png','',NULL,NULL,NULL,'system',662,800,899,NULL,NULL,NULL,NULL,NULL),(234,'NANX_SQL_ACTIVITY','sql',NULL,NULL,NULL,'curd/listData','',NULL,'act_sql.png','run_sql','show tables;\n',NULL,NULL,'system',644,800,899,NULL,NULL,NULL,NULL,NULL),(265,'act_parkos_org_1607399151','tree',NULL,'parkos_org',NULL,NULL,'',NULL,'node.png','组织结构管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,'title','parent_id'),(266,'act_parkos_noticeinfo_2092101938','table',NULL,'parkos_noticeinfo',NULL,NULL,'',NULL,'media.png','通知信息',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(267,'act_parkos_company_1472731013','table',NULL,'parkos_company',NULL,NULL,'',NULL,'organize.png','入住企业',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(268,'act_parkos_subsys_gateway_545671900','table',NULL,'parkos_subsys_gateway',NULL,NULL,'',NULL,'switch.png','应用网关',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(270,'org_employee','table',NULL,'parkos_org',NULL,'curd/listData','',NULL,'contacts.png','员工管理',NULL,NULL,NULL,'F',644,800,899,NULL,NULL,NULL,NULL,NULL),(271,'act_parkos_assets_1427086552','table',NULL,'parkos_assets',NULL,NULL,'',NULL,'hardware.png','设备管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(272,'act_parkos_dev_knowledge_base_1453357961','table',NULL,'parkos_dev_knowledge_base',NULL,NULL,'',NULL,'knowbase.png','知识库',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(273,'act_parkos_company_fee_log_1224881844','table',NULL,'parkos_company_fee_log',NULL,NULL,'',NULL,'invoice.png','租金管理',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(274,'act_parkos_meeting_room_2134843644','table',NULL,'parkos_meeting_room',NULL,NULL,'',NULL,'prod_category.png','会议室',NULL,NULL,NULL,'F',662,800,NULL,NULL,NULL,NULL,NULL,NULL),(275,'rfid_person_report','html','plugin/3d/rfid_report/index.html',NULL,'plugin/3d/rfid_report/index.html',NULL,'',NULL,'act_service.png','人员统计',NULL,NULL,NULL,'F',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_a2a_btns`
--

LOCK TABLES `nanx_activity_a2a_btns` WRITE;
/*!40000 ALTER TABLE `nanx_activity_a2a_btns` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_biz_layout`
--

LOCK TABLES `nanx_activity_biz_layout` WRITE;
/*!40000 ALTER TABLE `nanx_activity_biz_layout` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_curd_cfg`
--

LOCK TABLES `nanx_activity_curd_cfg` WRITE;
/*!40000 ALTER TABLE `nanx_activity_curd_cfg` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='活动UI的字段配置。';
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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='活动UI的字段配置。';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_field_special_display_cfg`
--

LOCK TABLES `nanx_activity_field_special_display_cfg` WRITE;
/*!40000 ALTER TABLE `nanx_activity_field_special_display_cfg` DISABLE KEYS */;
INSERT INTO `nanx_activity_field_special_display_cfg` VALUES (1,'ref_activity','t_plug_goods_list','course_id',NULL,'球场',NULL,0),(2,'ref_activity','t_plug_goods_list','goods_id',NULL,'商品',NULL,0),(3,'ref_activity','t_plug_goods_list','price_via_course',NULL,'买入价格',NULL,0),(4,'ref_activity','t_plug_goods_list','price_via_user',NULL,'零售价格',NULL,0),(5,'ref_activity','t_plug_goods_list','billing_method',NULL,'时长计费方式',NULL,0),(6,'ref_activity','parkos_company','name',NULL,'企业名称',NULL,0),(7,'ref_activity','parkos_company','org_code',NULL,'企业标识',NULL,0),(8,'ref_activity','parkos_company','contact',NULL,'联系人',NULL,0),(9,'ref_activity','parkos_company','contact_mobile',NULL,'联系人手机号',NULL,0),(10,'ref_activity','parkos_company','license',NULL,'企业执照号',NULL,0),(11,'ref_activity','parkos_company','biz_intro',NULL,'企业介绍',NULL,0),(12,'ref_activity','parkos_company','docker_port',NULL,'端口号',NULL,0),(13,'ref_activity','parkos_company','org_logo',NULL,'企业logo',NULL,0),(14,'ref_activity','parkos_company','contract_no',NULL,'合同号',NULL,0),(15,'ref_activity','parkos_company','occpy_size',NULL,'占用面积',NULL,0),(16,'ref_activity','parkos_company','occupy_size',NULL,'占用面积',NULL,0),(17,'ref_activity','parkos_company','month_fee',NULL,'月租金',NULL,0),(18,'ref_activity','parkos_assets','device_type',NULL,'设备类型',NULL,0),(19,'ref_activity','parkos_assets','device_name',NULL,'设备名称',NULL,0),(20,'ref_activity','parkos_assets','device_location',NULL,'位置',NULL,0),(21,'ref_activity','parkos_assets','device_installed',NULL,'安装日期',NULL,0),(22,'ref_activity','parkos_assets','vendor',NULL,'制造商',NULL,0),(23,'ref_activity','parkos_assets','tech_support_person',NULL,'技术支持人',NULL,0),(24,'ref_activity','parkos_assets','tech_support_mobile',NULL,'售后电话',NULL,0),(25,'ref_activity','parkos_assets','last_maintenance',NULL,'最后维护日期',NULL,0),(26,'ref_activity','parkos_assets','device_model',NULL,'设备型号',NULL,0),(27,'ref_activity','parkos_dev_knowledge_base','model',NULL,'设备型号',NULL,0),(28,'ref_activity','parkos_dev_knowledge_base','bugtext',NULL,'故障描述',NULL,0),(29,'ref_activity','parkos_dev_knowledge_base','solution',NULL,'解决方案',NULL,0),(30,'ref_activity','parkos_meeting_room','price',NULL,'价格',NULL,0),(31,'ref_activity','parkos_meeting_room','room_size',NULL,'面积',NULL,0),(32,'ref_activity','parkos_meeting_room','status',NULL,'状态',NULL,0),(33,'ref_activity','parkos_meeting_room','location',NULL,'位置',NULL,0),(34,'ref_activity','parkos_meeting_room','roominfo',NULL,'简介',NULL,0),(35,'ref_activity','parkos_meeting_room','roomtitle',NULL,'会议室名称',NULL,0),(36,'ref_activity','parkos_noticeinfo','title',NULL,'标题',NULL,0),(37,'ref_activity','parkos_noticeinfo','id',NULL,'ID',NULL,0),(38,'ref_activity','parkos_noticeinfo','content',NULL,'内容',NULL,0),(39,'ref_activity','parkos_noticeinfo','addtime',NULL,'发送时间',NULL,0),(40,'ref_activity','parkos_noticeinfo','onshow',NULL,'生效时间',NULL,0),(41,'ref_activity','parkos_company','position',NULL,'公司所在位置',NULL,0),(42,'ref_activity','parkos_company','move_in_date',NULL,'入驻日期',NULL,0),(43,'ref_activity','parkos_company','move_out_date',NULL,'离开日期',NULL,0),(44,'ref_activity','parkos_subsys_gateway','system_name',NULL,'系统名称',NULL,0),(45,'ref_activity','parkos_company_fee_log','company_id',NULL,'公司名称',NULL,0),(46,'ref_activity','parkos_company_fee_log','cost_type',NULL,'费用类型',NULL,0),(47,'ref_activity','parkos_company_fee_log','pay_date',NULL,'缴费时间',NULL,0),(48,'ref_activity','parkos_company_fee_log','cost_amount',NULL,'费用金额',NULL,0),(49,'ref_activity','parkos_company_fee_log','effective_date',NULL,'生效日期',NULL,0),(50,'ref_activity','parkos_company_fee_log','deadline',NULL,'截止日期',NULL,0),(51,'ref_activity','parkos_company_fee_log','account_number',NULL,'收款账户',NULL,0),(52,'ref_activity','parkos_company_fee_log','cashier',NULL,'收款单位',NULL,0),(53,'ref_activity','parkos_company_fee_log','pay_account',NULL,'支付账号',NULL,0),(54,'ref_activity','parkos_company_fee_log','pay_type',NULL,'支付方式',NULL,0),(55,'ref_activity','parkos_company_fee_log','receipt_number',NULL,'收据号',NULL,0),(56,'ref_activity','parkos_company_fee_log','invoice_number',NULL,'发票号',NULL,0),(57,'ref_activity','parkos_company_fee_log','remarks',NULL,'备注',NULL,0);
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
) ENGINE=MyISAM AUTO_INCREMENT=190 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_forbidden_field`
--

LOCK TABLES `nanx_activity_forbidden_field` WRITE;
/*!40000 ALTER TABLE `nanx_activity_forbidden_field` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动注册表格';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_hooks`
--

LOCK TABLES `nanx_activity_hooks` WRITE;
/*!40000 ALTER TABLE `nanx_activity_hooks` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='活动注册表格';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_id_order`
--

LOCK TABLES `nanx_activity_id_order` WRITE;
/*!40000 ALTER TABLE `nanx_activity_id_order` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='活动注册表格';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_activity_nofity`
--

LOCK TABLES `nanx_activity_nofity` WRITE;
/*!40000 ALTER TABLE `nanx_activity_nofity` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_biz_column_dropdown_codetable_cfg`
--

LOCK TABLES `nanx_biz_column_dropdown_codetable_cfg` WRITE;
/*!40000 ALTER TABLE `nanx_biz_column_dropdown_codetable_cfg` DISABLE KEYS */;
INSERT INTO `nanx_biz_column_dropdown_codetable_cfg` VALUES (1,'parkos_org','sex','gender');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_biz_column_editor_cfg`
--

LOCK TABLES `nanx_biz_column_editor_cfg` WRITE;
/*!40000 ALTER TABLE `nanx_biz_column_editor_cfg` DISABLE KEYS */;
INSERT INTO `nanx_biz_column_editor_cfg` VALUES (1,'ref_activity','parkos_sale_item','sales',1,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL),(2,'ref_activity','parkos_noticeinfo','content',0,0,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL),(3,'ref_activity','parkos_dev_knowledge_base','bugtext',0,0,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL),(4,'ref_activity','parkos_dev_knowledge_base','solution',0,0,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL),(5,'ref_activity','parkos_meeting_room','roominfo',0,0,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_biz_column_follow_cfg`
--

LOCK TABLES `nanx_biz_column_follow_cfg` WRITE;
/*!40000 ALTER TABLE `nanx_biz_column_follow_cfg` DISABLE KEYS */;
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
  `level` int(11) DEFAULT NULL,
  `group_type` char(7) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_biz_column_trigger_group`
--

LOCK TABLES `nanx_biz_column_trigger_group` WRITE;
/*!40000 ALTER TABLE `nanx_biz_column_trigger_group` DISABLE KEYS */;
INSERT INTO `nanx_biz_column_trigger_group` VALUES (23,'parkos_company_fee_log','company_id','parkos_company',NULL,'name','id',NULL,'aZ3e0PfP',1,'nogroup');
/*!40000 ALTER TABLE `nanx_biz_column_trigger_group` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_biz_tables`
--

LOCK TABLES `nanx_biz_tables` WRITE;
/*!40000 ALTER TABLE `nanx_biz_tables` DISABLE KEYS */;
INSERT INTO `nanx_biz_tables` VALUES (42,'parkos_org','org',NULL),(43,'parkos_company','入住企业',NULL),(44,'parkos_ merchant','商户',NULL),(45,'parkos_noticeinfo','App顶部信息',NULL),(46,'parkos_subsys_gateway','应用网关',NULL),(48,'nanx_code_table','下拉表',NULL),(49,'parkos_assets','设备管理',NULL),(50,'parkos_dev_knowledge_base','知识库',NULL),(51,'parkos_company_fee_log','租金管理',NULL),(52,'parkos_meeting_room','会议室',NULL);
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
  `value` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_code_table`
--

LOCK TABLES `nanx_code_table` WRITE;
/*!40000 ALTER TABLE `nanx_code_table` DISABLE KEYS */;
INSERT INTO `nanx_code_table` VALUES (1,'gender','男c','male'),(2,'gender','女c','female'),(3,'device_type','电冰箱',NULL),(4,'device_type','电视机',NULL);
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
  `parent` char(200) DEFAULT NULL,
  `activity_code` char(100) DEFAULT NULL,
  `grid_title` char(200) DEFAULT NULL,
  `activity_type` char(100) DEFAULT NULL,
  `role_code` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_menu`
--

LOCK TABLES `nanx_menu` WRITE;
/*!40000 ALTER TABLE `nanx_menu` DISABLE KEYS */;
INSERT INTO `nanx_menu` VALUES (36,NULL,'act_parkos_org_1607399151','组织结构管理',NULL,'admin'),(37,NULL,'act_parkos_company_fee_log_1224881844','租金管理',NULL,'admin'),(38,NULL,'mgroup_nbPDlUla','菜单',NULL,'admin'),(39,'mgroup_nbPDlUla','act_parkos_company_1472731013','入住企业',NULL,'admin'),(40,NULL,'org_employee','员工管理',NULL,'admin');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_sms`
--

LOCK TABLES `nanx_sms` WRITE;
/*!40000 ALTER TABLE `nanx_sms` DISABLE KEYS */;
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
INSERT INTO `nanx_system_cfg` VALUES (1,'VER','2.02','系统版 本','Version of system'),(2,'BANNER_TITLE','ParkOS','网站左上角标题','Text on  lett-top '),(3,'SECRET_KEY','3cd9342dc190','应用加密串','Secret key'),(6,'PAGE_TITLE','ParkOS','浏览器标题333','Title of Browser'),(7,'APP_PREFIX','parkos','表格前缀','Prefix of table'),(8,'COMPANY_LOGO','Light_On.png','企业的logo','Logo on login'),(9,'WIN_SIZE_HEIGHT','644','窗口高度(像素为单位)','Default window  height'),(10,'WIN_SIZE_WIDTH','800','窗口宽度(像素为单位)','Default window  width'),(11,'WIN_SIZE_WIDTH_OPERATION','899','数据修改窗口的宽度(像素为单位))','Default window width on modify data');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_user`
--

LOCK TABLES `nanx_user` WRITE;
/*!40000 ALTER TABLE `nanx_user` DISABLE KEYS */;
INSERT INTO `nanx_user` VALUES (4,'admin','642060e50298c0a99118ba26dee7202a','管理员','Y','0000-00-00 00:00:00',NULL,NULL,'78bdea'),(5,'sales1','ce97dc2d94dbe9d086fbf2737fd28d98','sales1','Y','0000-00-00 00:00:00',NULL,NULL,'d5f42d'),(6,'sales2','d705ba394cb50921327521b4c1432dfe','sales2','Y','0000-00-00 00:00:00',NULL,NULL,'a7318b');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_user_role`
--

LOCK TABLES `nanx_user_role` WRITE;
/*!40000 ALTER TABLE `nanx_user_role` DISABLE KEYS */;
INSERT INTO `nanx_user_role` VALUES (4,'admin','管理员'),(6,'sales','销售');
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
  `user` char(30) DEFAULT NULL,
  `role_code` char(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`,`role_code`),
  KEY `user_2` (`user`),
  KEY `role_code` (`role_code`),
  CONSTRAINT `nanx_user_role_assign_ibfk_1` FOREIGN KEY (`user`) REFERENCES `nanx_user` (`user`),
  CONSTRAINT `nanx_user_role_assign_ibfk_2` FOREIGN KEY (`role_code`) REFERENCES `nanx_user_role` (`role_code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_user_role_assign`
--

LOCK TABLES `nanx_user_role_assign` WRITE;
/*!40000 ALTER TABLE `nanx_user_role_assign` DISABLE KEYS */;
INSERT INTO `nanx_user_role_assign` VALUES (4,'admin','admin'),(5,'sales1','sales'),(6,'sales2','sales');
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_code` (`role_code`,`activity_code`),
  KEY `activity_code` (`activity_code`),
  CONSTRAINT `nanx_user_role_privilege_ibfk_2` FOREIGN KEY (`role_code`) REFERENCES `nanx_user_role` (`role_code`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nanx_user_role_privilege`
--

LOCK TABLES `nanx_user_role_privilege` WRITE;
/*!40000 ALTER TABLE `nanx_user_role_privilege` DISABLE KEYS */;
INSERT INTO `nanx_user_role_privilege` VALUES (39,'admin','act_parkos_org_1607399151',NULL),(40,'admin','act_parkos_noticeinfo_2092101938',NULL),(41,'admin','act_parkos_company_1472731013',NULL),(42,'admin','act_parkos_subsys_gateway_545671900',NULL),(43,'admin','org_employee',NULL),(45,'admin','act_parkos_assets_1427086552',NULL),(46,'admin','act_parkos_dev_knowledge_base_1453357961',NULL),(47,'admin','act_parkos_company_fee_log_1224881844',NULL),(49,'admin','act_parkos_meeting_room_2134843644',NULL),(50,'admin','rfid_person_report',NULL);
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

--
-- Table structure for table `parkos_ merchant`
--

DROP TABLE IF EXISTS `parkos_ merchant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkos_ merchant` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `org_code` char(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkos_ merchant`
--

LOCK TABLES `parkos_ merchant` WRITE;
/*!40000 ALTER TABLE `parkos_ merchant` DISABLE KEYS */;
/*!40000 ALTER TABLE `parkos_ merchant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkos_assets`
--

DROP TABLE IF EXISTS `parkos_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkos_assets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_type` int(11) DEFAULT NULL COMMENT '设备类型',
  `device_name` char(200) DEFAULT NULL COMMENT '设备名称',
  `device_location` char(200) DEFAULT NULL COMMENT '设备位置',
  `device_installed` date DEFAULT NULL COMMENT '安装日期',
  `vendor` char(100) DEFAULT NULL COMMENT '厂家',
  `tech_support_person` char(40) DEFAULT NULL COMMENT '技术支持人',
  `tech_support_mobile` char(11) DEFAULT NULL COMMENT '技术支持电话',
  `last_maintenance` date DEFAULT NULL COMMENT '最后维护日期',
  `device_model` char(100) DEFAULT NULL COMMENT '设备型号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkos_assets`
--

LOCK TABLES `parkos_assets` WRITE;
/*!40000 ALTER TABLE `parkos_assets` DISABLE KEYS */;
/*!40000 ALTER TABLE `parkos_assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkos_assets_maintenance_log`
--

DROP TABLE IF EXISTS `parkos_assets_maintenance_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkos_assets_maintenance_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `equipment_name` char(20) DEFAULT NULL COMMENT '设备名称',
  `equipment_comapny_id` int(11) DEFAULT NULL COMMENT '设备所属公司',
  `maintain_staff` char(20) DEFAULT NULL COMMENT '维护人员',
  `maintain_time` date DEFAULT NULL COMMENT '维护时间',
  `maintain_content` char(200) DEFAULT NULL COMMENT '维护内容',
  `if_err` int(1) DEFAULT NULL COMMENT '是否异常',
  `err_number` int(11) DEFAULT NULL COMMENT '异常信息编号',
  `remarks` char(200) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkos_assets_maintenance_log`
--

LOCK TABLES `parkos_assets_maintenance_log` WRITE;
/*!40000 ALTER TABLE `parkos_assets_maintenance_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `parkos_assets_maintenance_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkos_company`
--

DROP TABLE IF EXISTS `parkos_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkos_company` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(100) DEFAULT NULL COMMENT '企业名称',
  `org_code` char(10) DEFAULT NULL COMMENT '企业标识',
  `contact` char(10) DEFAULT NULL COMMENT '联系人',
  `contact_mobile` char(11) DEFAULT NULL COMMENT '联系人电话',
  `license` char(50) DEFAULT NULL COMMENT '公司执照编号',
  `position` char(200) DEFAULT NULL COMMENT '公司所在位置',
  `biz_intro` text COMMENT '公司业务介绍',
  `docker_port` int(11) DEFAULT NULL COMMENT '企业端口号',
  `move_in_date` date DEFAULT NULL COMMENT '入驻日期',
  `move_out_date` date DEFAULT NULL COMMENT '离开日期',
  `contract_no` char(100) DEFAULT NULL COMMENT '合同号',
  `org_logo` char(200) DEFAULT NULL COMMENT '企业logo',
  `occupy_size` int(11) DEFAULT NULL COMMENT '占用面积',
  `month_fee` int(11) DEFAULT NULL COMMENT '月租金',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkos_company`
--

LOCK TABLES `parkos_company` WRITE;
/*!40000 ALTER TABLE `parkos_company` DISABLE KEYS */;
INSERT INTO `parkos_company` VALUES (1,'IBM北京科技有限公司','IBM','','','','','',0,NULL,NULL,'','',0,0),(2,'HP科技有限公司','HP','','','','','',0,NULL,NULL,'','',0,0),(3,'爱建证券有限责任公司','上海',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'安信证券股份有限公司','深圳',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'北京高华证券有限责任公司','北京',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'渤海证券股份有限公司','天津',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'财达证券股份有限公司','河北',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'财富证券有限责任公司','湖南',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'财通证券股份有限公司','浙江',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'财通证券资产管理有限公司','浙江',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'长城国瑞证券有限公司','厦门',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'长城证券股份有限公司','深圳',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'长江证券（上海）资产管理有限公司','上海',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'长江证券承销保荐有限公司','上海',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'长江证券股份有限公司','湖北',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'网信证券有限责任公司','辽宁',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'川财证券有限责任公司','四川',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'大通证券股份有限公司','大连',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'大同证券经纪有限责任公司','山西',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'德邦证券股份有限公司','上海',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'第一创业证券承销保荐有限责任公司','北京',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,'第一创业证券股份有限公司','深圳',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'东北证券股份有限公司','吉林',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,'东方花旗证券有限公司','上海',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,'东方证券股份有限公司','上海',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,'东海证券股份有限公司','江苏',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,'东莞证券股份有限公司','广东',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,'东吴证券股份有限公司','江苏',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'东兴证券股份有限公司','北京',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,'方正证券股份有限公司','湖南',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,'高盛高华证券有限责任公司','北京',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,'光大证券股份有限公司','上海',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(33,'广发证券股份有限公司','广东',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(34,'广发证券资产管理（广东）有限公司','广东',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(35,'广州证券股份有限公司','广东',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(36,'国都证券股份有限公司','北京',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(37,'国海证券股份有限公司','广西',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(38,'国金证券股份有限公司','四川',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(39,'国开证券股份有限公司','北京',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `parkos_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkos_company_fee_log`
--

DROP TABLE IF EXISTS `parkos_company_fee_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkos_company_fee_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) DEFAULT NULL COMMENT '付款单位',
  `cost_type` char(20) DEFAULT NULL COMMENT '费用类型',
  `pay_date` date DEFAULT NULL COMMENT '缴费时间',
  `cost_amount` int(10) DEFAULT NULL COMMENT '费用金额',
  `effective_date` date DEFAULT NULL COMMENT '生效日期',
  `deadline` date DEFAULT NULL COMMENT '截止日期',
  `account_number` char(20) DEFAULT NULL COMMENT '收款账户',
  `cashier` char(10) DEFAULT NULL COMMENT '收款单位',
  `pay_account` char(20) DEFAULT NULL COMMENT '支付账号',
  `pay_type` int(10) DEFAULT NULL COMMENT '支付方式',
  `receipt_number` char(20) DEFAULT NULL COMMENT '收据号',
  `invoice_number` char(20) DEFAULT NULL COMMENT '发票号',
  `remarks` char(100) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkos_company_fee_log`
--

LOCK TABLES `parkos_company_fee_log` WRITE;
/*!40000 ALTER TABLE `parkos_company_fee_log` DISABLE KEYS */;
INSERT INTO `parkos_company_fee_log` VALUES (1,1,'',NULL,1000,NULL,NULL,'','','',0,'','',''),(2,34,'',NULL,0,NULL,NULL,'','','',0,'','','');
/*!40000 ALTER TABLE `parkos_company_fee_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkos_dev_knowledge_base`
--

DROP TABLE IF EXISTS `parkos_dev_knowledge_base`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkos_dev_knowledge_base` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `model` char(100) DEFAULT NULL COMMENT '设备型号',
  `bugtext` text COMMENT '故障描述',
  `solution` text COMMENT '解决方案',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkos_dev_knowledge_base`
--

LOCK TABLES `parkos_dev_knowledge_base` WRITE;
/*!40000 ALTER TABLE `parkos_dev_knowledge_base` DISABLE KEYS */;
/*!40000 ALTER TABLE `parkos_dev_knowledge_base` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkos_device_type`
--

DROP TABLE IF EXISTS `parkos_device_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkos_device_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_type` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkos_device_type`
--

LOCK TABLES `parkos_device_type` WRITE;
/*!40000 ALTER TABLE `parkos_device_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `parkos_device_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkos_meeting_room`
--

DROP TABLE IF EXISTS `parkos_meeting_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkos_meeting_room` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `roomtitle` char(100) DEFAULT NULL COMMENT '会议室名称',
  `price` int(10) DEFAULT NULL COMMENT '价格',
  `room_size` int(10) DEFAULT NULL COMMENT '会议室面积',
  `status` char(20) DEFAULT NULL COMMENT '会议室状态',
  `location` char(100) DEFAULT NULL COMMENT '位置',
  `roominfo` text COMMENT '会议室描述,设备等',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkos_meeting_room`
--

LOCK TABLES `parkos_meeting_room` WRITE;
/*!40000 ALTER TABLE `parkos_meeting_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `parkos_meeting_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkos_noticeinfo`
--

DROP TABLE IF EXISTS `parkos_noticeinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkos_noticeinfo` (
  `id` varchar(100) NOT NULL DEFAULT '' COMMENT 'ID',
  `title` varchar(100) DEFAULT NULL COMMENT '标题',
  `content` longtext COMMENT '内容',
  `addtime` datetime DEFAULT NULL COMMENT '发送时间',
  `onshow` datetime DEFAULT NULL COMMENT '生效时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公告';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkos_noticeinfo`
--

LOCK TABLES `parkos_noticeinfo` WRITE;
/*!40000 ALTER TABLE `parkos_noticeinfo` DISABLE KEYS */;
INSERT INTO `parkos_noticeinfo` VALUES ('','','',NULL,NULL);
/*!40000 ALTER TABLE `parkos_noticeinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkos_org`
--

DROP TABLE IF EXISTS `parkos_org`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkos_org` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `title` char(10) DEFAULT NULL,
  `mobile` char(11) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkos_org`
--

LOCK TABLES `parkos_org` WRITE;
/*!40000 ALTER TABLE `parkos_org` DISABLE KEYS */;
INSERT INTO `parkos_org` VALUES (1,0,'根',NULL,1),(13,12,'新节点','',NULL),(16,1,'物业',NULL,NULL),(22,1,'人力资源',NULL,NULL),(30,16,'新节点',NULL,NULL),(31,1,'新节点',NULL,NULL),(32,22,'员工B1','',1),(33,1,'行政',NULL,NULL),(34,33,'新节点',NULL,NULL);
/*!40000 ALTER TABLE `parkos_org` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkos_subsys_gateway`
--

DROP TABLE IF EXISTS `parkos_subsys_gateway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkos_subsys_gateway` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `system_name` char(100) DEFAULT NULL,
  `portal_url` char(200) DEFAULT NULL,
  `vendor` char(100) DEFAULT NULL,
  `api_key` char(100) DEFAULT NULL,
  `api_query_url` char(200) DEFAULT NULL,
  `api_operate_url` char(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkos_subsys_gateway`
--

LOCK TABLES `parkos_subsys_gateway` WRITE;
/*!40000 ALTER TABLE `parkos_subsys_gateway` DISABLE KEYS */;
/*!40000 ALTER TABLE `parkos_subsys_gateway` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-27  9:52:01
