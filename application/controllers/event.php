<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Event extends CI_Controller {
    
    function listEvent() 
    {
    	$this->load->model('MSession');
      $user=$this->MSession->getCurrentUser();
    	$post = file_get_contents('php://input') ;
      $sender=$this->lang->line('sender');  	
      $title=$this->lang->line('title');  	
      $sendtime=$this->lang->line('sendtime');  	
      

      $sql=
      "select id,sender,title,sendtime from  nanx_sms  where receiver='$user' order by id  desc limit 25";
      $rows=$this->db->query($sql)->result_array();
      $html_work_event='<table  class="msg-table" padding-left:0px  width=615px border="0"><thead>';
      $html_work_event.="<tr><th width=60px>".$sender."</th><th width=446px>".$title."</th><th width=122px>".$sendtime."</th></tr></thead>";
      foreach($rows as $row)
      {
       $id=$row['id']; 
       $html_work_event.="<tr><td>".$row['sender']."</td><td><a class=sms_tag id=$id href=#>".$row['title']."</a></td><td>".$row['sendtime']."</td></tr>";
      }       
    	$html_work_event.="</table>";
    	 
      $html=array(
      'timestamp' => $this->lang->line('lastmodified').':'.date('Y-m-d H:i:s'),
      'work_event'=>   $html_work_event 
      );
      
      echo json_encode($html);
    }
    
    function getNotifyDetail()
    {  
       $post = file_get_contents('php://input');
       $para = (array )json_decode($post);
       $this->db->where($para);
       $this->db->select('receiver_role_list');
       $this->db->distinct();
       $listeners=$this->db->get('nanx_activity_nofity')->result_array();
       $data_role= array_retrieve($listeners,'receiver_role_list');
    
       
     
       $this->db->where($para);
       $this->db->select('action');
       $this->db->distinct();
       $listeners=$this->db->get('nanx_activity_nofity')->result_array();
       $data_action= array_retrieve($listeners,'action');
       
       $this->db->where($para);
       $this->db->select('activity_code');
       $this->db->distinct();
       $listeners=$this->db->get('nanx_activity_nofity')->result_array();
       $data_activity_code= array_retrieve($listeners,'activity_code');
       $data_activity_code=$data_activity_code[0];
       
       $ret=array('receiver_role_list'=> $data_role,'action'=> $data_action,'rule_name'=> $para['rule_name'],'activity_code'=> $data_activity_code );
       echo json_encode($ret);      
    }
    
    
}
?>