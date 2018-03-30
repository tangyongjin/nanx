<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');



class MXmenu extends CI_Model
 
{
    
     public $tree = null;
     public $html = '';


 
 
  
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
       

        logtext($sql);
        
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


}

?>