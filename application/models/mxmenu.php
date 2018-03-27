<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');



class MXmenu extends CI_Model
 
{
    
     public $tree = null;
     public $html = '';


 


    // function getsubitemDiv($one_item){


    //     $bs= $this->config->base_url();
    //     $acode=$one_item['activity_code'];
    //     $onediv =" 
    //         <div class='icon'>  
    //           <a class='nanx-4-ext'  activity_type='table' id=$acode  href=#>
    //             <img src='{$bs}/imgs/{$one_item['pic_url']}'/>
    //             <span>{$one_item['grid_title']}</span>
    //           </a>
    //       </div>";
        
    //     return   $onediv;
    // }
    
    // function debug($arr){
    //   echo "<pre>";
    //   print_r($arr);
    //   echo "</pre>";
       
    // }


    



 // public function test22() {

        
 //        $sql=" select * from nanx_menu_copy where parent is null" ;
 //        $this->tree=$this->db->query($sql)->result_array();
 //        for ($i = 0; $i < count($this->tree); $i++) {
 //           $this->tree[$i]['child']= $this->setchild($this->tree[$i]['activity_code']);
 //        }
 //        $this->debug($this->tree);
 // }



// public function setchild($code){
//           $sql=" select * from nanx_menu_copy where parent= '".$code."'" ;
//           $res=$this->db->query($sql)->result_array();
//           for ($i = 0; $i < count( $res); $i++) {
//              $res[$i]['child']= $this->setchild($res[$i]['activity_code']);
//           }
//           return $res;
// }


  
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


}

?>