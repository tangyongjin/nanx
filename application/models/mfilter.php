<?php

class MFilter extends CI_Model
{

    function getForbidden() {
      $forbidden=array (
       'file'=>array(
          'index.html',
          'activity.php',
          'backend.php',
          'category.php',
          'mhooks.php',
          'cfg.php',
          'copynode.php',
          'cpdf.php',
          'curd.php',
          'dataproxy.php',
          'dbdocu.php',
          'dbl_cmd.php',
          'event.php',
          'file.php',
          'grid2excel.php',
          'home.php',
          'index.html',
          'nanx.php',
          'nanxplug_222.php',
          'rdbms.php',
          'role.php',
          'sms.php',
          'tree.php',
          'util.php',
          'welcome.php',
          'mactivity.php',
          'mfilter.php',
          'mcategory.php',
          'mcurd.php',
          'mdatafactory.php',
          // 'mexcel.php',
          'mfieldcfg.php',
          // 'mfile.php',
          'mlayout.php',
          'mproduct.php',
          'mrdbms.php',
          'mrole.php',
          'msession.php',
          'msystempara.php',
          'mui.php',
          'mxmenu.php',
          'muserrole.php',
          'mvtable.php'),
       'table'=>array( 
          'nanx_activity',
          'nanx_activity_a2a_btns',
          'nanx_activity_batch_btns',
          'nanx_activity_biz_layout',
          'nanx_activity_curd_cfg',
          'nanx_activity_field_public_display_cfg',
          'nanx_activity_field_special_display_cfg',
          'nanx_activity_forbidden_field',
          'nanx_activity_js_btns',
          'nanx_activity_nofity',
          'nanx_activity_id_order',
          'nanx_biz_column_editor_cfg',
          'nanx_biz_column_follow_cfg',
          'nanx_biz_column_trigger_group',
          'nanx_biz_tables',
          'nanx_country',
          'nanx_session_log',
          'nanx_shadow',
          'nanx_sms',
          'nanx_system_cfg',
          'nanx_user',
          'nanx_user_role',
          'nanx_user_role_assign',
          'nanx_user_role_privilege',
          'nanx_who_is_who'),
       'activity'=>array(
          'NANX_AAA',
          'NANX_APP_SUMMARY',
          'NANX_FS_2_TABLE',
          'NANX_SQL_ACTIVITY',
          'NANX_SYS_CONFIG',
          'NANX_TBL_CREATE',
          'NANX_TBL_DATA',
          'NANX_TBL_INDEX',
          'NANX_TBL_STRU',
          'NANX_TB_LAYOUT'
        )
        );
      return $forbidden; 
    }
 

    function filter($value_to_check,$filter_type){
      $forbidden=$this->getForbidden();
      if($filter_type=='file'){
         $forbidden_files=$forbidden['file'];
         $filtered=array();
         $id=0;
         foreach ($value_to_check as $onefile) {
           if( !in_array($onefile['Filename'], $forbidden_files)    ){
                 $onefile['id']=$id;
                 $filtered[]=$onefile;            
                 $id++;
           }
         }
         return  $filtered;
      }
      
      if($filter_type=='activity'){
          $forbidden_activitys=$forbidden['activity'];
          if(  in_array($value_to_check, $forbidden_activitys)){
             return false;
          }
          return true;
      }

      if($filter_type=='table'){
        
      }
    }
  
  }


?>