<?php 
class MuserRole extends CI_Model{
    
  function  getActivitybyRoleCode($role_codes,$parent='mgroup_root')
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
      // 先从 nanx_menu 里面查找,只显示第一层级的菜单.

      $this->db->select('activity_code'); 
      $this->db->where_in('role_code', $role_list);
      $this->db->where('parent',$parent);
      $this->db->order_by('id','asc');
      $this->db->distinct();
      $acts_from_menu=$this->db->get('nanx_menu')->result_array();

      if( count($acts_from_menu) ==0){

              $this->db->select('activity_code'); 
              $this->db->where_in('role_code', $role_list);
              $this->db->order_by('display_order,id','asc');
              $this->db->distinct();
              $acts=$this->db->get('nanx_user_role_privilege')->result_array();
              return $acts;
      } else
      {
              return $acts_from_menu;
      }
   }
}
?>