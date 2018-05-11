<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
class Ts extends CI_Controller
{
    function   test()
    {
        $where = array(
            'base_table' =>'aa',
            'field_e' => 'cc'
        );
        
        
        $this->db->where($where);
        $this->db->select('combo_table,codetable_category_value,list_field,value_field,filter_field,group_id,level');
        $dropdown_from_table = $this->db->get('nanx_biz_column_trigger_group')->first_row('array');
        
        debug($dropdown_from_table) ;

        if( $dropdown_from_table ){
              echo "find";
        }else
        {
        	 echo "not find " ;
         }
        return $dropdown_from_table;
        



    }
    
    function CallAPI()
   {
   
	    $curl = curl_init();
	    $data=array('abc'=>'aaa');
	    curl_setopt($curl, CURLOPT_POST, 0);
	    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	    $url='http://119.254.168.247:8050/activiti-rest/service/repository/deployments';
	    // Optional Authentication:
	    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	    curl_setopt($curl, CURLOPT_USERPWD, "kermit:kermit");
	    curl_setopt($curl, CURLOPT_URL, $url);
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

	    $result = curl_exec($curl);
	    curl_close($curl);
        echo json_encode($result);
}
     
    

    
    
}
?>
