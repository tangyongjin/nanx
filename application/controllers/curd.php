<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Curd extends CI_Controller
{
    
    function listData()
     {
       

         $post    = file_get_contents('php://input');
         $p       = (array) json_decode($post);

         $this->load->model('MCurd');
         $result=$this->MCurd->getActivityData($p);
         $json = json_encode($result, JSON_UNESCAPED_UNICODE);
         echo $json;
    }
    
    function updateData()
    { 
        $post    = file_get_contents('php://input');
        $p       = (array) json_decode($post);
     
        $actcode = $p['actcode'];

        $this->load->model('MHooks');
        $hooks=$this->MHooks->getHooksbyActcode($actcode,'update');
        

        $before=$hooks['before'];
        $after=$hooks['after'];
        $checks=$hooks['checks'];

        $check_result=$this->hookhandler($checks,$p,'update',true);
        
        if($check_result==false){

              $resp = array(
                'success' => false,
                'msg'=>'单据号不存在'
                
             );
            echo json_encode($resp);
            return;
        }
        

        $this->hookhandler($before,$p,'update');
 


        $this->write_notify($actcode, 'update');
        $base_table = $p['table'];
        $rawData    = (array) $p['rawdata'];
        $id        = $rawData['id'];
        
        
        $dt_fileds  = $this->getDatetimeFiled($base_table);
        $date_check = $this->checkDateFmt($p, $dt_fileds);
        unset($rawData['id']);
        
        
        $this->db->where('id', $id);
        
        $row_to_update = $this->db->get($base_table)->result_array();
        if (count($row_to_update) == 1) {
            $row_to_update = $row_to_update[0];
        } else {
            $row_to_update = '';
        }
        
        $this->db->where('id', $id);
        $this->db->update($base_table, $rawData);
        $errno = $this->db->_error_number();
        if ($errno == 0) {
            $sql  = $this->db->last_query();
            $resp = array(
                'success' => true,
                'msg' => $this->lang->line('success_update_table_data')
            );
            
        } else {
            $resp = array(
                'success' => false,
                'msg' => $this->lang->line('error_code') . ':' . $errno
            );
        }
        
        $this->hookhandler($after,$p,'update');
        $this->write_session_log('update', $p, $row_to_update);
        echo json_encode($resp);
    }

    
    function batchData()
    {
        $post       = file_get_contents('php://input');
        $p          = (array) json_decode($post);
        $actcode    = $p['actcode'];
        $batch_ids = $p['batch_ids'];
        $base_table = $p['table'];
        $rawData    = (array) $p['rawdata'];
        $arr        = (array) $p['rawdata'];
        
        $errno      = 0;
        $single_err = 0;
        foreach ($batch_ids as $id) {
            
            $this->db->where('id', $id);
            $this->db->update($base_table, $arr);
            $single_err = $this->db->_error_number();
            $errno += $single_err;
        }
        
        if ($errno == 0) {
            $sql  = $this->db->last_query();
            $resp = array(
                'success' => true,
                'msg' => $this->lang->line('success_batch_update_table_data')
            );
            
        } else {
            $resp = array(
                'success' => false,
                'msg' => $this->lang->line('error_code') . ':' . $single_err
            );
        }
        $this->write_session_log('batchUpdateData', $p, '');
        echo json_encode($resp);
    }


    function hookhandler($hooks,$para,$curd_type,$checking=false){

        if( count($hooks)==0){return true;}

        $check_result=true; 
 
        foreach ($hooks  as $one_hook) {

            $model=$one_hook['extra_ci_model'];
            $method=$one_hook['model_method'];
            $this->load->model($model);
            $sub_check=$this->$model->$method($para);
            
            if((  $checking==true )&&($sub_check==false))
            {  
               
               
               $check_result=false;
               return false;
               countine;
            }

        }
        return $check_result ;
    

    }


    
    function addData()
    {  

        $post    = file_get_contents('php://input');
        $p       = (array) json_decode($post);
        $actcode = $p['actcode'];
        $this->load->model('MHooks');
        $hooks=$this->MHooks->getHooksbyActcode($actcode,'add');
        $before=$hooks['before'];
        $after=$hooks['after'];
        $checks=$hooks['checks'];
        $check_result=$this->hookhandler($checks,$p,'add',true);
        if($check_result==false){
              $resp = array(
                'success' => false,
                'msg'=>'单据号不存在'
             ); 
            echo json_encode($resp);
            return;
        }
        
        $this->hookhandler($before,$p,'add');
        $this->write_notify($actcode, 'add');
        $base_table = $p['table'];
        $rawData    = (array) $p['rawdata'];
        $this->db->insert($base_table, $rawData);
        $errno = $this->db->_error_number();
        if ($errno == 0) { 
            $resp = array(
                'success' => true,
                'msg' => $this->lang->line('success_add_table_data')
            );
        } else {
            $resp = array(
                'success' => false,
                'msg' => $this->lang->line('error_code') . ':' . $errno
            );
        }

        $this->hookhandler($after,$p,'add');
        $this->write_session_log('add', $p, '');
        echo json_encode($resp);
    }
    
     function deleteData()
    {
        
        $post    = file_get_contents('php://input');
        $p       = (array) json_decode($post);

        $para_for_hooks=array();
        $para_for_hooks['table']= $p['table'];


        $actcode = $p['actcode'];
        $this->write_notify($actcode, 'delete');
        $base_table   = $p['table'];
        $ids         = $p['id_to_del']; // id like '1,23,4,9'
        $total_error  = 0;

        $this->load->model('MHooks');
        $hooks=$this->MHooks->getHooksbyActcode($actcode,'delete');
        $before=$hooks['before'];
        $after=$hooks['after'];

        

        $rows_deleted = array();
        
        foreach ($ids as $id) {
            $where = array(
                'id' => $id
            );
            
            $this->db->where($where);
            $row_to_del_query = $this->db->get($base_table);
            $row_to_del= $row_to_del_query->result_array();
            
            if (count($row_to_del) == 1) {
                array_push($rows_deleted, $row_to_del[0]);
            }
            
            $this->db->delete($base_table, $where);
            $para_for_hooks['id_to_del']=$id;
            $para_for_hooks['row']= $row_to_del[0];
            $this->hookhandler($after,$para_for_hooks,'delete');
            $errno       = $this->db->_error_number();
            $total_error = $total_error + $errno;
        }
        
        if ($total_error == 0) {
            $resp = array(
                'success' => true,
                'msg' => $this->lang->line('success_delete_table_data')
            );
        } else {
            $resp = array(
                'success' => false,
                'msg' => $this->lang->line('error_code') . ':' . $errno
            );
        }
        $this->write_session_log('delete', $p, $rows_deleted);
        echo json_encode($resp);
    }
    
    
    function write_notify($activity_code, $action)
    {
        $sess     = $this->session->all_userdata();
        $operator = $sess['staff_name'];
        $sql      = "select  '$operator' as operator, grid_title,user ,action from nanx_activity   ,nanx_activity_nofity,nanx_user_role_assign
          where nanx_activity.activity_code=nanx_activity_nofity.activity_code  and
          nanx_activity_nofity.activity_code ='$activity_code'  and action='$action' and 
          nanx_activity_nofity.receiver_role_list=nanx_user_role_assign.role_code";
        
        if ($action == 'add') {
            $action = $this->lang->line('operation_add');
        } 
        if ($action == 'update') {
            $action = $this->lang->line('operation_update');
        }
        if ($action == 'delete') {
            $action = $this->lang->line('operation_delete');
        }
        date_default_timezone_set('PRC');
        $datesend = date('Y-m-d H:i:s');
        $msgs     = $this->db->query($sql)->result_array();
        if ($msgs) { 
            for ($i = 0; $i < count($msgs); $i++) {
                $operator = $msgs[$i]['operator'];
                $act      = $msgs[$i]['grid_title'];
                $txt      = "$operator:" . $this->lang->line('on_activity') . ':' . $act . $this->lang->line('executed') . $action . $this->lang->line('operation');
                $msg_send = array(
                    'sender' => $this->lang->line('system_sender'),
                    'receiver' => $msgs[$i]['user'],
                    'msg' => $txt,
                    'title' => $txt,
                    'sendtime' => $datesend
                );
                $this->db->insert('nanx_sms', $msg_send);
            }
        }
    } 

    function write_session_log($type, $p, $old_data)
    {
        
        if (!array_key_exists('rawdata', $p)) {
            $p['rawdata'] = $object = new stdClass();
        }
        
        $sess     = $this->session->all_userdata();
        $operator = $sess['staff_name'];
        $user     = $sess['user'];
        
        
        
        $log_data = array(
            'user' => $operator . '[' . $user . ']',
            'action_cmd' => $type,
            'act_code' => $p['actcode'],
            'table' => $p['table'],
            'rawdata' => array2string((array) $p['rawdata'])
        );
        
        switch ($type) {
            case 'add': 
                $log_data['ids'] = '';
                
                break;
            case 'delete':
                $log_data['ids']     = array2string($p['id_to_del']);
                $log_data['old_data'] = array2string($old_data);
                break;
            
            case 'update':
                $log_data['ids'] = '';
                 
                $log_data['old_data'] = array2string($old_data);
                
                break;
            case 'batchUpdate':
                $log_data['ids'] = array2string($p['batch_ids']);
                break;
        }
        $this->db->insert('nanx_session_log', $log_data);
    }
    
    function getDatetimeFiled($table)
    {
        $sql2      = "SELECT  C.`COLUMN_NAME`  FROM information_schema.`COLUMNS` C where  table_schema='oss'  and  table_name='$table' and DATA_TYPE='datetime'";
        $dt_fields = $this->db->query($sql2)->result_array();
    }
     
    function checkDateFmt($array, $cols)
    {
        $check = true;
        foreach ($array as $col) {
        }
    }
}

?>