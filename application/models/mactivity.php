<?php

class MActivity extends CI_Model
{

 

    function skip_field($activity_code, $fields_e)
    {

        $this->load->model('MFieldcfg');
        $forbidden_fields = $this->MFieldcfg->getForbiddenFields($activity_code);
        if( in_array('id', $forbidden_fields) ){
            $id_hidden=true;
        }else
        {
            $id_hidden=false;
        }
        $fields_e_not_forbidden         = array_diff($fields_e, $forbidden_fields);
        $res              = array_diff($fields_e, $forbidden_fields);
        $field_all=array(
           'id_hidden'=>$id_hidden,
           'NotForbidden'=>$fields_e_not_forbidden
            );
        return $field_all;
    }
    



    function getJSBtns($activity_code)
    {
        $this->db->where('activity_code', $activity_code);
        $rows = $this->db->get('nanx_activity_js_btns')->result_array();
        return $rows;
    }
    
    
    function getBatchBtns($activity_code)
    {
        $this->db->where('activity_code', $activity_code);
        $rows = $this->db->get('nanx_activity_batch_btns')->result_array();
        return $rows;
    }

    
    function  callerIncaller($url,$para)
    { 
         $c_and_m = explode("/", $url);
         $c=$c_and_m[0];
         $m=$c_and_m[1];
         
         $this->load->model($c);
         
         $result=$this->$c->$m($para);
         return $result;
    }
  
    
    
    function getActivityBasedBtns($activity_code)
    {
        $this->db->where('activity_code', $activity_code);
        $rows = $this->db->get('nanx_activity_a2a_btns')->result_array();
        return $rows;
    }
    
    
    function getCURDcfg($activity_code)
    {
        $this->db->select();
        $this->db->where('activity_code', $activity_code);
        $curdcfg = $this->db->get('nanx_activity_curd_cfg')->row();
        if (empty($curdcfg)) {
            $curdcfg = array(
                'activity_code' => $activity_code,
                'fn_add' => 1,
                'fn_update' => 1,
                'fn_del' => 1
            );
        }
        return $curdcfg;
    }
    
    
    
    function getIdOrder($activity_code)
    {
        $sql = "select  id_order from nanx_activity_id_order";
        $sql .= " where activity_code='$activity_code' ";
        $pordercfg = $this->db->query($sql)->row();
        if (empty($pordercfg)) {
            $pordercfg = array(
                'activity_code' => $activity_code,
                'id_order' => 'asc'
            );
        }
        return $pordercfg;
    }
    
     function judeSqlType($sql)
     {
        $sql=trim($sql);
        $sqltype='noselect';
        if(strtolower(substr($sql,0,6)) == 'select'){
         $sqltype='select';
        }

        if(strtolower(substr($sql,0,6)) == 'update'){
         $sqltype='update';
        }
        
        if(strtolower(substr($sql,0,6)) == 'delete'){
         $sqltype='delete';
        }
        
        return $sqltype;
     }

     


    function getFieldesByType_sql($activity_code,$sql_fixed)
    {
           $sqltype=$this->judeSqlType($sql_fixed);
           $ret=array(); 
           if($sqltype=='select'){
               $dbres=$this->db->query($sql_fixed);
               if ($dbres){
                    $ret['dbok']=true;
                    $ret['rows']=$dbres->result_array();
               }else
               {
                $ret['dbok']=false;
                $ret['rows']=null;
               }
           }
           else  // not execute, assume sql sytanx is right.
           {
              $ret['rows']=array(array('sqltype'=>$sqltype,'effected'=>20));
              $ret['dbok']=true;
           } 

            if(! $ret['dbok']){
                $col_cfg=array('sql_syntax_error'=>true);
            }
            else
            {
                 if ($ret['rows'] )
                    {
                        $fields_e = array_keys($ret['rows'][0]);
                        if ($activity_code == 'NANX_TB_LAYOUT') {
                            $arr      = getLayoutFields($ret['rows']);
                            $fields_e = $arr['cols'];
                        }
                    } 
                    else 
                    {
                        $fields_e = array(
                            0 => 'id'
                        );
                        if ($activity_code == 'NANX_TB_LAYOUT') {
                            $fields_e = array(
                                0 => 'col_0'
                            );
                        }
                    }
              $col_cfg = $this->MFieldcfg->getColsCfg($activity_code,'NULL', $fields_e, true);
            }
         return $col_cfg;
    }


