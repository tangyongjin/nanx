<?php

if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Tree extends CI_Controller {
   function abc(){

 			$salt                    = 'admin';
			$pwd                     = 'admin';
			$pwd_with_salt           = md5(md5($pwd) . $salt);
		    echo $pwd_with_salt ;
   }


		function treeCfg() {
		$cfg = array(
			'biz_tables' => array('sql' =>
				"select id ,  table_name as value,  table_name as 'table', table_screen_name as  text ,'biz_table' as category from  nanx_biz_tables",
				'leaf' => false),

			'biz_tables_can_follow' => array('sql' =>
				"select id, table_name as value, table_name as 'table', table_screen_name as  text ,'biz_table' as category from  nanx_biz_tables",
				'leaf' => false),

			'fks' => array('sql' =>
				'SELECT  ke.constraint_name as text,ke.constraint_name  as value,"fk" as category
                    FROM information_schema.KEY_COLUMN_USAGE ke
                    WHERE ke.referenced_table_name IS NOT NULL and constraint_schema="SCHEMA_REPLACE"
                    ORDER BY ke.referenced_table_name', 'leaf' => true),

			'biz_table' => array('sql' =>
				"select  table_name as value,  table_name as  text ,'referenced_table' as category from
                      nanx_biz_tables      where table_name='#value'", 'leaf' => array(true, false)),

			'table_by_name' => array('sql' =>
				"select  table_name as value,  table_name as  text ,'referenced_table' as category from
                      nanx_biz_tables      where table_name='#value'", 'leaf' => array(true, false)),

			'view_filter' => array('sql' =>
				"select  view_filter as value,  view_filter_memo  as  text ,'view_filter_item' as category, 
				      id as hostby from
                      nanx_activity   where  LENGTH(view_filter)>3   and id=#hostby ",
                       'leaf' => array(true, false)),
 
			'based_biz_table' => array('sql' =>
				"select  table_name as value,'" . $this->lang->line('fields') . "'  as  text ,'biz_cols' as category, table_name as hostby
                    from  nanx_biz_tables      where id='#value'
                    union
                    select  table_name as value,'" . $this->lang->line('trigger_groups') . "'  as  text ,'trigger_groups' as category, table_name as hostby
                    from  nanx_biz_tables      where id='#value'
                    union  
                    select  table_name as value,'" . $this->lang->line('dropdown_groups') . "'  as  text ,'dropdown_groups' as category, table_name as hostby
                    from  nanx_biz_tables      where id='#value'  
                    union
                    select  '#hostby' as value,'" . $this->lang->line('view_filter') . "'  as  text ,'view_filter' as category, id as hostby
                    from  nanx_activity      where activity_code='#hostby' 
                    
                    ",
				'leaf' => false),

			'trigger_groups' => array('sql' =>
				"select  distinct  group_id  as value, group_id as  text ,'trigger_group' as category, base_table as hostby
                    from  nanx_biz_column_trigger_group   where base_table='#value' and group_type='isgroup'
                    ",
				'leaf' => true),

			'dropdown_groups' => array(
				'sql' =>
				"select id, group_id , field_e  as value, field_e as text , 'dropdown_item' as category, base_table as hostby
                     from  nanx_biz_column_trigger_group   where base_table='#value' and group_type='nogroup'
                     ",
				'method'      => "getBizCols",
				'post_method' => 'change_filed_display',
				'paratype'    => 'table',
				'leaf'        => true),

			'biz_table_by_base_table' => array('sql' =>
				"select table_screen_name as text,table_name as value,'hidden_category' as category from nanx_biz_tables where table_name='#value' ",
				'leaf' => true
			),

			'biz_cols_by_actcode' => array(
				'method'   => "getBizCols",
				'paratype' => 'actcode',
				'leaf'     => true),

			'biz_cols' => array(
				'method'   => "getBizCols",
				'paratype' => 'value',
				'leaf'     => true),

			'system_users' => array('sql' =>
				"select user as value, IFNULL(staff_name,user) as text ,'system_user' as category from nanx_user ",
				'leaf' => true),



             'hooks'=> array(
                'sql'=>" select id as value, memo as text, 'hook' as  category from nanx_activity_hooks  where activity_code='#value' order by hook_event ",
                'leaf'=>true
             	),




			'public_cols_show' => array('sql' =>
				"select id as value,concat('[',field_e,'->',field_c,']') as text,'single_col_display' as category from nanx_activity_field_public_display_cfg",
				'leaf' => true),

             'codetable' => array('sql' =>
				" select  distinct category  as text , category    from nanx_code_table ",
				'leaf' => true),


		 


			'public_cols_show_in_summary' => array('sql' =>
				"select  field_e as text,field_c  as value,'ce_sum' as category from nanx_activity_field_public_display_cfg",
				'leaf' => true),

			'special_cols_show_config_v2' => array('sql' =>
				"select id as value,base_table,field_e as value, field_c as text,'single_col_display' as category from nanx_activity_field_special_display_cfg",
				'leaf' => true),

			'forbidden_biz_cols_by_actcode' => array(
				'method'   => "getForbiddenBizCols",
				'paratype' => 'actcode',
				'leaf'     => true),

			'tables' => array('sql' =>
				"select  TABLE_NAME as value,  TABLE_NAME as  text ,'table' as category from information_schema.TABLES
                        where table_schema='DATABASE_SCHEMA_REPLACE' and  TABLE_NAME    like  'APP_REPLACE%'",
				'leaf' => false),

			'buttons' => array('sql' =>
				"select  nanx_activity_a2a_btns.id,activity_for_btn  as value , btn_name as text , 'btn_a2a'  as category ,
             '#value' as hostby,base_table  as subtable,'refer_to_parent' as maintable ,grid_title as button_refer_act,
             field_for_main_activity as op_field from  nanx_activity_a2a_btns,nanx_activity
             where  nanx_activity_a2a_btns.activity_code='#value'
             and  nanx_activity_a2a_btns.activity_for_btn=nanx_activity.activity_code
             union
             select  id,id as value , btn_name as text ,'btn_js' as category ,'#value' as hostby,
             ''  as subtable,'refer_to_parent' as maintable  ,'' as button_refer_act,'' as op_field
             from  nanx_activity_js_btns
             where  activity_code='#value'
             union
             select  id,id as value , btn_name as text ,'btn_batch' as category ,'#value' as hostby,
             ''  as subtable,'refer_to_parent' as maintable  ,'' as button_refer_act ,  op_field
             from  nanx_activity_batch_btns
             where  activity_code='#value'
             ",

				'leaf' => true),

			'button' => array('sql' =>
				"select   activity_for_btn as value,grid_title as text,'btn_referenced_activity' as category  from
                      nanx_activity_a2a_btns,nanx_activity
                      where  nanx_activity_a2a_btns.id='#value' and
                      nanx_activity.activity_code=activity_for_btn;", 'leaf' => true),


			'activity_under_role' => array('sql' =>
              "select  grid_title as text, nanx_user_role_privilege.activity_code  as value,  'activity' as category from
               nanx_user_role_privilege, nanx_activity      where  role_code='#value'
               and  nanx_user_role_privilege.activity_code=nanx_activity.activity_code order by  display_order ",
              'leaf' => true),

			'table' => array('sql' =>
				"select COLUMN_NAME  as value, concat( COLUMN_NAME,'[', COLUMN_TYPE,']') as  text ,
                       COLUMN_TYPE as field_def,
                       '#value' as 'hostby',
                       if(COLUMN_KEY='PRI','primary_column','column') as category  from
                      `information_schema`.`COLUMNS` where TABLE_SCHEMA ='DATABASE_SCHEMA_REPLACE' and
                       TABLE_NAME ='#value'", 'leaf' => true),

			'raw_table' => array('sql' =>
				"select COLUMN_NAME  as value, COLUMN_TYPE as column_definition ,concat( COLUMN_NAME,'    ','(', COLUMN_TYPE,')') as  text ,
                       '#value' as 'hostby',
                       if(COLUMN_KEY='PRI','primary_column','column') as category  from
                      `information_schema`.`COLUMNS` where TABLE_SCHEMA ='DATABASE_SCHEMA_REPLACE' and
                       TABLE_NAME ='#value'", 'leaf' => true),

			'table_columns' => array('sql' =>
				"select COLUMN_NAME  as value,COLUMN_NAME as  text ,
                       '#value' as 'hostby',
                       if(COLUMN_KEY='PRI','primary_column','column') as category  from
                      `information_schema`.`COLUMNS` where TABLE_SCHEMA ='DATABASE_SCHEMA_REPLACE' and
                       TABLE_NAME ='#value'", 'leaf' => true),

			'activitys' => array('sql' =>

				"select  id, activity_code  as  value, grid_title as text, pic_url as pic, 'activity' as category,base_table from  nanx_activity where level<>'system' and activity_type='table'
                 union
                select  id, activity_code  as  value, grid_title as text, pic_url as pic, 'activity' as category,base_table from  nanx_activity where level<>'system' and activity_type='tree'
                 union 
                 select  id, activity_code  as  value, grid_title as text, pic_url as pic, 'activity_js' as category,base_table from  nanx_activity where level<>'system' and activity_type='js'
                 union
                 select  id, activity_code  as  value, grid_title as text, pic_url as pic, 'activity_service' as category ,base_table from  nanx_activity where level<>'system' and activity_type='service'
                 union
                 select  id, activity_code  as  value, grid_title as text, pic_url as pic, 'activity_html' as category ,base_table from  nanx_activity where level<>'system' and activity_type='html'
                 union
                 select  id, activity_code  as  value, grid_title as text,pic_url as pic, 'activity_sql' as category ,base_table from  nanx_activity where level<>'system' and activity_type='sql'
                ", 'leaf' => false),

			'activity' => array(
				'method'   => "getActivityDetail",
		        'paratype' => 'activity_code',
				''         => false),

            'medias' => array(
				'method'   => "getMediaCategory",
		        'paratype' => null,
				''         => false),


			'activity_js' => array('sql' =>
				"select extra_js as text, extra_js as value,'js_file' as category ,'js/upload' as os_path from
             nanx_activity where activity_code='#value' ",
				'leaf' => true),

			'activity_sql' => array('sql' =>
				"select id,null as text, extra_js as value,'sql_statement' as category from
             nanx_activity where activity_code='#value' ",
				'leaf' => true),

			'activity_service' => array('sql' =>
				"select service_url as text, service_url as value,'controler_fun' as category from
             nanx_activity where activity_code='#value' ",
				'leaf' => true),

			'activity_html' => array('sql' =>
				"select data_url as text, data_url as value,'controler_fun' as category from
             nanx_activity where activity_code='#value' ",
				'leaf' => true),

			'acls' => array('sql' =>
				"select id,  role_code  as  value, role_name as text, 'user_role_under_acls' as category from  nanx_user_role  ",
				'leaf' => false),

			'act_notifies' => array('sql' =>
				"select    distinct rule_name as value,rule_name as text,'act_notify' as category from  nanx_activity_nofity",
				'leaf' => true),

			'user_role_under_acls' => array('sql' =>
				"select nanx_user_role_privilege.id, nanx_user_role_privilege.activity_code  as  value, grid_title as text,
               '#value' as  hostby ,  concat('acl_activity_', activity_type ) as category
                from nanx_user_role_privilege ,nanx_activity
                 where   nanx_user_role_privilege.activity_code=nanx_activity.activity_code and role_code='#value'  order by display_order ",
				'leaf' => true),

			'users' => array('sql' =>
				"select id,  user  as  value, user  as text, staff_name,'user' as category from  nanx_user",
				'leaf' => true),

			 
            'hook_type' => array(
            	'method'=>'stacic_hook_type',
            	'paratype'=>null,
            	'leaf' => true),

            'hook_when' => array(
            	'method'=>'stacic_hook_when',
            	'paratype'=>null,
            	'leaf' => true),

              'hook_event' => array(
            	'method'=>'stacic_hook_event',
            	'paratype'=>null,
            	'leaf' => true),
 
			 'extra_ci_model' => array(
            	'method'=>'get_extra_ci_model',
            	'paratype'=>null,
            	'leaf' => true
            	),
			 'model_method'=>array(
				'method'=>'get_model_methods',
            	'paratype'=>null,
            	'leaf' => true
			 	),

			'roles' => array('sql' =>
				"select  id, role_code  as  value, role_name  as text, 'user_role' as category from  nanx_user_role",
				'leaf' => false),

			'user_role' => array('sql' =>
				"select  id,  user   as  value, user  as text, 'user_under_role' as category, '#value' as hostby from
              nanx_user_role_assign  where role_code='#value'", 'leaf' => true),

           'codetable_category' => array('sql' =>
				"select  distinct category  as text , category ,category as value   from nanx_code_table  ", 'leaf' => true),
			 



			'user_role_refer' => array('sql' => "
          SELECT 'user_role_refer_detail' as category, nanx_user_role.role_name,nanx_user.user as value  FROM nanx_user,nanx_user_role_assign,nanx_user_role
          WHERE ( nanx_user_role_assign.user = nanx_user.user )
          and (nanx_user_role.role_code=nanx_user_role_assign.role_code)",
				'leaf' => true));

		$this->load->model('MSystempara');
		$APP_PREFIX            = $this->MSystempara->getCfgItem('APP_PREFIX');
 		
 		$DB_USED=$this->db->database; //目前使用的数据库名称
 		
 		 
 		   
		$schema_based_category = array(
			'fks',
			'tables',
			'table',
			'raw_table',
			'table_columns');



		for ($i = 0; $i < count($schema_based_category); $i++) {
			$category              = $schema_based_category[$i];
			$cfg[$category]['sql'] = str_replace('DATABASE_SCHEMA_REPLACE', $DB_USED, $cfg[$category]['sql']);
            $cfg[$category]['sql'] = str_replace('APP_REPLACE', $APP_PREFIX, $cfg[$category]['sql']);
            // echo $cfg[$category]['sql']; 
		}
		 
		return $cfg;
	}

	function index() {

		$tree_request = $_REQUEST;

 		 

		if (array_key_exists('category_to_use', $tree_request)) {
			$res       = $this->getCategoryResult($tree_request);
			$res_left  = null;
			$res_right = null;
		} else {
			$res                             = null;
			$tree_request['category_to_use'] = $tree_request['left_category'];
			$res_left                        = $this->getCategoryResult($tree_request);

			if (strlen($tree_request['right_category']) > 3) {
				$tree_request['category_to_use'] = $tree_request['right_category'];
				$res_right                       = $this->getCategoryResult($tree_request);
			} else {
				$res_right = null;
			}
		}

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
		} else {
			$res = $this->getSubCategorybyMethod($subCategoryCfg, $tree_request);
		}

		$res = $this->setNodeIDandCss($res, $tree_request);
		 
		if (array_key_exists('post_method', $subCategoryCfg)) {
			$res = $this->change_filed_display($res);
		}
 
		return $res;
	}

	function change_filed_display($res) {
		$this->load->model('MFieldcfg');
		for ($i = 0; $i < count($res); $i++) {
			$table           = $res[$i]['hostby'];
			$field           = $res[$i]['value'];
			$display         = $this->MFieldcfg->getDisplayCfg($table, $field, true);
			$res[$i]['text'] = $display['field_c'];
		}
		return $res;
	}

	function getCategoryResultBySqls($subCategoryCfg, $treeRequest) {
		$sql  = $subCategoryCfg['sql'];
		$leaf = $subCategoryCfg['leaf'];
		if (!is_array($sql)) {
			$sql  = array($sql);
			$leaf = array($leaf);
		}

	    // debug( $sql);

		$total_result = array();
		for ($i = 0; $i < count($sql); $i++) {
			$result       = $this->getCategoryResultBySql($sql[$i], $treeRequest, $leaf[$i]);
			$total_result = array_merge($total_result, $result);
		}
		return $total_result;
	}

	function getSubCategorybyMethod($subCategoryCfg, $params) {

		$method   = $subCategoryCfg['method'];
		$paratype = $subCategoryCfg['paratype'];

		if ($method == 'getBizCols') {
			$pv = (isset($params["value"]) ? $params["value"] : '');

			$raw_tbname = $pv;

			if ($paratype == 'actcode') {
				$raw_tbname = $this->getRawTbnameByActcode($pv);
			}

			if ($paratype == 'biz_tables_id') {
				$raw_tbname = $this->getRawTbnameById($pv);
			}

			if ($paratype == 'raw_table_name') {
				$raw_tbname = $pv;
			}

			$cols = $this->getBizCols($raw_tbname);
			return $cols;
		}

		if ($method == 'getForbiddenBizCols') {
			$actcode    = (isset($params["value"]) ? $params["value"] : '');
			$raw_tbname = $this->getRawTbnameByActcode($actcode);
			$cols       = $this->getBizCols($raw_tbname);

			$this->load->model('MFieldcfg');
			$forbiddenfields = $this->MFieldcfg->getForbiddenFields($actcode);
			$cols            = arrayfilter($cols, 'value', $forbiddenfields);
			return $cols;
		}

		if ($method == 'getActivityDetail') {
			$actcode = (isset($params["value"]) ? $params["value"] : '');
			$ret     = $this->getActivityDetail($actcode);
			return $ret;
		
		}


		if ($method == 'stacic_hook_type') {
		   $ret=array(  
                 array('value'=>'data','text'=>'data','category'=>'hooks'),
				 array('value'=>'check','text'=>'check','category'=>'hooks')
		    );
		   return $ret;
		}


		if ($method == 'stacic_hook_when') {
		   $ret=array(  
                 array('value'=>'before','text'=>'before','category'=>'hooks'),
				 array('value'=>'after','text'=>'after','category'=>'hooks')
		    );
		   return $ret;
		}



		if ($method == 'stacic_hook_event') {
		   $ret=array(  
                 array('value'=>'add','text'=>'add','category'=>'hooks'),
				 array('value'=>'delete','text'=>'delete','category'=>'hooks'),
				 array('value'=>'update','text'=>'update','category'=>'hooks')
		    );
		   return $ret;
		}


      if ($method == 'get_extra_ci_model') {
		 $this->load->model('MFile');
         $ret=array();
         $files=$this->MFile->getFileList('application/models' ,'php');
		 foreach ($files as $one_file) {
		 	$fname=str_replace('.php','',$one_file['Filename']);
		    $ret[]=array('value'=>$fname ,'text'=>$fname ,'category'=>'model') ;
		  } 
         return $ret;
		}


		if ($method == 'get_model_methods') {

         
 		  
          $model=$params['value'];
          $this->load->model($model);
          include_once( APPPATH.'/models/'.$model.".php" ) ;
          $class_methods=get_class_methods($model);
         if(($key = array_search('__construct', $class_methods)) !== false) {
          unset($class_methods[$key]);
         }

         if(($key = array_search('__get', $class_methods)) !== false) {
          unset($class_methods[$key]);
         }
          
           foreach ($class_methods as $one_method) {
		    $ret[]=array('value'=>$one_method ,'text'=>$one_method ,'category'=>'method') ;

		  } 
         return $ret;

		}
 

		if( $method='getMediaCategory'){
			$ret=array();
			$ret[]=array('value'=>'img','text'=>'图片管理','os_path'=>'imgs','leaf'=>true,'category'=>'fs_table') ;
			$ret[]=array('value'=>'php','text'=>'CI控制器文件','os_path'=>"application/models",'leaf'=>true,'category'=>'fs_table') ;
			$ret[]=array('value'=>'php','text'=>'CI模型文件','os_path'=>"application/controllers",'leaf'=>true,'category'=>'fs_table') ; 
			$ret[]=array('value'=>'js', 'text'=>'Javascript文件','os_path'=>"js/upload",'leaf'=>true,'category'=>'fs_table') ;
            return $ret;

		}

	}

	function getActivityDetail($actcode) {

		$sql1 = "select nanx_biz_tables.id  as value , table_name as 'table', table_screen_name as text,'based_biz_table' as category,'#value' as hostby
                   from  nanx_activity, nanx_biz_tables where
                   nanx_biz_tables.table_name=base_table
                   and activity_code='#value'";

		$sql1 = str_replace('#value', $actcode, $sql1);
		$ret1 = $this->db->query($sql1)->result_array();
		$ret1 = arrayinsertkv($ret1, 'leaf', false);

		$this->db->where('activity_code', $actcode);
		$rows      = $this->db->get('nanx_activity');
		$cfg       = $rows->first_row('array');
		$maintable = $cfg['base_table'];
		$btn_text  = $this->lang->line('btn_text');
		$hook_text='Hook' ;



		$sql3 = "select  '#value'  as value ,nanx_biz_tables.id as base_table_id , 'BTN_TEXT' as text ,'buttons' as category ,'#value' as hostby
              from  nanx_activity ,  nanx_biz_tables where
              activity_code='#value'  and nanx_activity.base_table= nanx_biz_tables.table_name  limit 1";

		$sql3 = str_replace('#value', $actcode, $sql3);
		$sql3 = str_replace('BTN_TEXT', $btn_text, $sql3);


 
		$ret3 = $this->db->query($sql3)->result_array();
		$ret3 = arrayinsertkv($ret3, 'maintable', $maintable);
		$ret3 = arrayinsertkv($ret3, 'leaf', false);

		$sql4 = "select  '#value'  as value ,nanx_biz_tables.id as base_table_id , 'HOOK_TEXT' as text ,'hooks' as category ,'#value' as hostby
              from  nanx_activity ,  nanx_biz_tables where
              activity_code='#value'  and nanx_activity.base_table= nanx_biz_tables.table_name  limit 1";

		$sql4 = str_replace('#value', $actcode, $sql4);
		$sql4 = str_replace('HOOK_TEXT', $hook_text, $sql4);

		$ret4 = $this->db->query($sql4)->result_array();
		$ret4 = arrayinsertkv($ret4, 'maintable', $maintable);
		$ret4 = arrayinsertkv($ret4, 'leaf', false);
		$ret = array_merge($ret1, $ret3,$ret4);
		return $ret;
	}

	function getCategoryResultBySql($sql, $para_array, $leaf) {
		foreach ($para_array as $key => $value) {
			if (!is_array($value)) {
				$sql = str_replace('#' . $key, $value, $sql);
			}
		}
 
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

	function getRawTbnameByActcode($actcode) {
		$sql        = "select base_table from nanx_activity  where activity_code='#value'";
		$sql        = str_replace('#value', $actcode, $sql);
		$rows       = $this->db->query($sql)->result_array();
		$raw_tbname = $rows[0]['base_table'];
		return $raw_tbname;
	}

	function getRawTbnameById($id) {

		$sql        = "select table_name from nanx_biz_tables  where id=#value";
		$sql        = str_replace('#value', $id, $sql);
		$rows       = $this->db->query($sql)->result_array();
		$raw_tbname = $rows[0]['table_name'];
		return $raw_tbname;
	}

	function getBizCols($raw_tbname) {

		 

		$fields_e = $this->db->list_fields($raw_tbname);
        $activity_code='';
		$this->load->model('MFieldcfg');
		$col_cfg = $this->MFieldcfg->getColsCfg($activity_code, $raw_tbname, $fields_e, true);

		$col_cfg = array_retrieve($col_cfg, array('field_e', array('segment' => 'display_cfg', 'index' => 'value'), array('segment' => 'display_cfg', 'index' => 'field_c')));
		$col_cfg = arrayinsertkv($col_cfg, 'category', 'biz_col');
		$col_cfg = arrayinsertkv($col_cfg, 'leaf', true);
		$col_cfg = arrayinsertkv($col_cfg, 'hostby', $raw_tbname);
		$col_cfg = arraychangekey($col_cfg, 'field_c', 'text');
		return $col_cfg;
	}


	function systemSummary() {
		$this->load->library('table');
		$div = "<div style='margin:20px;font-family:arial,​tahoma,​helvetica,​sans-serif'>";

		$tb_refer = $this->categeoryTableReferHtml();
		$div .= $tb_refer;
		$cat = array(
			"category_to_use" => "activitys",
			"value"           => $this->lang->line('activitys'),
			"icon"            => 'activitys',
			"used_keys"       => array('iconCls', 'text'),
			'header' => array($this->lang->line('activity_type'), $this->lang->line('activity_name'))
		);

		$result = $this->categeoryHtml($cat);
		$div .= $result;

		$cat = array(
			"category_to_use" => "user_role_refer",
			"value"           => $this->lang->line('role_user_list'),
			"icon"            => 'roles',
			'header'          => array($this->lang->line('role'), $this->lang->line('account')),
			"used_keys" => array('role_name', 'value'));
		$result = $this->categeoryHtml($cat);
		$div .= $result;

		$cat = array(
			"category_to_use" => "public_cols_show_in_summary",
			"value"           => $this->lang->line('public_fields'),
			'header'          => array($this->lang->line('field_item'), $this->lang->line('field_display')),

			"icon"      => 'special_cols_show_config',
			"used_keys" => array('text', 'value'));
		$result = $this->categeoryHtml($cat);
		$div .= $result;

		$cat = array(
			"category_to_use" => "special_cols_show_config_v2",
			"value"           => $this->lang->line('customized_fields'),
			'header'          => array(
				$this->lang->line('table'),
				$this->lang->line('field'),
				$this->lang->line('field_display')
			),
			"icon"      => 'special_cols_show_config',
			"used_keys" => array(
				'base_table',
				'value',
				'text'));
		$result = $this->categeoryHtml($cat);
		$div .= $result;

		$div .= "</div>";
		echo $div;
	}

	function categeoryHtml($cat) {
		$result = $this->getCategoryResult($cat);
		$result = array_retrieve($result, $cat['used_keys']);
		if ($cat['category_to_use'] == 'activitys') {
			for ($i = 0; $i < count($result); $i++) {
				$str = "<div style='width:16px;' class=" . $result[$i]['iconCls'] .
				">&nbsp;</div>";

				$result[$i]['cls'] = $str;
			}
			$result = array_retrieve($result, array('cls', 'text'));
		} 

		$total = count($result);
		$cls   = $cat['icon'];
		$tmpl  = array('table_open' => '<table class="thin-table">');
		$this->table->set_template($tmpl);
		$cap = "<div class=$cls style='padding-left:20px;font-size:16px;margin-top:10px;margin-bottom:2px;' >" .
		$cat['value'] . "($total)</div>";
		$this->table->set_caption($cap);
		$this->table->set_heading($cat['header']);
		$tbhtml = $this->table->generate($result);
		return $tbhtml;
	}

	function categeoryTableReferHtml() {

		$cat        = array("category_to_use" => "biz_tables", "value" => "");
		$biz_tables = $this->getCategoryResult($cat);
		$biz_tables = array_retrieve($biz_tables, array('text', 'table'));
		$biz_tables = arraychangekey($biz_tables, 'text', 'biz_table');

		$biz_list = array();
		for ($i = 0; $i < count($biz_tables); $i++) {
			$biz_list[$biz_tables[$i]['table']] = $biz_tables[$i]['biz_table'];
		}

		$cat        = array("category_to_use" => "tables", "value" => $this->lang->line('database_summary'));
		$raw_tables = $this->getCategoryResult($cat);
		$raw_tables = array_retrieve($raw_tables, array('value', 'text'));
		$raw_tables = arraychangekey($raw_tables, 'value', 'raw_table');
		$raw_tables = arraychangekey($raw_tables, 'text', 'biz_table');

		$raw_list = array();
		for ($i = 0; $i < count($raw_tables); $i++) {
			$raw_list[$raw_tables[$i]['raw_table']] = $raw_tables[$i]['biz_table'];
		}

		$table_refer       = array_merge($raw_list, $biz_list);
		$table_refer_final = array();
		while (list($key, $value) = each($table_refer)) {
			$tmp = array('raw_table' => $key, 'biz_table' => $value);

			$table_refer_final[] = $tmp;
		}

		$tmpl = array('table_open' => '<table class="thin-table">');
		$this->table->set_template($tmpl);
		$total = count($table_refer_final);
		$cap   = "<div class=raw_db style='padding-left:20px;font-size:16px;margin-top:10px;margin-bottom:4px;' >" .
		$cat['value'] . "($total)</div>";
		$this->table->set_caption($cap);
		$this->table->set_heading(array($this->lang->line('raw_table_name'), $this->lang->line('biz_table_name')));

		$tbhtml = $this->table->generate($table_refer_final);
		return $tbhtml;
	}
}
 
?>