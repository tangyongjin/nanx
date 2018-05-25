<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');



class MXmenu extends CI_Model
 
{
    
     public $tree = null;
     public $html = '';

  

  
    
    function getOneBlockbyActivityCode($acode)
    {
        
        $data = $this->db->get_where('nanx_activity', array('activity_code' => $acode ))->row_array();
        
        // print_r($data);

        if( $data){

        }   else{
            $data = $this->db->get_where('nanx_menu', array('activity_code' => $acode ))->row_array();
            $data['pic_url']='folder_main.png';
        } 

        
        $act_type = $data['activity_type'];
        $base_url = $this->config->item('base_url');
        $onediv   = "<div>not_set</div>";
        
        if ($act_type == 'folder') {
            $bs     = $this->config->base_url();
            $onediv = " 
            <div class='icon'>  
              <a class='nanx-4-ext' grid_title={$data['grid_title']} activity_type='folder' id=$acode  href=#$acode>
                <img src='{$bs}imgs/{$data['pic_url']}'/>
                <span>{$data['grid_title']}</span>
              </a>
          </div>";
        }
        
        if ($act_type == 'table') {
            $bs     = $this->config->base_url();
            $id_div = 'ct_' . $acode;
            $onediv = " 
            <div class='icon' id=$id_div>  

              <a class='nanx-4-ext'  activity_type='table' id=$acode  href=#>
                <img src='{$bs}imgs/{$data['pic_url']}'/>
                <span>{$data['grid_title']}</span>
              </a>
          </div>";
        }
        
        if ($act_type == 'tree') {
            $bs     = $this->config->base_url();
            $onediv = " 
            <div class='icon'>  
              <a class='nanx-4-ext'  activity_type='tree' id=$acode  href=#>
                <img src='{$bs}imgs/{$data['pic_url']}'/>
                <span>{$data['grid_title']}</span>
              </a>
          </div>";
        }
        
        
        
        if ($act_type == 'html') {
            $bs     = $this->config->base_url();
            $onediv = " 
            <div class='icon'>  
              <a class='nanx-4-ext'   grid_title={$data['grid_title']}  activity_type='html' id=$acode  href=#>
                <img src='{$bs}imgs/{$data['pic_url']}'/>
                <span>{$data['grid_title']}</span>
              </a>
          </div>";
        }
        
        
        
        if ($act_type == 'js') {
            $fnname = $data['js_function_point'];
            $bs     = $this->config->base_url();
            $onediv = " 
            <div class='icon'>  
              <a  class='nanx-4-ext'   activity_type='js' fnname=$fnname id=$acode  href=#>
                <img src='{$bs}imgs/{$data['pic_url']}'/>
                <span>{$data['grid_title']}</span>
              </a>
          </div>";
        }
        
        if ($act_type == 'url') {
            $url     = $base_url . $data['service_url'];
            $onclick = "alert('$url')";
            $onediv  = " 
            <div class='icon'  onClick=$onclick>  
              <a href=#  id=$acode class='nanx-4-ext' activity_type='url'>
                <img src='{$bs}imgs/{$data['pic_url']}'/>
                <span>{$data['grid_title']}</span>
              </a>
          </div>";
        }
        
        if ($act_type == 'service') {
            $url    = $data['service_url'];
            $memo   = "'" . $this->lang->line('service_memo') . ":" . $data['memo'] . "'";
            $onediv = " 
            <div class='icon'>  
              <a href=# class='nanx-4-ext' activity_type='service' memo=$memo  id=$acode  service_url=$url>
                <img src='{$bs}imgs/{$data['pic_url']}'/>
                <span>{$data['grid_title']}</span>
              </a>
          </div>";
        }
        
        if ($act_type == 'sql') {
            $url    = $data['service_url'];
            $onediv = " 
            <div class='icon'  data-badge='27'>  
              <a href=# class='nanx-4-ext' activity_type='sql' id=$acode  service_url=$url>
                <img src='{$bs}imgs/{$data['pic_url']}'/>
                <span>{$data['grid_title']}</span>
              </a>
          </div>";
        }
        
        
        return $onediv;
    }
    
    