    function getFieldesByType_service($activity_summary ,$para_array){
            $activity_code   = $activity_summary['activity_code'];
            $service_url     = $activity_summary['service_url'];
            
            $ret = $this->callerIncaller($service_url, $para_array);
            
            if ($ret) {
                $ret2arr = $ret;
                $fields_e = array_keys($ret2arr[0]);
                if ($activity_code=='NANX_TBL_DATA')
                {
                    if (in_array($para_array['table'], array(
                        'nanx_system_cfg',
                        'nanx_sms',
                        'nanx_activity_field_public_display_cfg'
                    ))) {
                        $this->load->model('MFieldcfg');
                        $col_cfg = $this->MFieldcfg->colsTrnasfer($activity_code,'NULL', $fields_e);
                    } else 
                    {
                        $transfer = false;
                        if (array_key_exists('transfer', $para_array)) {
                            $transfer = $para_array['transfer'];
                        }
                        $this->load->model('MFieldcfg');
                        $col_cfg = $this->MFieldcfg->getColsCfg($activity_code,'NULL', $fields_e, $transfer);
                    }
                }
                
                if (in_array($activity_code, array(
                    'NANX_SYS_CONFIG',
                    'NANX_TBL_CREATE',
                    'NANX_TBL_STRU',
                    'NANX_TBL_INDEX'
                ))) {
                    $this->load->model('MFieldcfg');
                    $col_cfg = $this->MFieldcfg->colsTrnasfer($activity_code,'NULL', $fields_e);
                }
                
                if ( $activity_code=='NANX_FS_2_TABLE')
                {
                    $col_cfg    = array();
                    if( in_array($para_array['file_type'],array('php','js'))){
                       array_push($col_cfg, array('field_e'=>'id','display_cfg'=>array('field_c'=>'id','value'=>'id')));
                       array_push($col_cfg, array('field_e'=>'Filename','display_cfg'=>array('field_c'=>'Filename','value'=>'Filename')));
                       array_push($col_cfg, array('field_e'=>'Size','display_cfg'=>array('field_c'=>'Size','value'=>'Size')));
                       array_push($col_cfg, array('field_e'=>'Date','display_cfg'=>array('field_c'=>'Date','value'=>'Date')));
                    }

                    if( in_array($para_array['file_type'],array('img'))){
                             $file_trunk = $para_array['file_trunk'];
                             for ($i = 0; $i < $file_trunk; $i++) {
                                $col_i = array(
                                    'field_e' => $i,
                                    'display_cfg' => array(
                                        'field_c' => $i,
                                        'value' => $i
                                    )
                                );
                                array_push($col_cfg, $col_i);
                            }
                    }
                }
            }
        return $col_cfg;   
    }

    //return col_cfg

