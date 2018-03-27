<?php 
class MuserRole extends CI_Model{
    
  function  getActivitybyRoleCode($role_codes)
   {
     	$role_list=array();
     	for($i=0;$i<count($role_codes);$i++)
     	{
     	array_push($role_list,$role_codes[$i]['role_code']);
     	}
     	
     	if( count($role_list)==0)
     	{
     	array_push($role_list,'no_role_found_in_system');
     	}
     	
     	$this->db->select('activity_code');	
     	$this->db->where_in('role_code', $role_list);
     	$this->db->order_by('display_order,id','asc');
     	$this->db->distinct();
      $acts=$this->db->get('nanx_user_role_privilege')->result_array();
      // logtext( $acts) ;

      return $acts;
 	 }
}
?>