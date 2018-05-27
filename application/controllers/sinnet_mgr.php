<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
class Sinnet_mgr extends CI_Controller
{
    
    function addSdhPath()
    {
        
        
        $post = file_get_contents('php://input');
        $para = (array) json_decode($post);
        
        logtext($para);
        
        if( intval($para['custid']) ==0){
            $ret=array('errno'=>-1,'errmsg'=>'请选择客户!','msg'=>'操作失败');
            echo json_encode($ret);
            return;
        }


        if( ! array_key_exists('sdh_point', $para) ){

            $ret=array('errno'=>-1,'errmsg'=>'没有SDH节点数据','msg'=>'操作失败');
            echo json_encode($ret);
            return;
        }




        
        if (is_array($para['sdh_point'])) {
            $counters = count($para['sdh_point']);
        } else {
            $counters             = 1;
            $para['sdh_point']    = array(
                $para['sdh_point']
            );
            $para['sdh_location'] = array(
                $para['sdh_location']
            );
        }
        
        $db_errno = 0;
        $db_msg='';
        for ($i = 0; $i < $counters; $i++) {
            $row                 = array();
            $row['custid']       = $para['custid'];
            $row['sdh_number']   = $para['sdh_number'];
            $row['odfid']        = $para['sdh_point'][$i];
            $row['odf_location'] = $para['sdh_location'][$i];
            $row['serial']       = intval($i + 1);
            $this->db->insert('boss_SDH', $row);
            $db_errno = $db_errno + $this->db->_error_number();
            $db_msg =$db_msg.$this->db->_error_message();
        }
        
        $ret=array();
        if($db_errno==0){
            $ret=array('errno'=>0,'errmsg'=>$db_msg,'msg'=>'操作成功');
        }else
        {
            $ret=array('errno'=>-1,'errmsg'=>$db_msg,'msg'=>'操作失败');
        }

        echo json_encode($ret);
        
        
    }
    
    
    
}
?>