  function  getActivitybyRoleCode($role_codes,$parent='mgroup_root') {
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

  function treeX($arr, $p_id = null)
    {
        $tree = array();
        foreach ($arr as $row) {
            if ($row['parent'] == $p_id) {
                $tmp = $this->treeX($arr, $row['activity_code']);
                if ($tmp) {
                    $row['children'] = $tmp;
                    $row['leaf']     = false;
                } else {
                    $row['leaf'] = true;
                }
                $tree[] = $row;
            }
        }
        return $tree;
  }

  function getMenuTree($role)
    {
        
        $sql = " SELECT id,parent,activity_code,activity_code as value,grid_title as text,activity_type,role_code FROM nanx_menu  where  role_code='{$role}' ";
        $results = $this->db->query($sql)->result_array();
        $tree    = $this->treeX($results, 'mgroup_root');
        return $tree;
        
         
    }
 
  
public function build_a_tag($type,$cfg){

  $img='<img  class="menu_item_icon"  src="http://cloud.nan-x.com/haokuan/imgs/thumbs/cpanel.png">';
  
  $a= '<a id="AID" class="nanx-4-ext"   activity_type="ATYPE" href="#" >TITLE</a>';
  $a=str_replace('AID', $cfg['activity_code'], $a);
  $a=str_replace('ATYPE', $cfg['activity_type'], $a);
  $a=str_replace('TITLE', $cfg['grid_title'], $a);
  return $a;

}

 

 public function getMenuByRole($roles) {

        $sql=" select activity_code,activity_type, grid_title from    nanx_activity where activity_code in (select activity_code from   nanx_menu 

         where parent is null and role_code='$roles')" ;
        $sql.=" union select activity_code,activity_type, grid_title from nanx_menu  
           where parent is null and  activity_code not in (select activity_code from   nanx_activity) and  role_code='$roles' ";
       

        $this->tree=$this->db->query($sql)->result_array();
        $this->html.='<ul id="main-menu">';
        for ($i = 0; $i < count($this->tree); $i++) {
            
            $tag=$this->build_a_tag('main',$this->tree[$i]); 
            $this->html.='<li class="parent">'.$this->tree[$i]['activity_code'].$this->setchildul($roles,$this->tree[$i]['activity_code']).$tag.'</li>';
        }
        $this->html.='</ul>'; 
        return $this->html;
 }



public function setchildul($roles,$code){
          $sql="  select activity_code,activity_type, grid_title from    nanx_activity where activity_code in  (select activity_code from nanx_menu where parent= '$code' 
            and role_code='$roles' ) " ;
          $sql.=" union select activity_code,activity_type, grid_title from nanx_menu where activity_code not in(select activity_code from   nanx_activity ) and parent='$code' 
          and role_code='$roles' ";
         

          $res=$this->db->query($sql)->result_array();
          $tmp='<ul class="sub-menu">';
          for ($i = 0; $i < count( $res); $i++) {
              $tag=$this->build_a_tag('sub',$res[$i]);
              $tmp.='<li>'.$res[$i]['activity_code'].$this->setchildul($roles,$res[$i]['activity_code']).$tag.'</li>';
          }
          $tmp.='</ul>';
         
          if($tmp=='<ul class="sub-menu"></ul>'){
            $tmp='';
          }

          return $tmp;
  }
 

 function getThemeMenu($roles){
        $this->load->model('MXmenu');
        $menu_html=$this->MXmenu->getMenuByRole($roles); 

 
        $bootstrap_menu='
           <div  id="ul_menu"> 
                <ul id="main-menu">
                    <li class="current-menu-item"><a href="http://www.freshdesignweb.com">Home</a></li>
                    <li class="parent">
                        <a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Server</a>
                        <ul class="sub-menu">
                            <li>
                                <a class="parent" href="#"><i class="icon-file-alt"></i>IBM</a>
                                <ul class="sub-menu">
                                    <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Full Width</a></li>
                                    <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Left Sidebar</a></li>
                                    <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Right Sidebar</a></li>
                                    <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Double Sidebar</a></li>
                                </ul>
                            </li>

                            <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html"><i class="icon-wrench"></i>HP</a></li>
                            <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html"><i class="icon-credit-card"></i>Dell</a></li>
                            <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html"><i class="icon-gift"></i> Icons</a></li>
                            
                        </ul>
                    </li>
                    <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Portfolio</a></li>
                    <li class="parent">
                        <a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Blog</a>
                        <ul class="sub-menu">
                            <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Large Image</a></li>
                            <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Medium Image</a></li>
                            <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Masonry</a></li>
                            <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Double Sidebar</a></li>
                            <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Single Post</a></li>
                        </ul>
                    </li>
                    <li><a href="http://www.freshdesignweb.com/responsive-drop-down-menu-jquery-css3-using-icon-symbol.html">Contact</a></li>
                </ul>
             
                </div>
        ';
         

         $bootstrap_menu='<div  id="ul_menu">'.$menu_html.'</div>';
         return $bootstrap_menu;

    }


    


}

?>