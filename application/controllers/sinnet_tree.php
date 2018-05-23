<?php

if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Sinnet_tree  extends CI_Controller {

   

		function treeCfg() {
		$cfg = array(

			'sinnet' => array('sql' =>
				"select  id as value,  idcName as 'idc', idcName as  text ,'idc' as category from  boss_IDC",
				'leaf' => false),

			'idc' => array('sql' =>
				"select id  as value,buildName as  text ,'building' as category from  boss_IDC_building where IDCid='#value'",
				'leaf' => false),

			'building' => array('sql' =>
				"select  id as value, floorName as  text ,'floor' as category from  boss_IDC_building_floor where buildID='#value'  ",
				'leaf' => false),

			'floor' => array('sql' =>
				"select  id as value, roomName as  text ,'hostroom' as category from  boss_IDC_room where floorID='#value'  ",
				'leaf' => false),

			'hostroom' => array('sql' =>
				"select  id as value,cabinetName as text ,'cabinet' as category from boss_cabinet  where roomID='#value' ", 
				'leaf' => false),
   			

			'cabinet' => array('sql' =>
				"select  id as value,cabinetName as text ,'cabinet' as category from boss_Cabinet  where roomID='#value' ", 
				'leaf' => false)
   			);




		 
		return $cfg;
	}

	function index() {

		$tree_request = $_REQUEST;
		$res       = $this->getCategoryResult($tree_request);
		$res_left  = null;
		$res_right = null;
	
		$errno   = $this->db->_error_number();
		$errmsg  = $this->db->_error_message();
		$success = true;
		if ($errno <> 0) {
			$success = false;
		}

		$ret = array(
			'success'           => $success,
			'server_resp'       => $res,
			'server_resp_left'  => $res_left,
			'server_resp_right' => $res_right,
			'errmsg'            => $errmsg);
		echo json_encode($ret);
	}

	function getCategoryResult($tree_request) {

		if (count($tree_request) == 0) {
			return null;
		}

		$trees          = $this->treeCfg();
		$category       = $tree_request['category_to_use'];
		$subCategoryCfg = $trees[$category];
		if (array_key_exists('sql', $subCategoryCfg)) {
            
			$res = $this->getCategoryResultBySqls($subCategoryCfg, $tree_request);
		} else 
		{
			$res = $this->getSubCategorybyMethod($subCategoryCfg, $tree_request);
		}

		$res = $this->setNodeIDandCss($res, $tree_request);
		return $res;
	}


	function getCategoryResultBySqls($subCategoryCfg, $treeRequest) {
		$sql  = $subCategoryCfg['sql'];
		$leaf = $subCategoryCfg['leaf'];
		if (!is_array($sql)) {
			$sql  = array($sql);
			$leaf = array($leaf);
		}


		$total_result = array();
		for ($i = 0; $i < count($sql); $i++) {
			$result       = $this->getCategoryResultBySql($sql[$i], $treeRequest, $leaf[$i]);
			$total_result = array_merge($total_result, $result);
		}
		return $total_result;
	}

 
	function getCategoryResultBySql($sql, $para_array, $leaf) {
		
		foreach ($para_array as $key => $value) {
			if (!is_array($value)) {
				$sql = str_replace('#' . $key, $value, $sql);
			}
		}
		
		logtext($sql);
		$rows = $this->db->query($sql)->result_array();
		for ($i = 0; $i < count($rows); $i++) {
			$rows[$i]['leaf'] = $leaf;
		}
		return $rows;
	}

	function setNodeIDandCss($arr, $tree_request) {
		for ($i = 0; $i < count($arr); $i++) {
			$parent_v           = array_key_exists('value', $tree_request) ? $tree_request['value'] : '';
			$current_v          = array_key_exists('value', $arr[$i]) ? $arr[$i]['value'] : $arr[$i]['field_e'];
			$arr[$i]['id_value']      = 'nanx_' . $parent_v . '_' . $arr[$i]['category'] . '_' . $current_v;

			$arr[$i]['iconCls'] = $arr[$i]['category'];
		}

		return $arr;
	}

 
 
 
}
 
?>