     function getFieldesByType($activity_summary,$para_array)
    {    
        
        

        $activity_type   = $activity_summary['activity_type'];
        $activity_code   = $activity_summary['activity_code'];
        $service_url     = $activity_summary['service_url'];
        $sql             = $activity_summary['sql'];
        $base_table      = $activity_summary['base_table'];
          
        $col_cfg=array();   



       if ($activity_type == 'html') {
            $col_cfg = array();
        }
      
       if ( ($activity_type == 'table') ||( $base_table=='nanx_code_table' ) )   {

 
            $para_array['transfer'] = true;
            $fields_e_with_idforbidden_option = $this->skip_field($activity_code, $this->db->list_fields($base_table));


            $fields_e=$fields_e_with_idforbidden_option['NotForbidden'];
            $col_cfg = $this->MFieldcfg->getColsCfg($activity_code,$base_table, $fields_e, $para_array['transfer']);
            
            if( $fields_e_with_idforbidden_option['id_hidden'] ){
               $id_col_cfg = $this->MFieldcfg->getColsCfg($activity_code,$base_table,array('id'), $para_array['transfer']);
               $id_col_cfg[0]['display_cfg']['idhidden']=true;
               $col_cfg=array_merge($id_col_cfg,$col_cfg);
            }

             
        }

      if ($activity_type == 'tree') {
            $para_array['transfer'] = true;
            $fields_e_with_idforbidden_option = $this->skip_field($activity_code, $this->db->list_fields($base_table));


            $fields_e=$fields_e_with_idforbidden_option['NotForbidden'];
            $col_cfg = $this->MFieldcfg->getColsCfg($activity_code,$base_table, $fields_e, $para_array['transfer']);
           
            if( $fields_e_with_idforbidden_option['id_hidden'] ){
               $id_col_cfg = $this->MFieldcfg->getColsCfg($activity_code,$base_table,array('id'), $para_array['transfer']);
               $id_col_cfg[0]['display_cfg']['idhidden']=true;
               $col_cfg=array_merge($id_col_cfg,$col_cfg);
            }
        }



        if ($activity_type == 'sql') {
            $this->load->model('MFieldcfg');
            
            if (isset($para_array['para_json'])) {
                $sql_para  = $para_array['para_json'];
                $sql_fixed = strMarcoReplace($sql, $sql_para);
            
            } else {
                $sql_fixed = $sql;
            }
           $col_cfg=$this->getFieldesByType_sql($activity_code,$sql_fixed);
        }
      
        if ($activity_type == 'service') {

            if( $base_table=='nanx_code_table'){
             //do nothing
            } else
            {
               $col_cfg=$this->getFieldesByType_service($activity_summary ,$para_array);
            }

             
        

        }

        
       return $col_cfg;
    }

   

    function getActivityCfg($para_array)
    {

        $this->load->model('MFieldcfg');
        $this->load->model('MLayout');
        $layout_cfg   = array();
        $activity_code = $para_array['code'];
        $this->db->where('activity_code', $activity_code);
        $query           = $this->db->get('nanx_activity');
        $activity_summary             = $query->first_row('array');
        $activity_type   = $activity_summary['activity_type'];

     

        if ($activity_type == 'table') {
            $base_table             = $activity_summary['base_table'];
            $layout_cfg = $this->MLayout->getLayoutCfg($activity_code, $base_table);
        }



        if ($activity_type == 'tree') {
            $base_table             = $activity_summary['base_table'];
            $layout_cfg = $this->MLayout->getLayoutCfg($activity_code, $base_table);
        }



        if (array_key_exists('table', $para_array) && (strlen($para_array['table']) > 0)) {
            $activity_summary['base_table'] = $para_array['table'];
        }
        


        $col_cfg=$this->getFieldesByType($activity_summary,$para_array);
        
        if(array_key_exists('sql_syntax_error', $col_cfg))
        {
            $activity_summary['sql_syntax_error']   = $col_cfg['sql_syntax_error'];
            $col_cfg=array();     
        }

        if($activity_type=='menugroup'){
           $activity_summary['data_url']='xmenu/getchild/'.$activity_code;
        }
        
        $activity_summary['idOrder']           = $this->getIdOrder($activity_code);
        $activity_summary['curdCfg']            = $this->getCURDcfg($activity_code);
        $activity_summary['colsCfg']            = $col_cfg;
        $activity_summary['layoutCfg']          = $layout_cfg;
        $activity_summary['activty_based_btns'] = $this->getActivityBasedBtns($activity_code);
        $activity_summary['js_btns']            = $this->getJSBtns($activity_code);
        $activity_summary['batch_btns']         = $this->getBatchBtns($activity_code);
        $activity_summary['who_is_who']         = $this->session->userdata('who_is_who');
        $activity_summary['whoami']             = $this->session->userdata('user');
        return $activity_summary;
    }
    
}

?>