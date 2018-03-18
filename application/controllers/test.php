<?php

if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Test extends CI_Controller {
   

   function  debug(){

     
           echo "111";
           $sql="select * from  xxxyy";
           $this->db->query($sql)->result_array();
           die;
    
       
   }
}
 
?>